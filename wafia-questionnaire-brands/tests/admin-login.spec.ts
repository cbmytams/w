import { test, expect } from "@playwright/test";

test("admin login gate works", async ({ page }) => {
  await page.goto("/questionnaire/admin");

  await expect(page.getByTestId("admin-login")).toBeVisible();

  await page.getByTestId("admin-username").fill("admin");
  await page.getByTestId("admin-password").fill("admin");
  await page.getByTestId("admin-login-submit").click();

  await expect(page.getByTestId("admin-dashboard")).toBeVisible();
});
