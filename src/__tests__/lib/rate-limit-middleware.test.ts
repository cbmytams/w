import { NextRequest } from "next/server";

const checkRateLimitMock = jest.fn();

jest.mock("@/lib/rate-limit", () => ({
  checkRateLimit: (...args: unknown[]) => checkRateLimitMock(...args),
}));

import { enforceRateLimitWithUpstash } from "@/lib/rate-limit-middleware";

describe("rate-limit middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns null when request is allowed", async () => {
    checkRateLimitMock.mockResolvedValue({
      success: true,
      limit: 10,
      remaining: 9,
      reset: Math.floor(Date.now() / 1000) + 10,
    });

    const request = new NextRequest("https://wafia.test/api/contact", {
      method: "POST",
      headers: {
        "x-forwarded-for": "1.2.3.4",
      },
    });

    const result = await enforceRateLimitWithUpstash(request, {
      scope: "contact",
      kind: "auth",
    });

    expect(result).toBeNull();
    expect(checkRateLimitMock).toHaveBeenCalledWith("contact:1.2.3.4", {
      kind: "auth",
    });
  });

  it("returns 429 and rate limit headers when request is blocked", async () => {
    checkRateLimitMock.mockResolvedValue({
      success: false,
      limit: 10,
      remaining: 0,
      reset: Math.floor(Date.now() / 1000) + 30,
    });

    const request = new NextRequest("https://wafia.test/api/contact", {
      method: "POST",
      headers: {
        "x-forwarded-for": "5.6.7.8",
      },
    });

    const result = await enforceRateLimitWithUpstash(request, {
      scope: "contact",
      kind: "auth",
    });

    expect(result).not.toBeNull();
    expect(result?.status).toBe(429);
    expect(result?.headers.get("X-RateLimit-Limit")).toBe("10");
    expect(result?.headers.get("X-RateLimit-Remaining")).toBe("0");
    expect(result?.headers.get("Retry-After")).toBeTruthy();
  });
});
