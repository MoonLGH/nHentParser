import {Client} from "../src/index";

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());


(async ()=>{
  const client = new Client(puppeteer);
  await client.start();
  await client.random();
  await client.getBook("177013").then(console.log);
//   await client.getPopularNow();
//   // await client.artist("shindo l");
//   await client.character("sagiri");
//   await client.search("sagiri");
  //   await client.getRelated("177013");
  client.close();
})();
