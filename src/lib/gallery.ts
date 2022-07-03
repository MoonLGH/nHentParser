import {baseUrl, endpoint} from "../utils/constants";
import {Browser} from "puppeteer";
import {getBook} from "./getBook";

export async function g(browser:Browser, query : number|string) {
  if (typeof query == "number") query = query.toString();
  const id = query.includes(baseUrl) ?
      query.slice(`${baseUrl+endpoint.random}`.length).replace(/\//g, "") :
      query;
  return getBook(browser, id);
}
