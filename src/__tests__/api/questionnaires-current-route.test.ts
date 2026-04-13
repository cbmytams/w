import { NextRequest } from "next/server";
const requireDashboardRoleMock = jest.fn();
const resolveConfiguredTenantIdMock = jest.fn();
const getOrCreateCurrentQuestionnaireForTenantMock = jest.fn();

jest.mock("@/lib/apiAuth", () => ({
  requireDashboardRole: (...args: unknown[]) =>
    requireDashboardRoleMock(...args),
}));

jest.mock("@/lib/questionnaireTenant", () => ({
  resolveConfiguredTenantId: (...args: unknown[]) =>
    resolveConfiguredTenantIdMock(...args),
  getOrCreateCurrentQuestionnaireForTenant: (...args: unknown[]) =>
    getOrCreateCurrentQuestionnaireForTenantMock(...args),
}));

import { GET } from "@/app/api/v1/questionnaires/current/route";

describe("questionnaires current GET route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resolveConfiguredTenantIdMock.mockResolvedValue("tenant-default");
  });

  it("returns the active questionnaire without requiring an admin session", async () => {
    requireDashboardRoleMock.mockResolvedValue({
      response: Response.json({ error: "Unauthorized" }, { status: 401 }),
      session: null,
    });

    getOrCreateCurrentQuestionnaireForTenantMock.mockResolvedValue({
      id: "questionnaire-1",
      version: "v7",
      sectionsJson: [{ id: "section-1" }],
    });

    const request = new NextRequest(
      "https://wafia.test/api/v1/questionnaires/current"
    );

    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: {
        questionnaireId: "questionnaire-1",
        version: "v7",
        questions: [{ id: "section-1" }],
      },
    });
    expect(requireDashboardRoleMock).not.toHaveBeenCalled();
    expect(getOrCreateCurrentQuestionnaireForTenantMock).toHaveBeenCalledWith(
      "tenant-default",
      "TALENTS"
    );
  });

  it("returns a 500 error when the database is unavailable", async () => {
    getOrCreateCurrentQuestionnaireForTenantMock.mockRejectedValue(
      new Error("Environment variable not found: DATABASE_URL")
    );

    const request = new NextRequest(
      "https://wafia.test/api/v1/questionnaires/current"
    );

    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({
      success: false,
      error: "database_unavailable",
    });
  });

  it("returns 503 when no default tenant is configured", async () => {
    resolveConfiguredTenantIdMock.mockResolvedValue(null);

    const request = new NextRequest(
      "https://wafia.test/api/v1/questionnaires/current"
    );

    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body).toEqual({
      success: false,
      error: "questionnaire_unavailable",
    });
    expect(getOrCreateCurrentQuestionnaireForTenantMock).not.toHaveBeenCalled();
  });

  it("resolves questionnaire type from query params for BRANDS", async () => {
    getOrCreateCurrentQuestionnaireForTenantMock.mockResolvedValue({
      id: "questionnaire-brand-1",
      version: "v2",
      sectionsJson: [{ id: "brand-question-1" }],
    });

    const request = new NextRequest(
      "https://wafia.test/api/v1/questionnaires/current?type=BRANDS"
    );

    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: {
        questionnaireId: "questionnaire-brand-1",
        version: "v2",
        questions: [{ id: "brand-question-1" }],
      },
    });
    expect(getOrCreateCurrentQuestionnaireForTenantMock).toHaveBeenCalledWith(
      "tenant-default",
      "BRANDS"
    );
  });
});
