import { AbsWebPage } from "./AbsWebPage";
import { TopBarNavigation } from "./sections/TopBarNavigation.section";
import type { Locator, Page } from "@playwright/test";

export abstract class AbsModuleWebPage extends AbsWebPage {
  readonly pageHeader: Locator;
  protected _topBarNavigation?: TopBarNavigation;

  constructor(page: Page) {
    super(page);
    this.pageHeader = this.page.locator(".oxd-topbar-header-breadcrumb-level");
  }

  get topBarNavigation() {
    if (!this._topBarNavigation) {
      this._topBarNavigation = new TopBarNavigation(this.page);
    }
    return this._topBarNavigation;
  }
}
