import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

const requireDashboardRoleMock = jest.fn();
const enforceSameOriginMock = jest.fn();
const enforceRateLimitMock = jest.fn();
const isSafeRecordIdMock = jest.fn();

const prismaMock = {
  talent: {
    update: jest.fn(),
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
    requireDashboardRoleMock.mockResolvedValue({ response: null, session: { id: "admin", role: "MANAGER" } });
  });

  it("returns 404 for Prisma P2025 not found", async () => {
    const notFoundError = new Prisma.PrismaClientKnownRequestError(
      "Record not found",
      { code: "P2025", clientVersion: "test" }
    );
    prismaMock.talent.update.mockRejectedValue(notFoundError);

    const request = new NextRequest("https://wafia.test/api/v1/dashboard/leads", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: "lead_123", status: "QUALIFIED" }),
    });

    const response = await PATCH(request);
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body).toEqual({ error: "Lead not found" });
  });

  it("returns 500 for unexpected database errors", async () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    prismaMock.talent.update.mockRejectedValue(new Error("database unavailable"));

    const request = new NextRequest("https://wafia.test/api/v1/dashboard/leads", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: "lead_456", status: "ARCHIVED" }),
    });

    const response = await PATCH(request);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({ error: "Internal Server Error" });
    expect(errorSpy).toHaveBeenCalled();

    errorSpy.mockRestore();
  });
});
