import { test as baseTest, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.page";

interface LoginPageFixture {
  loginPage: LoginPage;
}

const test = baseTest.extend<LoginPageFixture>({
  loginPage: async ({ page }, use) => {
    const loginPage = await LoginPage.visit(page);
    use(loginPage);
  },
});

export { test, expect };
