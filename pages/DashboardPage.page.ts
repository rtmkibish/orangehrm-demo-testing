import { QuickLaunch } from "./sections/dashboard/QuickLaunch.widget";
import { MyActions } from "./sections/dashboard/MyActions.widget";
import { AbsWebPage } from "./AbsWebPage";
import type { Page } from "@playwright/test";
import type { WebPageStaticInterface } from "./interfaces/WebPageInterfaces";
import type AbsWidget from "./sections/dashboard/AbsWidget";

type WidgetsOf<T extends Record<string, AbsWidget>> = Readonly<T>;

type WidgetsMap = WidgetsOf<{
  quickLaunch: QuickLaunch;
  myActions: MyActions;
}>;

type WidgetConstructors = {
  readonly [K in keyof WidgetsMap]: new (page: Page) => WidgetsMap[K];
};

export class DashboardPage extends AbsWebPage {
  readonly widgets: WidgetsMap;

  static readonly PAGE_PATH = "/web/index.php/dashboard/index";
  static readonly ROUTES = {
    SHORTCUTS: "/web/index.php/api/v2/dashboard/shortcuts",
    BUZZ_LATEST_POSTS: "/web/index.php/api/v2/buzz/feed",
    ACTIONS: "/web/index.php/api/v2/dashboard/employees/action-summary",
    TIME_AT_WORK: "/web/index.php/api/v2/dashboard/employees/time-at-work",
    EMPLOYEE_LEAVES_TODAY: "/web/index.php/api/v2/dashboard/employees/leaves",
    SUB_UNIT_EMPLOYEE_DISTRIBUTION:
      "/web/index.php/api/v2/dashboard/employees/subunit",
    LOCATION_EMPLOYEE_DISTRIBUTION:
      "/web/index.php/api/v2/dashboard/employees/locations",
  };

  static async visit(page: Page) {
    await page.goto(DashboardPage.PAGE_PATH);
    await page.waitForLoadState("domcontentloaded");
    return new DashboardPage(page);
  }

  static getPage(page: Page) {
    return new DashboardPage(page);
  }

  private constructor(page: Page) {
    super(page);
    this.widgets = this.getWidgets();
  }

  private getWidgets(): WidgetsMap {
    /**
     * Why proxy instead of just an object with classes?
     * Just wanted to play around with Proxy. Never used them before.
     */
    const page = this.page;
    const widgets: WidgetConstructors = {
      quickLaunch: QuickLaunch,
      myActions: MyActions,
    };

    return new Proxy(widgets, {
      get(obj, prop: keyof WidgetConstructors) {
        return new obj[prop](page);
      },
    }) as unknown as WidgetsMap;
  }
}

DashboardPage satisfies WebPageStaticInterface<DashboardPage>;
