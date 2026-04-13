import { NextRequest } from "next/server";

const requireDashboardRoleMock = jest.fn();
const enforceRateLimitMock = jest.fn();

const prismaMock = {
  talent: {
    findMany: jest.fn(),
  },
};

jest.mock("@/lib/apiAuth", () => ({
  requireDashboardRole: (...args: unknown[]) => requireDashboardRoleMock(...args),
}));

jest.mock("@/lib/requestSecurity", () => ({
  enforceRateLimit: (...args: unknown[]) => enforceRateLimitMock(...args),
}));

jest.mock("@/lib/db", () => ({ prisma: prismaMock }));

import { GET } from "@/app/api/talents/route";

describe("talents route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    enforceRateLimitMock.mockReturnValue(null);
    requireDashboardRoleMock.mockResolvedValue({
      response: null,
      session: {
        id: "admin@example.com",
        role: "MANAGER",
        tenantId: "tenant-1",
      },
    });
  });

  it("scopes the talents listing by tenant", async () => {
    prismaMock.talent.findMany.mockResolvedValue([]);

    const request = new NextRequest("https://wafia.test/api/talents");
    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(prismaMock.talent.findMany).toHaveBeenCalledWith({
      where: {
        tenantId: "tenant-1",
      },
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        slug: true,
        status: true,
        approvalStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  });
});
