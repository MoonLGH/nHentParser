import {baseUrl} from "../utils/constants";
import {bypass} from "../utils/BypassCF";
import {load} from "cheerio";
import {Browser} from "puppeteer";

export interface PopularResult {
    id: string,
    title: string,
    language: string,
    thumbnail: {
      s: string
      w: number,
      h: number,
    }
}
export async function getPopularNow(browser:Browser) {
  const bypassRes = await bypass((await browser.newPage()), baseUrl);

  const res = await bypassRes.page.evaluate(() => document.querySelector("*")!.outerHTML);
  const $ = load(res, {
    decodeEntities: false,
  });

  const results:PopularResult[] = [];
  $(".index-popular .gallery").each((i, e) => {
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

  return {
    results,
  };
}

