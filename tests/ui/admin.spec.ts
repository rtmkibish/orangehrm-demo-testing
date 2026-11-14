import { test, expect } from "../../fixtures/ui/admin.fixture";

test.describe("Admin page related tests", () => {
  test("Should go to the Job Titles page", async ({ adminPage }) => {
    await expect(adminPage.topBarNavigation.activeSection).toHaveText(
      "User Management",
    );
    await adminPage.topBarNavigation
      .clickSection("Job")
      .selectOption("Job Titles");

    await expect(adminPage.topBarNavigation.activeSection).toHaveText("Job");
    await expect(adminPage.page.locator(".orangehrm-main-title")).toHaveText(
      "Job Titles",
    );
  });
});
