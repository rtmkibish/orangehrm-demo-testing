import type { Locator, Page } from "@playwright/test";
import type { WebPageStaticInterface } from "../interfaces/WebPageInterfaces";
import type { AbsModuleWebPage } from "../AbsModuleWebPage";

export class TopBarNavigation {
  readonly page: Page;
  readonly activeTab: Locator;
  private readonly tobBarTabs: Locator;

  constructor(page: Page) {
    this.page = page;
    this.activeTab = this.page.locator(
      ".oxd-topbar-body-nav-tab.--visited",
    );
    this.tobBarTabs = this.page.locator("li.oxd-topbar-body-nav-tab");
  }

  async clickDropdownTab(tabName: string | RegExp) {
      await this.tobBarTabs.filter({ hasText: tabName }).click();
  }

  async clickStaticTab<C extends AbsModuleWebPage>(tabName: string | RegExp, pageObject: WebPageStaticInterface<C>) {
    await this.tobBarTabs.filter({hasText: tabName}).click();
    await this.page.waitForLoadState("domcontentloaded");
    return pageObject.getPage(this.page);
  }

  async selectOption<C extends AbsModuleWebPage>(optionName: string | RegExp, pageObject: WebPageStaticInterface<C>) {
      const optionItem = this.page.getByRole("menuitem", { name: optionName });
      await optionItem.waitFor({state: "visible"});
      await optionItem.click();
      await this.page.waitForLoadState("domcontentloaded");
      return pageObject.getPage(this.page);
  }
}
