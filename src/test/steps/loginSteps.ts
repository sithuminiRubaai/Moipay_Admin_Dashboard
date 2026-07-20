import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Page, Browser, BrowserContext } from '@playwright/test';
import { pageFixture } from '../utils/pageFixture';
import LoginPage from '../pageObjects/LoginPage';
import { getLoginUrl } from '../../helper/config';
//let browser: Browser;
//let context: BrowserContext;
//let page: Page;

const loginPage = new LoginPage()

Given('provide valid url', async function () {
    const loginUrl = getLoginUrl();
    await pageFixture.page.goto(loginUrl);
    await pageFixture.logger.info(`Opening Browser ${loginUrl}`);
});


When('provide valid email and password', async function () {
    await loginPage.enterEmailAndPassword('super_admin@gmail.com', 'Admin@2024!');
});


Then('click on login button', async function () {
    await loginPage.clickSubmit();
    await pageFixture.page.waitForTimeout(5000);
});

When('provide valid email as {string} and password as {string}', async function (email: string, password: string) {
    await loginPage.enterEmailAndPassword(email, password);
});



When('verify admin login success', async function () {
    await loginPage.verifyAdminLoginSuccess();
});

Then('logout from the application', async function () {
    await loginPage.logout();
});

When('provide invalid email and password', async function () {
    await loginPage.enterEmailAndPassword('invalid_user@example.com', 'invalidPass!');
});

Then('verify login error message is displayed', async function () {
    await loginPage.verifyLoginErrorMessageDisplayed();
});





