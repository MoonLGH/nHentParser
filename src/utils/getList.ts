import {Browser} from "puppeteer";
import {load} from "cheerio";
import {bypass} from "./BypassCF";
import {parse} from "qs";

export interface Results {
    id: string,
    title: string,
    language: string,
    thumbnail: {
      s: string
      w: number,
      h: number,
    }
}

interface extra {
    [key:string]:number
}

export async function getList(browser:Browser, url:string) {
  const bypassRes = await bypass((await browser.newPage()), url);

  if (bypassRes.responseBody.includes("404")) {
    throw Error("Not found");
  }

  const res = await bypassRes.page.evaluate(() => document.querySelector("*")!.outerHTML);
  const $ = load(res, {
    decodeEntities: false,
  });

  const results:Results[] = [];
  $(".gallery").each((i, e) => {
    const $this = $(e);
    const id = $this
        .find(".cover")
        .attr("href")!
        .match(/(?<=\/g\/).+(?=\/)/);
    const title = $this.find(".caption").html();
    const thumb = $this.find(".cover > img");
    const tags = $this.attr("data-tags")!.split(" ");

    const lang = tags.includes("6346") ?
            "japanese" :
            tags.includes("12227") ?
              "english" :
              tags.includes("29963") ?
                "chinese" :
                undefined;

    results.push({
      id: id![0],
      title: title!,
      language: lang!,
      thumbnail: {
        s:
                thumb.attr("data-src") ||
                thumb.attr("src")!.replace(/^\/\//, "https://"),
        w: parseInt(thumb.attr("width")!),
        h: parseInt(thumb.attr("height")!),
      },
    });
  });

  const paginationUrl = $(
      `.pagination>${
            $(".pagination>.last").length > 0 ? ".last" : ".current"
      }`,
  ).attr("href");
  const extra:extra = {};

  extra.numResults = parseInt($("#content>h1").text().replace("results", "").replace(",", ""));

  // if there is no pagination on page, set num_pages to 1
  if (!paginationUrl) {
    extra.num_pages = 1;
  } else {
    extra.num_pages = parseInt((parse(paginationUrl.slice(paginationUrl.lastIndexOf("?") + 1)).page as string));
  }

  return {
    ...extra,
    results,
  };
}

