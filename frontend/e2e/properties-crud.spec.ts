import { test, expect } from "@playwright/test";

test.describe("Properties CRUD", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/properties");
  });

  test("can add a new property", async ({ page }) => {
    await page.getByRole("button", { name: "Add Property" }).click();
    await page.locator('input[placeholder*="Oxygen"]').fill("Test Property");
    await page.locator('input[placeholder*="Abator"]').fill("Str. Test, Nr. 1");
    await page.locator('input[placeholder*="Cluj"]').fill("Cluj-Napoca");
    await page.locator('input[placeholder*="400001"]').fill("400001");
    await page.locator('input[inputmode="numeric"]').fill("750");
    await page.getByRole("button", { name: "Save Property" }).click();

    await expect(page).toHaveURL("/properties");
    await page.getByPlaceholder("Search properties...").fill("Test Property");
    await expect(
      page.locator("main").getByText("Test Property").first(),
    ).toBeVisible();
  });

  test("shows validation errors when submitting empty form", async ({
    page,
  }) => {
    await page.goto("/properties/new");
    await page.getByRole("button", { name: "Save Property" }).click();
    await expect(page.getByText(/required/i).first()).toBeVisible();
  });

  test("can edit an existing property", async ({ page }) => {
    const editButton = page.locator('button[title="Edit"]').first();
    await expect(editButton).toBeVisible();

    await editButton.click();
    await expect(page).toHaveURL(/\/properties\/\d+\/edit/);

    const nameInput = page.locator('input[placeholder*="Oxygen"]');
    await nameInput.fill("");
    await nameInput.fill("UniqueEditName");

    await page.getByRole("button", { name: "Save Property" }).click();

    await expect(page).toHaveURL(/\/properties\/\d+$/);
    await expect(page.locator("main")).toContainText("UniqueEditName");
  });

  test("can delete a property with confirmation", async ({ page }) => {
    await expect(page.locator('button[title="Delete"]').first()).toBeVisible();

    const row = page.locator("div.flex.items-center.gap-3.min-w-0").first();
    const propertyName = await row.locator("span.text-brown-dark").innerText();
    const initialCount = await page
      .locator("main")
      .getByText(propertyName)
      .count();

    await page.locator('button[title="Delete"]').first().click();

    const deleteButton = page.getByRole("button", {
      name: "Delete",
      exact: true,
    });
    await deleteButton.click();

    await page.waitForTimeout(1000);

    const finalCount = await page
      .locator("main")
      .getByText(propertyName)
      .count();
    expect(finalCount).toBeLessThan(initialCount);
  });
});
