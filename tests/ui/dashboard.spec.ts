import { test, expect } from "../../fixtures/ui/admin.fixture";
import { shortcuts } from "../../mocks/ui/dashboard.mocks";
import { DashboardPage } from "../../pages/DashboardPage.page";
import type { TestDetails } from "@playwright/test";

const suiteInfo: TestDetails = {
  annotation: {
    type: "info",
    description: "The test uses API mocks.",
  },
};

test.describe("Dashboard related test suite", suiteInfo, () => {
  [
    {
      summary: "Quick Launch to have no shortcuts",
      mock: shortcuts.allDisabled,
      shortcutsNumber: 0,
      expShortcuts: [],
    },
    {
      summary: "Quick Launch to have 'My Leave' and 'My Timesheet' shortcuts",
      mock: shortcuts.twoEnabled,
      shortcutsNumber: 2,
      expShortcuts: ["My Leave", "My Timesheet"],
    },
    {
      summary: "Quick Launch to have all 6 shortcuts",
      mock: shortcuts.allEnabled,
      shortcutsNumber: 6,
      expShortcuts: [
        "Assign Leave",
        "Leave List",
        "Timesheets",
        "Apply Leave",
        "My Leave",
        "My Timesheet",
      ],
    },
  ].forEach(({ summary, mock, shortcutsNumber, expShortcuts }) => {
    test(`${summary}`, async ({ page }) => {

      await page.route(DashboardPage.ROUTES.SHORTCUTS, async (route) => {
        await route.fulfill({
          body: JSON.stringify(mock),
        });
      });

      const dashboardPage = await DashboardPage.visit(page);
      const shortcutNames =
        await dashboardPage.widgets.quickLaunch.getShortcutNames();

      expect.soft(shortcutNames.length).toEqual(shortcutsNumber);
      expect(shortcutNames).toEqual(expShortcuts);
    });
  });
});
