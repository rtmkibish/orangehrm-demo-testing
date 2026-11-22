import { test, expect } from "../../fixtures/ui/admin.fixture";
import { AdminJobTitles } from "../../pages/admin/AdminJobTitles.page";

test.describe("Admin page related tests", () => {
  test("Should go to the Job Titles page", async ({ adminPage }) => {
    await expect(adminPage.topBarNavigation.activeTab).toHaveText(
      "User Management",
    );
    const topBarNavigation = adminPage.topBarNavigation;
    await topBarNavigation.clickDropdownTab("Job");
    const jobTitlesPage = await topBarNavigation.selectOption("Job Titles", AdminJobTitles);

    await expect(jobTitlesPage.topBarNavigation.activeTab).toHaveText("Job");
    await expect(jobTitlesPage.contentTitle).toHaveText("Job Titles");
  });
});
