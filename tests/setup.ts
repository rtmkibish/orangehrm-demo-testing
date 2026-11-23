import { test as setup, expect } from "@playwright/test";
import { STORAGE_STATE } from "../playwright.config";

setup.describe("Storage state setup", () => {
  setup("Do login and save storage state", async ({ page }) => {
    await page.goto("/web/index.php/auth/login");
    await page.locator("input[name='username']").fill(process.env.USER_NAME!);
    await page.locator("input[type='password']").fill(process.env.PASSWORD!);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(
      page.getByRole("heading", { name: "Dashboard" }),
    ).toBeVisible();

    await page.context().storageState({ path: STORAGE_STATE });
  });
});
