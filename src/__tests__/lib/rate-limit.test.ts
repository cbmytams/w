describe("rate-limit", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("gracefully skips enforcement when Upstash env vars are missing", async () => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;

    const logWarnMock = jest.fn();
    jest.doMock("@/lib/logger", () => ({
      logWarn: (...args: unknown[]) => logWarnMock(...args),
    }));

    const rateLimitModule = await import("@/lib/rate-limit");
    const result = await rateLimitModule.checkRateLimit("scope:1.1.1.1", {
      kind: "default",
    });

    expect(result.success).toBe(true);
    expect(result.reason).toBe("missing_config");
    expect(logWarnMock).toHaveBeenCalledTimes(1);
  });

  it("uses Upstash Redis limiter when env vars are configured", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://redis.example.com";
    process.env.UPSTASH_REDIS_REST_TOKEN = "token";

    const limitMock = jest.fn().mockResolvedValue({
      success: true,
      limit: 10,
      remaining: 9,
      reset: Math.floor(Date.now() / 1000) + 5,
    });

    const slidingWindowMock = jest.fn().mockReturnValue("window");
    const ratelimitCtor = jest.fn().mockImplementation(() => ({
      limit: limitMock,
    }));
    (ratelimitCtor as unknown as { slidingWindow: unknown }).slidingWindow =
      slidingWindowMock;

    const redisCtor = jest.fn();

    jest.doMock("@upstash/ratelimit", () => ({
      Ratelimit: ratelimitCtor,
    }));
    jest.doMock("@upstash/redis", () => ({
      Redis: redisCtor,
    }));
    jest.doMock("@/lib/logger", () => ({
      logWarn: jest.fn(),
    }));

    const rateLimitModule = await import("@/lib/rate-limit");
    const result = await rateLimitModule.checkRateLimit("scope:2.2.2.2", {
      kind: "default",
    });

    expect(result.success).toBe(true);
    expect(redisCtor).toHaveBeenCalledWith({
      url: "https://redis.example.com",
      token: "token",
    });
    expect(slidingWindowMock).toHaveBeenCalledWith(10, "10 s");
    expect(limitMock).toHaveBeenCalledWith("scope:2.2.2.2");
  });
});
