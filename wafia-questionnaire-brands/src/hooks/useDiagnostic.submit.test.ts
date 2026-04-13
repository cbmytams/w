import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Answers } from "../types";
import { hasLeadIdentity, submitBrandQuestionnaire } from "./useDiagnostic";

describe("useDiagnostic submission helpers", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("detects lead identity from ql_name/ql_company/ql_email", () => {
    expect(hasLeadIdentity({} as Answers)).toBe(false);
    expect(hasLeadIdentity({ ql_name: "Alice" } as Answers)).toBe(true);
    expect(hasLeadIdentity({ ql_company: "Acme" } as Answers)).toBe(true);
    expect(hasLeadIdentity({ ql_email: "alice@acme.com" } as Answers)).toBe(
      true
    );
  });

  it("posts questionnaire responses to submit API with BRANDS type", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: { id: "resp_1" } }), {
        status: 201,
        headers: { "content-type": "application/json" },
      })
    );
    vi.stubGlobal("fetch", fetchMock);

    const answers = { ql_company: "Acme", ql_name: "Alice" } as Answers;
    const result = await submitBrandQuestionnaire(answers);

    expect(fetchMock).toHaveBeenCalledWith("/api/v1/questionnaires/submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        type: "BRANDS",
        responses: answers,
      }),
      signal: undefined,
    });
    expect(result).toMatchObject({
      ok: true,
      status: 201,
      responseId: "resp_1",
    });
  });

  it("returns a failed status when submit API is not successful", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      })
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await submitBrandQuestionnaire({
      ql_company: "Acme",
    } as Answers);

    expect(result).toMatchObject({
      ok: false,
      status: 400,
      responseId: null,
    });
  });
});
