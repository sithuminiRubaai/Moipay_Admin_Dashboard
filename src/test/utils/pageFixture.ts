
import { Page } from '@playwright/test';
import { Logger } from 'winston';

let page: Page;
let logger:Logger;


export const pageFixture = {
    //@ts-ignore
    page: undefined as Page,
     // @ts-ignore
    logger: undefined as Logger
}

