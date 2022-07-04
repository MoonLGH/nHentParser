import {Browser} from "puppeteer";
import {baseUrl, endpoint} from "../utils/constants";
import {bypass} from "../utils/BypassCF";

export async function getBook(browser:Browser, bookID: string|number) {
  console.log(bookID);
  const bypassRes = await bypass(await browser.newPage(), `${baseUrl+endpoint.api+endpoint.galleryFull}/${bookID}`);

  if (bypassRes.responseBody.includes("404")) {
    throw Error("not found");
  }

  const innerText = await bypassRes.page.evaluate(() => {
    console.log(document.querySelector("body"));
    return JSON.parse(document.querySelector("body")!.innerText);
  });

  return innerText;
}

