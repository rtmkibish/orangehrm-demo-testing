import AbsWidget from "./AbsWidget";
import type { Page } from "@playwright/test";

export class QuickLaunch extends AbsWidget {
  private readonly shortcutSelector = ".orangehrm-quick-launch-card";

  constructor(page: Page) {
    super(page, "Quick Launch");
  }

  async getShortcutNames(): Promise<Array<string | null>> {
    const noShortcutsMessage = "Not Available";
    const shortcutNames = [];
    const shortcutLocators = this.widget
      .locator(this.shortcutSelector)
      .or(this.page.getByText(noShortcutsMessage, { exact: true }));

    await shortcutLocators.first().waitFor({ state: "visible" });

    for (const locator of await shortcutLocators.all()) {
      const shortcutName = await locator.textContent();
      if (shortcutName === noShortcutsMessage) break;
      shortcutNames.push(shortcutName);
    }
    return shortcutNames;
  }
}
