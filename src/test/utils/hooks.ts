import { Before, BeforeAll, After, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Page, Browser, BrowserContext } from '@playwright/test';
import { pageFixture } from './pageFixture';
import { invokeBrowser } from '../../helper/browser';
import { getENV } from '../../helper/env/env';
import { createLogger } from 'winston';
import { options } from './logger';


setDefaultTimeout(60 * 1000);

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll({ timeout: 60 * 1000 }, async function () {
    const headedMode = process.env.HEADED === 'true';
    getENV()
    browser = await invokeBrowser();
    context = await browser.newContext();
    page = await context.newPage();
    pageFixture.page = page;
    // await page.goto('https://dashboard-65742.web.app/auth/login');
});

Before(async function({pickle}){
    let scenarioName = pickle.name + pickle.id;
    context = await browser.newContext()
    page = await context.newPage()
    pageFixture.page = await page;
    pageFixture.logger = createLogger(options(scenarioName))
})


AfterAll(async function () {
    await pageFixture.page?.close();
    await context?.close();
    await browser?.close();
});

After(async function ({ pickle, result }) {
    if (result?.status === Status.FAILED) {
        const images = await pageFixture.page.screenshot({
            path: `./test-result/screenshot/${pickle.name}.png`,
            type: 'png',
        });
        await this.attach(images, 'image/png');
    }
});
