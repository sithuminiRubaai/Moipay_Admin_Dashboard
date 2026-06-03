import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Page, Browser, expect } from '@playwright/test';


let browser: Browser;
let page: Page;

Given('provide valid urls', async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('https://dashboard-65742.web.app/auth/login');
});

When('enter email as {string}', async function (email: string) {
    await page.locator('input[name="email"]').fill(email);
});

When('enter password as {string}', async function (password: string) {
    await page.locator('input[name="password"]').fill(password);
});

Then('click on the login button', async function () {
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(2000);
});

Then('verify login success message as {string}', async function (message: string) {



    // const dashboardText = await pageFixture.page.locator('h1').textContent();
    //     if (dashboardText?.trim() === 'Dashboard') {
    //         await pageFixture.logger.info("Admin login successful");
    //     } else {
    //         await pageFixture.logger.error("Admin login failed");
    //         throw new Error("Admin login failed");
    //     }
    // const actualMessage = await page.locator("//h1[contains(text(),'Dashboard')]").textContent()
    // if (actualMessage == message) {
    //     expect(actualMessage?.trim()).toEqual(message);
    //     await page.close()
    //     await browser.close();

    // } else {
    //     const actualMessage = await page.locator("//div[contains(@class, 'MuiAlert-message') and contains(text(), 'Incorrect email or password')]").textContent();
    //     expect(actualMessage?.trim()).toEqual(message);
    //     await page.close()
    //     await browser.close();
    // }


});