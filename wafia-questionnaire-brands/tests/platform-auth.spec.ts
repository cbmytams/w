import { expect, test } from "@playwright/test";

const platformBaseUrl = process.env.PLATFORM_E2E_BASE_URL;
const adminUsername = process.env.PLATFORM_E2E_ADMIN_USERNAME;
const adminPassword = process.env.PLATFORM_E2E_ADMIN_PASSWORD;

test.describe("platform auth flow", () => {
  test.skip(
    !platformBaseUrl,
    "Set PLATFORM_E2E_BASE_URL to run platform auth E2E tests."
  );

  test("rejects invalid credentials", async ({ request }) => {
    const response = await request.post(
      `${platformBaseUrl}/api/v1/admin/session`,
      {
        headers: {
          "content-type": "application/json",
          origin: platformBaseUrl || "",
        },
        data: {
          username: "unknown-user",
          password: "wrong-password",
        },
      }
    );

    expect(response.status()).toBe(401);
    const payload = (await response.json()) as {
      error?: string;
      code?: string;
    };
    expect(payload.error).toBeTruthy();
    expect(payload.code).toBe("UNAUTHORIZED");
  });

  test("creates and validates a real admin session", async ({ page }) => {
    test.skip(
      !adminUsername || !adminPassword,
      "Set PLATFORM_E2E_ADMIN_USERNAME and PLATFORM_E2E_ADMIN_PASSWORD."
    );

    await page.goto(`${platformBaseUrl}/login`);
    await page.getByLabel(/email ou username/i).fill(adminUsername || "");
    await page.getByLabel(/password/i).fill(adminPassword || "");
    await page.getByRole("button", { name: /se connecter/i }).click();

    await expect(page).toHaveURL(new RegExp(`${platformBaseUrl}/dashboard`));

    const sessionResponse = await page.request.get(
      `${platformBaseUrl}/api/v1/admin/session`,
      {
        headers: { origin: platformBaseUrl || "" },
      }
    );
    expect(sessionResponse.status()).toBe(200);
  });
});
