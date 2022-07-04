import {Browser} from "puppeteer";
import {baseUrl, endpoint} from "../utils/constants";
import {g} from "./gallery";
import {bypass} from "../utils/BypassCF";

export async function random(browser: Browser) {
  const bypassRes = await bypass(await browser.newPage(), `${baseUrl+endpoint.random}`);
  const page = bypassRes.page;
  const url = page.url();
  const result = await g(browser, url);
  return result;
}
