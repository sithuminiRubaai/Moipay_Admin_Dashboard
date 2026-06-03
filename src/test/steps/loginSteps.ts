import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Page, Browser, BrowserContext } from '@playwright/test';
import { pageFixture } from '../utils/pageFixture';
import LoginPage from '../pageObjects/LoginPage';
//let browser: Browser;
//let context: BrowserContext;
//let page: Page;

const loginPage = new LoginPage()

Given('provide valid url', async function () {
    await pageFixture.page.goto('https://moipay-frontend-dev-270840784532.asia-south1.run.app/login');
    await pageFixture.logger.info("Opening Browser "+"https://moipay-frontend-dev-270840784532.asia-south1.run.app/login")
});


When('provide valid username and password', async function () {
    await pageFixture.page.locator('input[name="email"]').fill('gkk28904@gmail.com');
    await pageFixture.page.locator('input[name="password"]').fill('JK@1234a');
});


Then('click on login button', async function () {
    await pageFixture.page.locator('button[type="submit"]').click();
    await pageFixture.page.waitForTimeout(5000);
});

When('provide valid email as {string} and password as {string}', async function (email: string, password: string) {
    await pageFixture.page.locator('input[name="email"]').fill(email);
    await pageFixture.page.locator('input[name="password"]').fill(password);
});

When('verify admin login success', async function () {
    const isDashboard = await pageFixture.page
        .locator('h1', { hasText: 'Dashboard' })
        .isVisible();

    if (isDashboard) {
        await pageFixture.logger.info("Admin login successful");
    } else {
        await pageFixture.logger.error("Admin login failed");
        throw new Error("Admin login failed");
    }
});





