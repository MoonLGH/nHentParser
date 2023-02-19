import {Page} from "puppeteer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function bypass(page:Page, url:string): Promise<{page: Page, newResponse: any, responseBody:string, responseData:Buffer}> {
  console.log(url);
  try {
    let newResponse;
    await page.evaluateOnNewDocument(preload, device);
    page.setDefaultNavigationTimeout(0);
    let response = await page.goto(url, {timeout: 0, waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"]});
    await page.waitForSelector("#challenge-stage", {visible: true});
    const pageData = await page.evaluate(() => {
      return {
        html: document.documentElement.innerHTML,
      };
    });
    let responseBody = await response!.text();
    let responseData = await response!.buffer();
    let tryCount = 0;
    if (pageData.html.includes("hcaptcha")) {
      return await bypass(page, url);
    }
    while ((pageData.html.includes("cf-") || pageData.html.includes("Ray ID: ") || pageData.html.includes("Checking your browser") || pageData.html.includes("DDoS protection")) || pageData.html.includes("hcaptcha") && tryCount <= 10) {
      const buttonElement = await page.waitForXPath("/html/body/div[1]/div/div[1]/div/input").catch(() => null);
      let buttonElements = false;
      if (buttonElement) {
        page.click("#challenge-stage > div > input");
        await page.waitForSelector("body > pre");
        const element = await page.$("body > pre");

        responseBody = (await page.evaluate((el) => el!.textContent, element) as string);
        responseData = await response!.buffer();
        buttonElements = true;
        return {page, newResponse, responseBody, responseData};
      }
      if (buttonElements === false) {
        newResponse = await page.waitForNavigation({timeout: 30000, waitUntil: "domcontentloaded"});
        if (newResponse) response = newResponse;
        responseBody = await response!.text();
        responseData = await response!.buffer();
      }
      tryCount++;
    }
    return {page, newResponse, responseBody, responseData};
  } catch (error) {
    console.log(error);
    throw Error("Error");
  }
}

function preload(device: {
  platform: string;
  userAgent: string;
  viewport: {
    height: number;
    width: number;
    deviceScaleFactor: number;
  };
}) {
  Object.defineProperty(navigator, "platform", {
    value: device.platform,
    writable: true,
  });
  Object.defineProperty(navigator, "userAgent", {
    value: device.userAgent,
    writable: true,
  });
  Object.defineProperty(screen, "height", {
    value: device.viewport.height,
    writable: true,
  });
  Object.defineProperty(screen, "width", {
    value: device.viewport.width,
    writable: true,
  });
  Object.defineProperty(window, "devicePixelRatio", {
    value: device.viewport.deviceScaleFactor,
    writable: true,
  });
}


const device = {
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 OPR/87.0.4390.58",
  viewport: {
    width: 1200,
    height: 800,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    isLandscape: true,
  },
  locale: "en-US,en;q=0.9",
  platform: "Macintosh",
};
