import type { TestDetails } from "@playwright/test";
import { test, expect } from "../../fixtures/ui/login.fixture";

const testSuiteAnnotation: TestDetails = {
  tag: "@smoke",
  annotation: {
    type: "info",
    description: "The test suite uses the 'Login Test' project",
  },
};

test.describe("Login page related tests", testSuiteAnnotation, () => {
  test("Login page loads", {}, async ({ loginPage }) => {
    await expect(loginPage.pageHeader).toBeVisible();
    await expect(loginPage.pageHeader).toHaveText(/^Login$/);
  });

  test("Logged in user has correct cookies", async ({ page, loginPage }) => {
    const loginCredentials: Parameters<typeof loginPage.login>[0] = {
      username: process.env.USER_NAME!,
      password: process.env.PASSWORD!,
    };
    await loginPage.login(loginCredentials);
    const cookies = await page.context().cookies();
    const cookieNames = cookies.map((cookie) => cookie.name);

    expect(cookieNames).toContain("orangehrm");
  });
});
