import { NextRequest } from "next/server";
import { TALENTS_QUESTIONS } from "@/lib/questionnaireData";

const requireDashboardRoleMock = jest.fn();

const prismaMock = {
  questionnaire: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
};

jest.mock("@/lib/apiAuth", () => ({
  requireDashboardRole: (...args: unknown[]) => requireDashboardRoleMock(...args),
}));

jest.mock("@/lib/db", () => ({ prisma: prismaMock }));

import { GET } from "@/app/api/v1/questionnaires/current/route";

describe("questionnaires current GET route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns the active questionnaire without requiring an admin session", async () => {
    requireDashboardRoleMock.mockResolvedValue({
      response: Response.json({ error: "Unauthorized" }, { status: 401 }),
      session: null,
    });

    prismaMock.questionnaire.findFirst.mockResolvedValue({
      id: "questionnaire-1",
      version: "v7",
      sectionsJson: [{ id: "section-1" }],
    });

    const request = new NextRequest("https://wafia.test/api/v1/questionnaires/current");

    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      questionnaireId: "questionnaire-1",
      version: "v7",
      questions: [{ id: "section-1" }],
    });
    expect(requireDashboardRoleMock).not.toHaveBeenCalled();
  });

  it("falls back to built-in talents questions when the database is unavailable", async () => {
    prismaMock.questionnaire.findFirst.mockRejectedValue(
      new Error("Environment variable not found: DATABASE_URL"),
    );

    const request = new NextRequest("https://wafia.test/api/v1/questionnaires/current");

    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      questionnaireId: "local-fallback",
      version: "v1",
      questions: TALENTS_QUESTIONS,
    });
  });
});
