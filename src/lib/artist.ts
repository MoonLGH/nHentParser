import {endpoint, baseUrl} from "../utils/constants";
import {getSort} from "../utils/getSort";
import {stringify} from "qs";
import {getList} from "../utils/getList";
import {Browser} from "puppeteer";
export async function artist(browser:Browser, keyword:string, page = 1, popular = false) {
  const sort = getSort(popular);
  const query = stringify({
    page,
  });
  const url = `${baseUrl+endpoint.artist}/${modifyKeyword(keyword)}/${sort}?${query}`;

  return getList(browser, url);
}

function modifyKeyword(keyword:string) {
  return keyword.replace(/ /g, "-").toLowerCase();
}

