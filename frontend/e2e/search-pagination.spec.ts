import { test, expect } from "@playwright/test";

test.describe("Search and Pagination", () => {
  test("search filters the table", async ({ page }) => {
    await page.goto("/properties");

    await page.getByPlaceholder("Search properties...").fill("Oxygen");

    await expect(page.getByText("Oxygen Residence").first()).toBeVisible();
    await expect(page.getByText("The Nest")).not.toBeVisible();
  });

  test("search with no results shows empty state", async ({ page }) => {
    await page.goto("/properties");
    await page.getByPlaceholder("Search properties...").fill("xxxxxxxxxxx");

    await expect(
      page.getByText("No properties match your search."),
    ).toBeVisible();
  });

  test("pagination works correctly", async ({ page }) => {
    await page.goto("/properties");

    await expect(page.locator("main")).toContainText("Showing 1–5");

    await page.getByRole("button", { name: "2", exact: true }).click();

    await expect(page.locator("main")).toContainText("Showing 6–");
  });
});
