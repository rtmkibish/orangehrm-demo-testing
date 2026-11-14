import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage.page";

test.describe("Basic tests that verify logged in user", () => {
  test("Logged user goes to the Dashboard page", async ({ page }) => {
    const dashboardPage = await DashboardPage.visit(page);

    await expect(dashboardPage.pageHeader).toHaveText("Dashboard");
  });

  test("Goes to Admin page from Dashboard", async ({ page }) => {
    const dashboardPage = await DashboardPage.visit(page);
    const adminPage = await dashboardPage.navigation.goto("adminPage");

    await expect(adminPage.pageHeader).toBeVisible();
  });
});
