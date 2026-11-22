import type { Locator, Page } from "@playwright/test";
import { NavigationSection } from "./sections/Navigation.section";

export abstract class AbsWebPage {
  readonly page: Page;
  readonly navigation: NavigationSection;
  readonly moduleHeader: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.navigation = new NavigationSection(this.page);
    this.moduleHeader = this.page.locator(".oxd-topbar-header-breadcrumb-module");
  }
}
