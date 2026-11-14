import AbsWidget from "./AbsWidget";
import type { Page } from "@playwright/test";

export class MyActions extends AbsWidget {
  constructor(page: Page) {
    super(page, "My Actions");
  }
}
