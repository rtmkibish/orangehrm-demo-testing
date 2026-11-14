import { NavigationSection } from "../sections/Navigation.section";
import { TopBarNavigation } from "../sections/TopBarNavigation.section";
import type { Page, Locator } from "@playwright/test";
import type {
  WebPageInterface,
  WebPageStaticInterface,
} from "../interfaces/WebPageInterfaces";

export class AdminUserManagement implements WebPageInterface {
  readonly page: Page;
  readonly navigation: NavigationSection;
  readonly pageHeader: Locator;
  #topBarNavigation?: TopBarNavigation;

  static readonly PAGE_PATH = "/web/index.php/admin/viewSystemUsers";

  static async visit(page: Page) {
    await page.goto(AdminUserManagement.PAGE_PATH);
    await page.waitForLoadState("domcontentloaded");
    return new AdminUserManagement(page);
  }

  static getPage(page: Page) {
    return new AdminUserManagement(page);
  }

  private constructor(page: Page) {
    this.page = page;
    this.navigation = new NavigationSection(page);
    this.pageHeader = this.page.getByRole("heading", { name: "Admin" });
  }

  get topBarNavigation() {
    if (!this.#topBarNavigation) {
      this.#topBarNavigation = new TopBarNavigation(this.page);
    }
    return this.#topBarNavigation;
  }
}

AdminUserManagement satisfies WebPageStaticInterface<AdminUserManagement>;
