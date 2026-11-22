import { AbsModuleWebPage } from "../AbsModuleWebPage";
import type { Locator, Page } from "@playwright/test";
import type { WebPageStaticInterface } from "../interfaces/WebPageInterfaces";

export class AdminJobTitles extends AbsModuleWebPage {
    readonly contentTitle: Locator;

    static readonly PAGE_PATH = "/web/index.php/admin/viewJobTitleList";

    static async visit(page: Page) {
        await page.goto(AdminJobTitles.PAGE_PATH);
        await page.waitForLoadState("domcontentloaded");
        return new AdminJobTitles(page);
    }

    static getPage(page: Page) {
        return new AdminJobTitles(page);
    }
    private constructor(page: Page) {
        super(page);
        this.contentTitle = this.page.locator(".orangehrm-main-title");
    }
}

AdminJobTitles satisfies WebPageStaticInterface<AdminJobTitles>
