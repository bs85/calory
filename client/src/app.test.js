/* global describe, test, expect, beforeEach, beforeAll, afterAll */

const puppeteer = require('puppeteer');

const TIMEOUT = 20000;

let browser;
let currentPage;

// eslint-disable-next-line no-restricted-globals
const wait = (ms) => new Promise(
    (resolve) => setTimeout(resolve, ms),
);

beforeAll(
    async (done) => {
        browser = await puppeteer.launch({ headless: false });
        done();
    },
);

afterAll(
    async (done) => {
        await browser.close();
        done();
    },
);

beforeEach(() => {
    currentPage = undefined;
});

async function getPage() {
    if (!currentPage) {
        currentPage = await browser.newPage();
    }

    return currentPage;
}

describe('login page', () => {
    test('navigating to / shows the login page', async () => {
        const page = await getPage();

        await page.goto('http://localhost:3000/');
        await page.waitForSelector('input');

        const html = await page.$eval('body', (e) => e.innerHTML);

        expect(html).toContain('Sign in');
    }, TIMEOUT);

    test('logging in redirects to the dashboard', async () => {
        const page = await getPage();

        await page.goto('http://localhost:3000/');
        await page.waitForSelector('input');

        await page.type('input[name="email"]', 'info@example.com');
        await page.type('input[name="password"]', '12345678');
        await page.click('button[type="submit"]');

        await wait(1000);

        await page.waitForSelector('input');

        const html = await page.$eval('body', (e) => e.innerHTML);

        expect(html).toContain('Dashboard');
    }, TIMEOUT);

    test('adding a meal displays it on the dashboard', async () => {
        const page = await getPage();

        const TIMESTAMP = String(new Date());

        await page.goto('http://localhost:3000/dashboard');
        await page.waitForSelector('input');

        await page.click('#add-meal');

        await page.waitForSelector('input[name="description"]');

        await page.type('input[name="description"]', `Meal ${TIMESTAMP}`);
        await page.type('input[name="totalCalories"]', '1500');
        await page.click('button[type="submit"]');

        await page.waitForSelector('#notification');

        const html = await page.$eval('body', (e) => e.innerHTML);

        expect(html).toContain(TIMESTAMP);
    }, TIMEOUT);
});
