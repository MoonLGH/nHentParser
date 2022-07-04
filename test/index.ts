import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

import {random, getBook} from "../src";

(async () =>{
  const browser = await puppeteer.launch({headless: true});
  await random(browser).then(console.log);
  await getBook(browser, "177013").then(console.log);
  // await getBook(browser, "something not exist").then(console.log);
})();
