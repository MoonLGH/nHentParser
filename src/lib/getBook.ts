import {Browser} from "puppeteer";
import {baseUrl, endpoint} from "../utils/constants";
import {bypass} from "../utils/BypassCF";
import {Book} from "../utils/interfaces";
export async function getBook(browser:Browser, bookID: string|number) {
  const bypassRes = await bypass(await browser.newPage(), `${baseUrl+endpoint.api+endpoint.galleryFull}/${bookID}`);


  const data = JSON.parse(bypassRes.responseBody);
  if (data.error && data.error === "does not exist") {
    throw Error("not found");
  }

  // console.log(innerText)
  return data as Book;
}

