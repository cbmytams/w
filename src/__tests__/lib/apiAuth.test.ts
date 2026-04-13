const getServerSessionMock = jest.fn();

jest.mock("next-auth/next", () => ({
  getServerSession: (...args: unknown[]) => getServerSessionMock(...args),
}));

import { requireDashboardRole } from "@/lib/apiAuth";

describe("requireDashboardRole", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("rejects sessions without tenantId", async () => {
    getServerSessionMock.mockResolvedValue({
      user: {
        id: "admin@example.com",
        name: "Admin",
        role: "ADMIN",
      },
    });

    const response = await requireDashboardRole(
      new Request("https://wafia.test/api/v1/dashboard/leads") as never,
    );

    expect(response.session).toBeNull();
    expect(response.response?.status).toBe(403);
  });

  it("returns tenantId for authorized sessions", async () => {
    getServerSessionMock.mockResolvedValue({
      user: {
        id: "admin@example.com",
        name: "Admin",
        role: "ADMIN",
        tenantId: "tenant-456",
      },
    });

    const response = await requireDashboardRole(
      new Request("https://wafia.test/api/v1/dashboard/leads") as never,
    );

    expect(response.response).toBeNull();
    expect(response.session).toEqual({
      id: "admin@example.com",
      name: "Admin",
      role: "ADMIN",
      tenantId: "tenant-456",
    });
  });
});
