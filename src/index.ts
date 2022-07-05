import {PuppeteerLaunchOptions, Browser} from "puppeteer";
import {PuppeteerExtra} from "puppeteer-extra";
import {g} from "./lib/gallery";
import {getBook} from "./lib/getBook";
import {getRelated} from "./lib/getRelated";
import {getPopularNow} from "./lib/getPopularNow";
import {random} from "./lib/random";
import {search} from "./lib/search";
import {tag} from "./lib/tag";
import {character} from "./lib/character";
import {artist} from "./lib/artist";
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

  async getPopularNow() {
    this.checkInitialize();
    return getPopularNow(this.pupBrowser!);
  }

  async character(keyword:string, page?:number, popular?:boolean) {
    this.checkInitialize();
    return character(this.pupBrowser!, keyword, page, popular);
  }

  async artist(keyword:string, page?:number, popular?:boolean) {
    this.checkInitialize();
    return artist(this.pupBrowser!, keyword, page, popular);
  }

  async random() {
    this.checkInitialize();
    return random(this.pupBrowser!);
  }

  async g(BookID:string|number) {
    this.checkInitialize();
    return g(this.pupBrowser!, BookID);
  }

  async search(keyword:string, page?:number, popular?:boolean) {
    this.checkInitialize();
    return search(this.pupBrowser!, keyword, page, popular);
  }

  async tag(keyword:string, page?:number, popular?:boolean) {
    this.checkInitialize();
    return tag(this.pupBrowser!, keyword, page, popular);
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
