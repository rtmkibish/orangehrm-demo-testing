import type { Page, Locator } from "@playwright/test";

export default abstract class AbsWidget {
  protected readonly page: Page;
  readonly widget: Locator;
  readonly widgetName: Locator;
  private readonly widgetTitle: string;
  private readonly widgetSelector = ".orangehrm-dashboard-widget";
  private readonly widgetNameSelector = ".orangehrm-dashboard-widget-name";
  
  constructor(page: Page, widgetTitle: string) {
    this.page = page;
    this.widgetTitle = widgetTitle;
    this.widget = this.page.locator(this.widgetSelector, {
      hasText: this.widgetTitle
    });
    this.widgetName = this.widget.locator(this.widgetNameSelector);
  }
}
