import {Browser} from "puppeteer";
import {baseUrl, endpoint} from "../utils/constants";
import {bypass} from "../utils/BypassCF";

export async function getBook(browser:Browser, bookID: string|number) {
  const bypassRes = await bypass(await browser.newPage(), `${baseUrl+endpoint.api+endpoint.galleryFull}/${bookID}`);

  const innerText = await bypassRes!.page.evaluate(() => {
    return JSON.parse(document.querySelector("body")!.innerText);
  });

  if (innerText.error && innerText.error === "does not exist") {
    throw Error("not found");
  }

  return innerText;
}

