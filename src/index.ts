/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import {chromium} from "playwright";


async function data() {
  const browser = await chromium.launch({headless: false});
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 OPR/87.0.4390.58");
  await page.goto("https://nhentai.net/");

  await page.waitForTimeout(5000);
}

data();
