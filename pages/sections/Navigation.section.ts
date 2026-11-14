import type { Locator, Page } from "@playwright/test";
import type {
  WebPageInterface,
  WebPageStaticInterface,
} from "../interfaces/WebPageInterfaces";
import { AdminUserManagement } from "../admin/AdminUserManagement.page";
import { DashboardPage } from "../DashboardPage.page";

type PageCreateConfig<T> = {
  locator: Locator;
  cls: WebPageStaticInterface<T>;
};
type PagesTypes = {
  adminPage: AdminUserManagement;
  dashboardPage: DashboardPage;
};

type PagesMap = {
  [K in keyof PagesTypes]: PageCreateConfig<PagesTypes[K]>;
};

export class NavigationSection {
  private readonly page: Page;
  private readonly navPanel: Locator;
  private searchInput: Locator;
  private collapseNavigationButton: Locator;
  private expandNavigationButton: Locator;
  readonly adminLink: Locator;
  readonly pimLink: Locator;
  readonly leaveLink: Locator;
  readonly timeLink: Locator;
  readonly recruitmentLink: Locator;
  readonly myInfoLink: Locator;
  readonly performanceLink: Locator;
  readonly dashboardLink: Locator;
  readonly directoryLink: Locator;
  readonly maintenanceLink: Locator;
  readonly claimLink: Locator;
  readonly buzzLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navPanel = this.page.getByLabel("Sidepanel", { exact: true });
    this.searchInput = this.navPanel.locator("input[placeholder='Search']");
    this.collapseNavigationButton = this.navPanel.locator(
      "aside button:has(i.bi-chevron-left)",
    );
    this.expandNavigationButton = this.navPanel.locator(
      "aside button:has(i.bi-chevron-right)",
    );
    this.adminLink = this.navPanel.getByRole("link", { name: "Admin" });
    this.pimLink = this.navPanel.getByRole("link", { name: "PIM" });
    this.leaveLink = this.navPanel.getByRole("link", { name: "Leave" });
    this.timeLink = this.navPanel.getByRole("link", { name: "Time" });
    this.recruitmentLink = this.navPanel.getByRole("link", {
      name: "Recruitment",
    });
    this.myInfoLink = this.navPanel.getByRole("link", { name: "My Info" });
    this.performanceLink = this.navPanel.getByRole("link", {
      name: "Performance",
    });
    this.dashboardLink = this.navPanel.getByRole("link", { name: "Dashboard" });
    this.directoryLink = this.navPanel.getByRole("link", { name: "Directory" });
    this.maintenanceLink = this.navPanel.getByRole("link", {
      name: "Maintenance",
    });
    this.claimLink = this.navPanel.getByRole("link", { name: "Claim" });
    this.buzzLink = this.navPanel.getByRole("link", { name: "Buzz" });
  }

  async goto<K extends keyof PagesTypes>(pageName: K): Promise<PagesTypes[K]> {
    const pagesMap: PagesMap = {
      adminPage: {
        locator: this.adminLink,
        cls: AdminUserManagement,
      },
      dashboardPage: {
        locator: this.dashboardLink,
        cls: DashboardPage,
      },
    };
    await pagesMap[pageName].locator.click();
    await this.page.waitForLoadState("domcontentloaded");
    return pagesMap[pageName].cls.getPage(this.page);
  }
}
