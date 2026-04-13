import { NextRequest } from "next/server";

const requireDashboardRoleMock = jest.fn();
const enforceSameOriginMock = jest.fn();
const enforceRateLimitMock = jest.fn();
const sanitizeQuestionMock = jest.fn();
const sanitizeQuestionUpdatesMock = jest.fn();
const validateBodyMock = jest.fn();
const appendQuestionForTenantMock = jest.fn();
const updateQuestionForTenantMock = jest.fn();
const reorderQuestionsForTenantMock = jest.fn();

const prismaMock = {
  auditLog: {
    create: jest.fn(),
  },
};

jest.mock("@/lib/apiAuth", () => ({
  requireDashboardRole: (...args: unknown[]) => requireDashboardRoleMock(...args),
}));

jest.mock("@/lib/requestSecurity", () => ({
  enforceSameOrigin: (...args: unknown[]) => enforceSameOriginMock(...args),
  enforceRateLimit: (...args: unknown[]) => enforceRateLimitMock(...args),
}));

jest.mock("@/lib/questionnaireValidation", () => ({
  sanitizeQuestion: (...args: unknown[]) => sanitizeQuestionMock(...args),
  sanitizeQuestionUpdates: (...args: unknown[]) => sanitizeQuestionUpdatesMock(...args),
  isSafeRecordId: () => true,
}));

jest.mock("@/lib/api-response", () => ({
  validateBody: (...args: unknown[]) => validateBodyMock(...args),
  apiError: (message: string) => Response.json({ error: message }, { status: 400 }),
}));

jest.mock("@/lib/questionnaireTenant", () => ({
  appendQuestionForTenant: (...args: unknown[]) => appendQuestionForTenantMock(...args),
  updateQuestionForTenant: (...args: unknown[]) => updateQuestionForTenantMock(...args),
  reorderQuestionsForTenant: (...args: unknown[]) => reorderQuestionsForTenantMock(...args),
  deleteQuestionForTenant: jest.fn(),
}));

jest.mock("@/lib/db", () => ({ prisma: prismaMock }));

import { POST as createQuestion } from "@/app/api/v1/questionnaires/questions/route";
import { PATCH as updateQuestion } from "@/app/api/v1/questionnaires/questions/[id]/route";
import { POST as reorderQuestions } from "@/app/api/v1/questionnaires/reorder/route";

describe("questionnaires admin routes type scoping", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    enforceSameOriginMock.mockReturnValue(null);
    enforceRateLimitMock.mockReturnValue(null);
    requireDashboardRoleMock.mockResolvedValue({
      response: null,
      session: { id: "admin-user", role: "ADMIN", tenantId: "tenant-admin" },
    });
    prismaMock.auditLog.create.mockResolvedValue(null);
  });

  it("uses BRANDS type and tenantId for questions POST", async () => {
    sanitizeQuestionMock.mockReturnValue({
      id: "brand_q_1",
      category: "QUICK_LEAD",
      type: "single",
      question: "Test question",
    });
    appendQuestionForTenantMock.mockResolvedValue({
      id: "questionnaire-brand-1",
      updated: { id: "questionnaire-brand-1" },
      questions: [],
    });

    const request = new NextRequest("https://wafia.test/api/v1/questionnaires/questions?type=BRANDS", {
      method: "POST",
      headers: { "content-type": "application/json", origin: "https://wafia.test" },
      body: JSON.stringify({ question: { id: "ignored" } }),
    });

    const response = await createQuestion(request);

    expect(response.status).toBe(200);
    expect(appendQuestionForTenantMock).toHaveBeenCalledWith(
      "tenant-admin",
      "BRANDS",
      expect.objectContaining({ id: "brand_q_1" }),
    );
  });

  it("uses BRANDS type and tenantId for questions/[id] PATCH", async () => {
    sanitizeQuestionUpdatesMock.mockReturnValue({ question: "Updated question" });
    updateQuestionForTenantMock.mockResolvedValue({
      updated: { id: "questionnaire-brand-2" },
      questions: [{ id: "brand_q_2", question: "After" }],
    });

    const request = new NextRequest("https://wafia.test/api/v1/questionnaires/questions/brand_q_2?type=BRANDS", {
      method: "PATCH",
      headers: { "content-type": "application/json", origin: "https://wafia.test" },
      body: JSON.stringify({ updates: { question: "After" } }),
    });

    const response = await updateQuestion(request, {
      params: Promise.resolve({ id: "brand_q_2" }),
    });

    expect(response.status).toBe(200);
    expect(updateQuestionForTenantMock).toHaveBeenCalledWith(
      "tenant-admin",
      "BRANDS",
      "brand_q_2",
      expect.objectContaining({ question: "Updated question" }),
    );
  });

  it("uses BRANDS type and tenantId for reorder POST", async () => {
    validateBodyMock.mockReturnValue({
      success: true,
      data: { startIndex: 0, endIndex: 0 },
    });
    reorderQuestionsForTenantMock.mockResolvedValue({
      updated: { id: "questionnaire-brand-3" },
      questions: [{ id: "brand_q_3", order_index: 0 }],
    });

    const request = new NextRequest("https://wafia.test/api/v1/questionnaires/reorder?type=BRANDS", {
      method: "POST",
      headers: { "content-type": "application/json", origin: "https://wafia.test" },
      body: JSON.stringify({ startIndex: 0, endIndex: 0 }),
    });

    const response = await reorderQuestions(request);

    expect(response.status).toBe(200);
    expect(reorderQuestionsForTenantMock).toHaveBeenCalledWith("tenant-admin", "BRANDS", 0, 0);
  });
});
