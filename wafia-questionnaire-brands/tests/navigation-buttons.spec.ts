import { expect, test } from "@playwright/test";

test("landing and contact buttons navigate correctly", async ({ page }) => {
  await page.goto("/");

  const backLink = page.getByTestId("landing-back-to-site");
  await expect(backLink).toBeVisible();
  await expect(backLink).toHaveAttribute("href", /^(\/|\/for-brands)$/);

  await page.getByTestId("start-express").click();
  await expect(
    page.getByRole("heading", { name: "Être recontacté", level: 2 })
  ).toBeVisible();

  await page.getByTestId("contact-back").click();
  await expect(page.getByTestId("start-diagnostic")).toBeVisible();
});

test("first-question previous button returns to landing", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("start-diagnostic").click();

  await expect(page.getByTestId("question-input")).toBeVisible();
  await page.getByTestId("prev-question").click();

  await expect(page.getByTestId("start-diagnostic")).toBeVisible();
});
