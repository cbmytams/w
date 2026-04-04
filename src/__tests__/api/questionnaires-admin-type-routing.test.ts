import { NextRequest } from "next/server";

const requireDashboardRoleMock = jest.fn();
const enforceSameOriginMock = jest.fn();
const enforceRateLimitMock = jest.fn();
const sanitizeQuestionMock = jest.fn();
const sanitizeQuestionUpdatesMock = jest.fn();
const validateBodyMock = jest.fn();

const prismaMock = {
  questionnaire: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  tenant: {
    findFirst: jest.fn(),
  },
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
      session: { id: "admin-user", role: "ADMIN" },
    });
    prismaMock.tenant.findFirst.mockResolvedValue(null);
    prismaMock.auditLog.create.mockResolvedValue(null);
  });

  it("uses BRANDS type for questions POST lookup and creation", async () => {
    sanitizeQuestionMock.mockReturnValue({
      id: "brand_q_1",
      category: "QUICK_LEAD",
      type: "single",
      question: "Test question",
    });
    prismaMock.questionnaire.findFirst.mockResolvedValue(null);
    prismaMock.questionnaire.create.mockResolvedValue({
      id: "questionnaire-brand-1",
      sectionsJson: [],
    });
    prismaMock.questionnaire.update.mockResolvedValue({
      id: "questionnaire-brand-1",
    });

    const request = new NextRequest("https://wafia.test/api/v1/questionnaires/questions?type=BRANDS", {
      method: "POST",
      headers: { "content-type": "application/json", origin: "https://wafia.test" },
      body: JSON.stringify({ question: { id: "ignored" } }),
    });

    const response = await createQuestion(request);

    expect(response.status).toBe(200);
    expect(prismaMock.questionnaire.findFirst).toHaveBeenCalledWith({
      where: { isActive: true, type: "BRANDS" },
      orderBy: { createdAt: "desc" },
    });
    expect(prismaMock.questionnaire.create).toHaveBeenCalledWith({
      data: {
        version: "v1",
        type: "BRANDS",
        sectionsJson: [],
        isActive: true,
      },
    });
  });

  it("uses BRANDS type for questions/[id] PATCH lookup", async () => {
    sanitizeQuestionUpdatesMock.mockReturnValue({ question: "Updated question" });
    prismaMock.questionnaire.findFirst.mockResolvedValue({
      id: "questionnaire-brand-2",
      sectionsJson: [{ id: "brand_q_2", question: "Before" }],
    });
    prismaMock.questionnaire.update.mockResolvedValue({
      id: "questionnaire-brand-2",
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
    expect(prismaMock.questionnaire.findFirst).toHaveBeenCalledWith({
      where: { isActive: true, type: "BRANDS" },
      orderBy: { createdAt: "desc" },
    });
  });

  it("uses BRANDS type for reorder POST lookup", async () => {
    validateBodyMock.mockReturnValue({
      success: true,
      data: { startIndex: 0, endIndex: 0 },
    });
    prismaMock.questionnaire.findFirst.mockResolvedValue({
      id: "questionnaire-brand-3",
      sectionsJson: [{ id: "brand_q_3", order_index: 0 }],
    });
    prismaMock.questionnaire.update.mockResolvedValue({
      id: "questionnaire-brand-3",
    });

    const request = new NextRequest("https://wafia.test/api/v1/questionnaires/reorder?type=BRANDS", {
      method: "POST",
      headers: { "content-type": "application/json", origin: "https://wafia.test" },
      body: JSON.stringify({ startIndex: 0, endIndex: 0 }),
    });

    const response = await reorderQuestions(request);

    expect(response.status).toBe(200);
    expect(prismaMock.questionnaire.findFirst).toHaveBeenCalledWith({
      where: { isActive: true, type: "BRANDS" },
      orderBy: { createdAt: "desc" },
    });
  });
});
