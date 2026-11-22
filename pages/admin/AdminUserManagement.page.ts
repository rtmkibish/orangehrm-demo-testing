import { AbsModuleWebPage } from "../AbsModuleWebPage";
import type { Page } from "@playwright/test";
import type {
  WebPageStaticInterface,
} from "../interfaces/WebPageInterfaces";

export class AdminUserManagement extends AbsModuleWebPage {

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
    super(page)
  }
}

AdminUserManagement satisfies WebPageStaticInterface<AdminUserManagement>;
