import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Page, Browser, expect } from '@playwright/test';
import { pageFixture } from '../utils/pageFixture';
import { getLoginUrl } from '../../helper/config';

let browser: Browser;
let page: Page;

Given('provide valid urls', async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    const loginUrl = getLoginUrl();
    await page.goto(loginUrl);
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
