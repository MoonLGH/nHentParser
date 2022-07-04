import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import * as assert from "uvu/assert";
import {test} from "uvu";

import {random, getBook} from "../src";

test("Test Random", async () => {
  const browser = await puppeteer.launch({headless: true});
  try {
    await random(browser);
    console.log("Sucess Random");
  } catch (err) {
    assert.instance(err, Error);
    throw new Error("Duh!");
  }
  browser.close();
});

test("Test 177013", async () => {
  const browser = await puppeteer.launch({headless: true});
  try {
    await getBook(browser, "177013");
    console.log("Sucess 177013");
  } catch (err) {
    assert.instance(err, Error);
    throw new Error("Duh!");
  }
  browser.close();
});

test("Test Errors", async () => {
  const browser = await puppeteer.launch({headless: true});
  try {
    await getBook(browser, "something not exist");
    throw new Error("Duh!");
  } catch (err) {
    assert.instance(err, Error);
    console.log("Sucess Failed");
  }
  browser.close();
});

test.run();
