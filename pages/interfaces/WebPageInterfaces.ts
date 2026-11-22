import type { Page } from "@playwright/test";

export interface WebPageStaticInterface<T> {
  readonly PAGE_PATH: `/web/index.php/${string}`;
  visit(page: Page): Promise<T>;
  getPage(page: Page): T;
}
