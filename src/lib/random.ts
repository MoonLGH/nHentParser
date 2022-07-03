import {Browser} from "puppeteer";
import {baseUrl, endpoint} from "../utils/constants";
import {g} from "./gallery";

export async function random(browser: Browser) {
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 OPR/87.0.4390.58");
  await page.goto(baseUrl+endpoint.random, {waitUntil: "networkidle2"});
  await page.waitForTimeout(5000);
  const url = page.url();
  const result = await g(browser, url);
  await page.close();
  return result;
}
