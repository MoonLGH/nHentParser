import {Browser} from "puppeteer";
import {baseUrl, endpoint} from "../utils/constants";
import {stringify} from "qs";
import {getSort} from "../utils/getSort";
import {getList} from "../utils/getList";
export async function search(browser:Browser, keyword:string, page = 1, popular = false) {
  const sort = getSort(popular);
  const query = stringify({
    q: keyword,
    page,
  });
  const url = `${baseUrl+endpoint.search}/?${query}${sort ? `&sort=${sort}` : ""}`;

  return (await getList(browser, url));
}
