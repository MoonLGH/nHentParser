import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import * as assert from "uvu/assert";
import {test} from "uvu";

import {Client} from "../src/index";

test("Test Random", async () => {
  const client = new Client(puppeteer);
  await client.start();
  try {
    await client.random();
    console.log("Sucess Random");
  } catch (err) {
    assert.instance(err, Error);
    throw new Error("Duh!");
  }
  client.close();
});

test("Test 177013", async () => {
  const client = new Client(puppeteer);
  await client.start();
  try {
    await client.getBook( "177013");
    console.log("Sucess 177013");
  } catch (err) {
    assert.instance(err, Error);
    throw new Error("Duh!");
  }
  client.close();
});

test("Test 177013 Related", async () => {
  const client = new Client(puppeteer);
  await client.start();
  try {
    await client.getRelated("177013");
    console.log("Sucess 177013 Related");
  } catch (err) {
    assert.instance(err, Error);
    throw new Error("Duh!");
  }
  client.close();
});

test("Test Errors", async () => {
  const client = new Client(puppeteer);
  await client.start();
  try {
    await client.getBook("something not exist");
    throw new Error("Duh!");
  } catch (err) {
    assert.instance(err, Error);
    console.log("Sucess Failed");
  }
  client.close();
});

test.run();
