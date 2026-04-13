import { NextRequest } from "next/server";

const requireDashboardRoleMock = jest.fn();
const enforceSameOriginMock = jest.fn();
const enforceRateLimitMock = jest.fn();
const getQuestionnaireVersionForTenantMock = jest.fn();

const prismaMock = {
  questionnaireResponse: { findMany: jest.fn() },
  auditLog: { create: jest.fn() },
};

jest.mock("@/lib/apiAuth", () => ({
  requireDashboardRole: (...args: unknown[]) => requireDashboardRoleMock(...args),
}));

jest.mock("@/lib/requestSecurity", () => ({
  enforceSameOrigin: (...args: unknown[]) => enforceSameOriginMock(...args),
  enforceRateLimit: (...args: unknown[]) => enforceRateLimitMock(...args),
}));

jest.mock("@/lib/questionnaireTenant", () => ({
  getQuestionnaireVersionForTenant: (...args: unknown[]) => getQuestionnaireVersionForTenantMock(...args),
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
      session: { id: "admin-user", tenantId: "tenant-admin" },
    });
    prismaMock.auditLog.create.mockResolvedValue(null);
  });

  it("returns 404 when questionnaire version is missing", async () => {
    getQuestionnaireVersionForTenantMock.mockResolvedValue(null);

    const request = new NextRequest(
      "https://wafia.test/api/v1/questionnaires/exports?type=TALENTS&format=csv&version=v42"
    );

    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body).toEqual({ error: "Questionnaire version not found" });
    expect(prismaMock.questionnaireResponse.findMany).not.toHaveBeenCalled();
    expect(getQuestionnaireVersionForTenantMock).toHaveBeenCalledWith("tenant-admin", "TALENTS", "v42");
  });

  it("serializes headers and all CSV cells", async () => {
    getQuestionnaireVersionForTenantMock.mockResolvedValue({
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

  it("supports legacy flat question arrays for CSV export", async () => {
    getQuestionnaireVersionForTenantMock.mockResolvedValue({
      id: "questionnaire-legacy-flat",
      version: "v1",
      type: "TALENTS",
      sectionsJson: [
        { id: "q_flat_1", question: "Question plate 1" },
        { id: "q_flat_2", question: "Question plate 2" },
      ],
    });

    prismaMock.questionnaireResponse.findMany
      .mockResolvedValueOnce([
        {
          id: "resp-flat-1",
          talentId: "talent-flat-1",
          type: "TALENTS",
          score: 80,
          completionRate: 100,
          submittedAt: new Date("2025-01-01T00:00:00.000Z"),
          answersJson: {
            q_flat_1: "A1",
            q_flat_2: "A2",
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
    expect(csv).toContain('"Question plate 1"');
    expect(csv).toContain('"Question plate 2"');
    expect(csv).toContain('"A1"');
    expect(csv).toContain('"A2"');
  });

  it("scopes export lookup by tenantId", async () => {
    getQuestionnaireVersionForTenantMock.mockResolvedValue({
      id: "questionnaire-tenant",
      version: "v3",
      type: "BRANDS",
      sectionsJson: [],
    });
    prismaMock.questionnaireResponse.findMany.mockResolvedValueOnce([]);

    const request = new NextRequest(
      "https://wafia.test/api/v1/questionnaires/exports?type=BRANDS&format=json&version=v3"
    );

    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(getQuestionnaireVersionForTenantMock).toHaveBeenCalledWith("tenant-admin", "BRANDS", "v3");
  });
});
