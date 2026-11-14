import type { Locator, Page } from "@playwright/test";

export class TopBarNavigation {
  readonly page: Page;
  readonly activeSection: Locator;
  private readonly tobBarSections: Locator;
  #promise = Promise.resolve();

  constructor(page: Page) {
    this.page = page;
    this.activeSection = this.page.locator(
      ".oxd-topbar-body-nav-tab.--visited",
    );
    this.tobBarSections = this.page.locator("li.oxd-topbar-body-nav-tab");
  }

  #queue(fn: (val: void) => void | PromiseLike<void>) {
    this.#promise = this.#promise.then(fn);
    return this;
  }

  clickSection(sectionName: string | RegExp) {
    return this.#queue(async () => {
      await this.tobBarSections.filter({ hasText: sectionName }).click();
    });
  }

  selectOption(optionName: string | RegExp) {
    return this.#queue(async () => {
      const optionItem = this.page.getByRole("menuitem", { name: optionName });
      await optionItem.waitFor({state: "visible"});
      await optionItem.click();
    });
  }

  then(
    res?: (val: void) => void | PromiseLike<void>,
    rej?: (r: any) => PromiseLike<never>,
  ) {
    return this.#promise.then(res, rej);
  }
}
