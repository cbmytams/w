import { NextRequest } from "next/server";

const requireDashboardRoleMock = jest.fn();
const enforceSameOriginMock = jest.fn();
const enforceRateLimitMock = jest.fn();

const prismaMock = {
  questionnaire: { findFirst: jest.fn() },
  questionnaireResponse: { findMany: jest.fn() },
  tenant: { findFirst: jest.fn() },
  auditLog: { create: jest.fn() },
};

jest.mock("@/lib/apiAuth", () => ({
  requireDashboardRole: (...args: unknown[]) => requireDashboardRoleMock(...args),
}));

jest.mock("@/lib/requestSecurity", () => ({
  enforceSameOrigin: (...args: unknown[]) => enforceSameOriginMock(...args),
  enforceRateLimit: (...args: unknown[]) => enforceRateLimitMock(...args),
}));

jest.mock("@/lib/db", () => ({ prisma: prismaMock }));

import { GET } from "@/app/api/v1/questionnaires/exports/route";

describe("questionnaires exports route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    enforceSameOriginMock.mockReturnValue(null);
    enforceRateLimitMock.mockReturnValue(null);
    requireDashboardRoleMock.mockResolvedValue({
      response: null,
      session: { id: "admin-user" },
    });
    prismaMock.tenant.findFirst.mockResolvedValue(null);
    prismaMock.auditLog.create.mockResolvedValue(null);
  });

  it("returns 404 when questionnaire version is missing", async () => {
    prismaMock.questionnaire.findFirst.mockResolvedValue(null);

    const request = new NextRequest(
      "https://wafia.test/api/v1/questionnaires/exports?type=TALENTS&format=csv&version=v42"
    );

    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body).toEqual({ error: "Questionnaire version not found" });
    expect(prismaMock.questionnaireResponse.findMany).not.toHaveBeenCalled();
  });

  it("serializes headers and all CSV cells", async () => {
    prismaMock.questionnaire.findFirst.mockResolvedValue({
      id: "questionnaire-1",
      version: "v1",
      type: "TALENTS",
      sectionsJson: [
        {
          id: "sec-1",
          title: "Section",
          questions: [
            { id: "q_formula", title: "=SUM(A1:A2)" },
            { id: "q_csv", title: 'Question "A", B' },
          ],
        },
      ],
    });

    prismaMock.questionnaireResponse.findMany
      .mockResolvedValueOnce([
        {
          id: "=resp-id",
          talentId: "+talent",
          type: "TALENTS",
          score: 99,
          completionRate: 100,
          submittedAt: new Date("2025-01-01T00:00:00.000Z"),
          answersJson: {
            q_formula: "@cmd",
            q_csv: 'A, "B"',
          },
        },
      ])
      .mockResolvedValueOnce([]);

    const request = new NextRequest(
      "https://wafia.test/api/v1/questionnaires/exports?type=TALENTS&format=csv&version=v1"
    );

    const response = await GET(request);
    const csv = await response.text();

    expect(response.status).toBe(200);
    expect(csv).toContain('"\'=SUM(A1:A2)"');
    expect(csv).toContain('"Question ""A"", B"');
    expect(csv).toContain('"\'=resp-id"');
    expect(csv).toContain('"\'+talent"');
    expect(csv).toContain('"\'@cmd"');
    expect(csv).toContain('"A, ""B"""');
  });
});
