import { test as baseTest, expect } from "@playwright/test";
import { AdminUserManagement } from "../../pages/admin/AdminUserManagement.page";

type AdminPageFixture = {
  adminPage: AdminUserManagement;
};

const test = baseTest.extend<AdminPageFixture>({
  adminPage: async ({ page }, use) => {
    const adminPage = await AdminUserManagement.visit(page);
    await use(adminPage);
  },
});

export { test, expect };
