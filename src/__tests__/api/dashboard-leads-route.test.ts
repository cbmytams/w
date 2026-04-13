import { NextRequest } from "next/server";

const requireDashboardRoleMock = jest.fn();
const enforceSameOriginMock = jest.fn();
const enforceRateLimitMock = jest.fn();
const isSafeRecordIdMock = jest.fn();

const prismaMock = {
  talent: {
    updateMany: jest.fn(),
    findFirst: jest.fn(),
  },
};

jest.mock("@/lib/apiAuth", () => ({
  requireDashboardRole: (...args: unknown[]) =>
    requireDashboardRoleMock(...args),
}));

jest.mock("@/lib/requestSecurity", () => ({
  enforceSameOrigin: (...args: unknown[]) => enforceSameOriginMock(...args),
  enforceRateLimit: (...args: unknown[]) => enforceRateLimitMock(...args),
}));

jest.mock("@/lib/questionnaireValidation", () => ({
  isSafeRecordId: (...args: unknown[]) => isSafeRecordIdMock(...args),
}));

jest.mock("@/lib/db", () => ({ prisma: prismaMock }));

import { PATCH } from "@/app/api/v1/dashboard/leads/route";

describe("dashboard leads PATCH route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    enforceSameOriginMock.mockReturnValue(null);
    enforceRateLimitMock.mockReturnValue(null);
    isSafeRecordIdMock.mockReturnValue(true);
    requireDashboardRoleMock.mockResolvedValue({
      response: null,
      session: { id: "admin", role: "MANAGER", tenantId: "tenant-1" },
    });
  });

  it("returns 404 when no tenant-scoped lead is updated", async () => {
    prismaMock.talent.updateMany.mockResolvedValue({ count: 0 });

    const request = new NextRequest(
      "https://wafia.test/api/v1/dashboard/leads",
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: "lead_123", status: "QUALIFIED" }),
      }
    );

    const response = await PATCH(request);
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body).toEqual({ success: false, error: "Lead not found" });
    expect(prismaMock.talent.updateMany).toHaveBeenCalledWith({
      where: { id: "lead_123", tenantId: "tenant-1" },
      data: {
        approvalStatus: "APPROVED",
        status: "ACTIVE",
      },
    });
  });

  it("returns 500 for unexpected database errors", async () => {
    prismaMock.talent.updateMany.mockRejectedValue(
      new Error("database unavailable")
    );

    const request = new NextRequest(
      "https://wafia.test/api/v1/dashboard/leads",
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: "lead_456", status: "ARCHIVED" }),
      }
    );

    const response = await PATCH(request);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({
      success: false,
      error: "Internal Server Error",
    });
  });
});
