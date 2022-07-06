import {Browser} from "puppeteer";
import {bypass} from "../utils/BypassCF";
import {baseUrl, endpoint} from "../utils/constants";

export async function getRelated(browser:Browser, bookID:string|number) {
  bookID = `${bookID}`.includes(baseUrl) ?
  `${bookID}`.slice(`${baseUrl+endpoint.gallery}/`.length).replace(/\//g, "") :
  `${bookID}`;
  const bypassRes = await bypass(await browser.newPage(), `${baseUrl+endpoint.api+endpoint.galleryFull}/${bookID}/related`);

  const innerText = await bypassRes!.page.evaluate(() => {
    return JSON.parse(document.querySelector("body")!.innerText);
  });

  if (innerText.error && innerText.error === "does not exist") {
    throw Error("not found");
  }

  return innerText;
}
