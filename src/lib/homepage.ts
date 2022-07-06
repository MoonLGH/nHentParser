import {Browser} from "puppeteer";
import {stringify} from "qs";
import {baseUrl} from "../utils/constants";
import {getList} from "../utils/getList";

export async function homepage(browser:Browser, page = 1) {
  const query = stringify({
    page,
  });

  return (await getList(browser, `${baseUrl}/?${query}`));
}
