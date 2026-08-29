import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";

describe("/api/contact route", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.restoreAllMocks();
    process.env = { ...originalEnv };
    process.env.CONTACT_WEBHOOK_URL = "https://hooks.wafia.test/contact";
    process.env.CONTACT_INTAKE_TOKEN = "intake-token";
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("returns 502 when webhook call fails", async () => {
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response("upstream error", { status: 500 }));

    const request = new NextRequest("https://wafia.test/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://wafia.test",
      },
      body: JSON.stringify({
        name: "Marie Dupont",
        email: "marie@wafia.fr",
        company: "Wafia",
        message: "Bonjour, je souhaite discuter d'une collaboration marque.",
        type: "brand",
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body).toEqual({
      success: false,
      error:
        "Le service de contact est temporairement indisponible. Merci de réessayer.",
    });
  });

  it("forwards payload and returns submitted true when webhook succeeds", async () => {
    const fetchSpy = jest
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));

    const request = new NextRequest("https://wafia.test/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://wafia.test",
      },
      body: JSON.stringify({
        name: "Marie Dupont",
        email: "marie@wafia.fr",
        company: "Wafia",
        message: "Bonjour, je souhaite discuter d'une collaboration marque.",
        type: "brand",
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ success: true, data: { submitted: true } });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://hooks.wafia.test/contact",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bearer intake-token",
        }),
      })
    );
  });

  it("rejects invalid payload", async () => {
    const request = new NextRequest("https://wafia.test/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://wafia.test",
      },
      body: "not-json",
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({ success: false, error: "Payload invalide." });
  });
});
