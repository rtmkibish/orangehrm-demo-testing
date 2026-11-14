import type { Locator, Page } from "@playwright/test";
import { DashboardPage } from "./DashboardPage.page";

export class LoginPage {
  private readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly pageHeader: Locator;

  private static LOGIN_PAGE_PATH = "/web/index.php/auth/login";

  static async visit(page: Page) {
    await page.goto(LoginPage.LOGIN_PAGE_PATH);
    await page.waitForLoadState("domcontentloaded");
    return new LoginPage(page);
  }

  static async getPage(page: Page) {
    return new LoginPage(page);
  }

  private constructor(page: Page) {
    this.page = page;
    this.usernameInput = this.page.locator("input[name='username']");
    this.passwordInput = this.page.locator("input[type='password']");
    this.submitButton = this.page.getByRole("button", { name: "Login" });
    this.pageHeader = this.page.getByRole("heading", { name: "Login" });
  }

  async login({ username, password }: { username: string; password: string }) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    return DashboardPage.getPage(this.page);
  }
}
