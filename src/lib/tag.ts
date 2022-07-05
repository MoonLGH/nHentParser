import {Browser} from "puppeteer";
import {stringify} from "qs";
import {baseUrl, endpoint} from "../utils/constants";
import {getList} from "../utils/getList";
import {getSort} from "../utils/getSort";

export async function tag(browser:Browser, keyword:string, page = 1, popular = false) {
  const sort = getSort(popular);
  const query = stringify({
    page,
  });
  const url = `${baseUrl+endpoint.tag}/${modifyKeyword(keyword)}/${sort}?${query}`;

  return getList(browser, url);
}

function modifyKeyword(keyword:string) {
  return keyword.replace(/ /g, "-").toLowerCase();
}
