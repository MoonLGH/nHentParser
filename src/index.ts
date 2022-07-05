import {PuppeteerLaunchOptions, Browser} from "puppeteer";
import {PuppeteerExtra} from "puppeteer-extra";
import {g} from "./lib/gallery";
import {getBook} from "./lib/getBook";
import {getRelated} from "./lib/getRelated";
import {random} from "./lib/random";

export class Client {
  pup: PuppeteerExtra;
  pupBrowser?: Browser;
  opt: PuppeteerLaunchOptions;
  constructor(pups:PuppeteerExtra, options:PuppeteerLaunchOptions={headless: true}) {
    this.pup = pups;
    this.opt = options;
  }

  async start() {
    this.pupBrowser = await this.pup.launch(this.opt);
  }

  async getBook(BookID:string|number) {
    this.checkInitialize();
    return getBook(this.pupBrowser!, BookID);
  }

  async getRelated(BookID:string|number) {
    this.checkInitialize();
    return getRelated(this.pupBrowser!, BookID);
  }

  async random() {
    this.checkInitialize();
    return random(this.pupBrowser!);
  }

  async g(BookID:string|number) {
    this.checkInitialize();
    return g(this.pupBrowser!, BookID);
  }

  async close() {
    this.checkInitialize();
    return (await this.pupBrowser?.close());
  }

  private checkInitialize() {
    if (this.pupBrowser) {
      return true;
    }
    throw Error("Client is not initialized");
  }
}
