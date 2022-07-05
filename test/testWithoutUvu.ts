import {Client} from "../src/index";

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

// Start
// const client = new Client(Puppeteer);

// Close
// client.close()

// all inside async

(async ()=>{
  const client = new Client(puppeteer);
  await client.start();
  await client.random();
  await client.getBook("177013");
  await client.getPopularNow();
  //   await client.getRelated("177013");
  client.close();
})();

