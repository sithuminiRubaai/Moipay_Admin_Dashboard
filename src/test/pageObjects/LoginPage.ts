import { pageFixture } from "../utils/pageFixture";
import { expect } from '@playwright/test';

export default class LoginPage {
    private selectors = {
        email: 'input[id="email"]',
        password: 'input[id="password"]',
        submitButton: 'button[type="submit"]'
    }

    async enterEmail(email: string) {
        await pageFixture.page.locator(this.selectors.email).fill(email);
        pageFixture.logger.info("providing email");
    }

    async enterPassword(password: string) {
        await pageFixture.page.locator(this.selectors.password).fill(password);
        pageFixture.logger.info("providing password");
    }

    async clickSubmit() {
        await pageFixture.page.locator(this.selectors.submitButton).click();
        pageFixture.logger.info("clicking submit button");
    }

    async enterEmailAndPassword(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
    }

   async verifyLoginErrorMessageDisplayed() {
    try {
        await pageFixture.page.waitForLoadState('networkidle');

        const errorLocator = pageFixture.page
            .locator('//div[contains(@class,"border-red-500") and normalize-space()="User not found"]');

        // Assertion 1 - Error div is visible
        await expect(errorLocator)
            .toBeVisible({ timeout: 30000 });

        // Assertion 2 - Contains correct text
        await expect(errorLocator)
            .toContainText('User not found');

        // Assertion 3 - Exact text match
        await expect(errorLocator)
            .toHaveText('User not found');

        await pageFixture.logger.info(`Error message verified: User not found`);

    } catch (error) {
        await pageFixture.page.screenshot({
            path: `reports/screenshots/login-error-${Date.now()}.png`
        });
        pageFixture.logger.error(`Error message not displayed: ${error}`);
        throw new Error(`Expected login error message not displayed: ${error}`);
    }
}

    async verifyAdminLoginSuccess() {
        try {
            await pageFixture.page
                .getByText('MoiPay', { exact: true })
                .waitFor({ state: 'visible', timeout: 10000 });

                pageFixture.logger.info("Admin login successful");
        } catch (error) {
                pageFixture.logger.error("Admin login failed");
            throw new Error("Admin login failed");
        }
    }

    async logout() {
    await pageFixture.page
        .locator("//button[@class='ml-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5']")
        .click();
}
}