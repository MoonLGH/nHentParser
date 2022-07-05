import {stringify} from "qs";
import {getList} from "../utils/getList";
import {getSort} from "../utils/getSort";
import {baseUrl, endpoint} from "../utils/constants";
import {Browser} from "puppeteer";
export async function character(browser:Browser, keyword:string, page = 1, popular = false) {
  const sort = getSort(popular);
  const query = stringify({
    page,
  });
  const url = `${baseUrl+endpoint.character}/${modifyKeyword(keyword)}/${sort}?${query}`;

  return getList(browser, url);
}

function modifyKeyword(keyword:string) {
  return keyword.replace(/ /g, "-").toLowerCase();
}

