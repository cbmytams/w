const prismaMock = {
  talent: {
    findMany: jest.fn(),
    count: jest.fn(),
    updateMany: jest.fn(),
  },
  questionnaireResponse: {
    count: jest.fn(),
  },
  auditLog: {
    findMany: jest.fn(),
  },
  user: {
    findMany: jest.fn(),
  },
};

jest.mock("@/lib/db", () => ({ prisma: prismaMock }));

import { getLeadsPage } from "@/lib/dashboard/queries/leads";
import { fetchKpiRawData } from "@/lib/dashboard/queries/kpi-data";
import { getAuditEvents } from "@/lib/dashboard/queries/audit";

describe("dashboard queries tenant scoping", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    prismaMock.talent.findMany.mockResolvedValue([]);
    prismaMock.talent.count.mockResolvedValue(0);
    prismaMock.questionnaireResponse.count.mockResolvedValue(0);
    prismaMock.auditLog.findMany.mockResolvedValue([]);
    prismaMock.user.findMany.mockResolvedValue([]);
  });

  it("adds tenantId to leads queries", async () => {
    await getLeadsPage({
      filters: { from: "2026-01-01", to: "2026-01-31" },
      role: "ADMIN",
      cursor: null,
      limit: 20,
      tenantId: "tenant-1",
    });

    expect(prismaMock.talent.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          tenantId: "tenant-1",
        }),
      })
    );
  });

  it("adds tenantId to KPI queries", async () => {
    await fetchKpiRawData({ from: "2026-01-01", to: "2026-01-31" }, "tenant-2");

    expect(prismaMock.talent.count).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          tenantId: "tenant-2",
        }),
      })
    );
    expect(prismaMock.questionnaireResponse.count).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          talent: expect.objectContaining({
            tenantId: "tenant-2",
          }),
        }),
      })
    );
  });

  it("adds tenantId to audit log and actor lookups", async () => {
    await getAuditEvents({
      from: "2026-01-01",
      to: "2026-01-31",
      tenantId: "tenant-3",
    });

    expect(prismaMock.auditLog.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          tenantId: "tenant-3",
        }),
      })
    );
  });
});
