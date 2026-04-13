const findFirstMock = jest.fn();

jest.mock("@/lib/db", () => ({
  prisma: {
    user: {
      findFirst: (...args: unknown[]) => findFirstMock(...args),
    },
  },
}));

import type { Session } from "next-auth";
import { authOptions } from "@/lib/authOptions";

describe("authOptions session callback", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("injects tenantId into the session from Prisma", async () => {
    findFirstMock.mockResolvedValue({ tenantId: "tenant-123" });

    const session = await authOptions.callbacks?.session?.({
      session: {
        expires: new Date(Date.now() + 60_000).toISOString(),
        user: { name: "Admin" },
      } as unknown as Session,
      token: {
        sub: "admin@example.com",
        role: "ADMIN",
      },
      user: null as never,
      newSession: undefined,
      trigger: "update",
    });

    expect(findFirstMock).toHaveBeenCalledWith({
      where: {
        email: "admin@example.com",
        isActive: true,
      },
      select: {
        tenantId: true,
      },
    });
    expect(session?.user).toMatchObject({
      id: "admin@example.com",
      role: "ADMIN",
      tenantId: "tenant-123",
    });
  });
});
