import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("clicking view opens the detail page", async ({ page }) => {
    await page.goto("/properties");
    await page.locator('button[title="View"]').first().click();
    await expect(page).toHaveURL(/\/properties\/\d+/);
    await expect(page.getByRole("heading", { level: 1 }).last()).toBeVisible();
  });

  test("back button returns to properties list", async ({ page }) => {
    await page.goto("/properties/1");

    await page.getByRole("button", { name: "Properties", exact: true }).click();

    await expect(page).toHaveURL("/properties");
  });

  test("landing page has correct title and sections", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("Property management, simplified."),
    ).toBeVisible();
    await expect(page.getByText("Everything ownership needs.")).toBeVisible();
    await expect(
      page.getByText("All your properties, in one place."),
    ).toBeVisible();
  });
});
