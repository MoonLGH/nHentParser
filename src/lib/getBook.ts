import {Browser} from "puppeteer";
import {baseUrl, endpoint} from "../utils/constants";
export async function getBook(browser:Browser, bookID: string|number) {
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 OPR/87.0.4390.58");
  await page.goto(`${baseUrl+endpoint.api+endpoint.galleryFull}/${bookID}`, {waitUntil: "networkidle2"});
  await page.waitForTimeout(5500);

  const innerText = await page.evaluate(() => {
    console.log(document.querySelector("body"));
    return JSON.parse(document.querySelector("body")!.innerText);
  });

  return innerText;
}

