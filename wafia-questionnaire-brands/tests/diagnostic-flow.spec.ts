import { test, expect } from "@playwright/test";

test("landing to results flow works", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("start-diagnostic").click();

  const results = page.getByTestId("results-summary");
  const maxSteps = 200;

  for (let i = 0; i < maxSteps; i++) {
    if (await results.isVisible()) break;

    const interstitial = page.getByTestId("interstitial-screen");
    if (await interstitial.isVisible()) {
      await interstitial.click();
      continue;
    }

    const questionInput = page.getByTestId("question-input").last();
    await expect(questionInput).toBeVisible();

    const type = await questionInput.getAttribute("data-question-type");
    const questionId = await questionInput.getAttribute("data-question-id");

    if (type === "single" || type === "multiple") {
      const option = questionInput.locator("[data-option-id]").first();
      await option.scrollIntoViewIfNeeded();
      await option.click({ force: true });
    } else if (type === "scale") {
      const slider = questionInput.getByTestId("scale-input");
      await slider.evaluate((node) => {
        const input = node as HTMLInputElement;
        input.value = "7";
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });
      await slider.evaluate((node) => {
        (node as HTMLInputElement).focus();
      });
      await page.keyboard.press("ArrowRight");
    } else if (type === "text") {
      await questionInput.getByTestId("text-input").fill("Test");
    } else {
      throw new Error(`Unknown question type: ${type}`);
    }

    const nextButton = page.getByTestId("next-question");

    if (!(await nextButton.isEnabled())) {
      if (type === "single" || type === "multiple") {
        const options = questionInput.locator("[data-option-id]");
        const count = await options.count();
        if (count > 1) {
          await options.nth(1).click({ force: true });
        }
      }
      if (type === "scale") {
        const slider = questionInput.getByTestId("scale-input");
        const max = (await slider.getAttribute("max")) || "10";
        await slider.evaluate((node, value) => {
          const input = node as HTMLInputElement;
          input.value = value;
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }, max);
        await slider.evaluate((node) => {
          (node as HTMLInputElement).focus();
        });
        await page.keyboard.press("ArrowRight");
      }
    }

    if (!(await nextButton.isEnabled())) {
      throw new Error(
        `Next disabled for question ${questionId} (type ${type})`
      );
    }
    await expect(nextButton).toBeEnabled();
    await nextButton.click();
  }

  await expect(results).toBeVisible();
});
