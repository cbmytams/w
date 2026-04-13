import { NextRequest } from "next/server";

const getWebsiteEnvMock = jest.fn();
const requireDashboardRoleMock = jest.fn();
const enforceRateLimitMock = jest.fn();
const enforceSameOriginMock = jest.fn();
const getAllowedOriginsForRequestMock = jest.fn();

jest.mock("@/lib/env.server", () => ({
  getWebsiteEnv: (...args: unknown[]) => getWebsiteEnvMock(...args),
}));

jest.mock("@/lib/apiAuth", () => ({
  requireDashboardRole: (...args: unknown[]) =>
    requireDashboardRoleMock(...args),
}));

jest.mock("@/lib/requestSecurity", () => ({
  enforceRateLimit: (...args: unknown[]) => enforceRateLimitMock(...args),
  enforceSameOrigin: (...args: unknown[]) => enforceSameOriginMock(...args),
  getAllowedOriginsForRequest: (...args: unknown[]) =>
    getAllowedOriginsForRequestMock(...args),
}));

import { GET, OPTIONS, POST } from "@/app/platform/[...path]/route";

describe("platform public proxy route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.PLATFORM_PROXY_ALLOWLIST = "contacts/intake";
    process.env.INTERNAL_JOB_TOKEN = "internal-token";

    getWebsiteEnvMock.mockReturnValue({
      platformPublicUrl: "https://platform.wafia.test",
    });
    enforceRateLimitMock.mockReturnValue(null);
    enforceSameOriginMock.mockReturnValue(null);
  });

  it("rejects API proxy calls when dashboard auth fails", async () => {
    const authResponse = Response.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
    requireDashboardRoleMock.mockResolvedValue({ response: authResponse });

    const request = new NextRequest(
      "https://wafia.test/platform/api/contacts/intake",
      {
        method: "GET",
      }
    );
    const context = {
      params: Promise.resolve({ path: ["api", "contacts", "intake"] }),
    };

    const response = await GET(request, context);

    expect(response.status).toBe(401);
    expect(requireDashboardRoleMock).toHaveBeenCalledTimes(1);
  });

  it("allows internal token for API proxy calls without dashboard auth", async () => {
    const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    );

    const request = new NextRequest(
      "https://wafia.test/platform/api/contacts/intake",
      {
        method: "POST",
        headers: {
          authorization: "Bearer internal-token",
          "content-type": "application/json",
        },
        body: JSON.stringify({ ping: true }),
      }
    );
    const context = {
      params: Promise.resolve({ path: ["api", "contacts", "intake"] }),
    };

    const response = await POST(request, context);

    expect(response.status).toBe(200);
    expect(requireDashboardRoleMock).not.toHaveBeenCalled();
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    fetchSpy.mockRestore();
  });

  it("blocks API paths not present in proxy allowlist", async () => {
    const request = new NextRequest(
      "https://wafia.test/platform/api/internal/secrets",
      { method: "GET" }
    );
    const context = {
      params: Promise.resolve({ path: ["api", "internal", "secrets"] }),
    };

    const response = await GET(request, context);
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body).toEqual({
      success: false,
      error: "Route not exposed by proxy",
      code: "ROUTE_NOT_ALLOWED",
    });
  });

  it("handles API preflight locally for allowed origins", async () => {
    getAllowedOriginsForRequestMock.mockReturnValue(["https://allowed.origin"]);

    const request = new NextRequest(
      "https://wafia.test/platform/api/contacts/intake",
      {
        method: "OPTIONS",
        headers: {
          origin: "https://allowed.origin",
          "access-control-request-headers": "content-type,x-custom",
        },
      }
    );
    const context = {
      params: Promise.resolve({ path: ["api", "contacts", "intake"] }),
    };

    const response = await OPTIONS(request, context);

    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
      "https://allowed.origin"
    );
    expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
      "content-type,x-custom"
    );
  });
});
