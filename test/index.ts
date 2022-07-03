import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

import {random} from "../src";

(async () =>{
  const browser = await puppeteer.launch({headless: true});
  random(browser).then(console.log);
})();
