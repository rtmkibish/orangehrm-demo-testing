import type { Page, Locator } from "@playwright/test";
import type { NavigationSection } from "../sections/Navigation.section";

export interface WebPageStaticInterface<T> {
  readonly PAGE_PATH: string;
  visit(page: Page): Promise<T>;
  getPage(page: Page): T;
}

export interface WebPageInterface {
  pageHeader: Locator;
  get navigation(): NavigationSection;
}
