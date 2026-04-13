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

import { OPTIONS, POST } from "@/app/api/v1/[...path]/route";

describe("platform proxy route", () => {
  const context = { params: Promise.resolve({ path: ["contacts", "intake"] }) };

  beforeEach(() => {
    jest.clearAllMocks();

    process.env.PLATFORM_PROXY_ALLOWLIST = "contacts/intake";
    process.env.INTERNAL_JOB_TOKEN = "internal-token";
    process.env.PLATFORM_PROXY_MAX_BODY_BYTES = "3";

    getWebsiteEnvMock.mockReturnValue({
      platformPublicUrl: "https://platform.wafia.test",
    });
    requireDashboardRoleMock.mockResolvedValue({
      response: null,
      session: { id: "admin" },
    });
    enforceRateLimitMock.mockReturnValue(null);
    enforceSameOriginMock.mockReturnValue(null);
  });

  it("handles allowed preflight locally with 204 and CORS headers", async () => {
    getAllowedOriginsForRequestMock.mockReturnValue(["https://allowed.origin"]);

    const request = new NextRequest(
      "https://wafia.test/api/v1/contacts/intake",
      {
        method: "OPTIONS",
        headers: {
          origin: "https://allowed.origin",
          "access-control-request-headers": "content-type,x-custom-header",
        },
      }
    );

    const response = await OPTIONS(request, context);

    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
      "https://allowed.origin"
    );
    expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
      "content-type,x-custom-header"
    );
    expect(response.headers.get("Allow")).toContain("OPTIONS");
  });

  it("rejects disallowed preflight with 403", async () => {
    getAllowedOriginsForRequestMock.mockReturnValue(["https://allowed.origin"]);

    const request = new NextRequest(
      "https://wafia.test/api/v1/contacts/intake",
      {
        method: "OPTIONS",
        headers: { origin: "https://evil.origin" },
      }
    );

    const response = await OPTIONS(request, context);
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body).toEqual({ success: false, error: "Invalid origin" });
  });

  it("returns 413 when body exceeds configured max bytes", async () => {
    const fetchSpy = jest.spyOn(global, "fetch");

    const request = new NextRequest(
      "https://wafia.test/api/v1/contacts/intake",
      {
        method: "POST",
        headers: {
          authorization: "Bearer internal-token",
          "content-type": "application/json",
          "content-length": "4",
        },
        body: "abcd",
      }
    );

    const response = await POST(request, context);
    const body = await response.json();

    expect(response.status).toBe(413);
    expect(body).toEqual({
      success: false,
      error: "Request body too large",
      code: "PAYLOAD_TOO_LARGE",
    });
    expect(fetchSpy).not.toHaveBeenCalled();

    fetchSpy.mockRestore();
  });
});
