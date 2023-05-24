import { Builder, Browser, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

export const getProxyServices = async () => {
  let proxy = null;

  const options = new chrome.Options();
  options.addArguments("--headless");

  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  try {
    await driver.get("https://www.sslproxies.org/");

    await driver.sleep(1000);

    await driver.wait(until.elementLocated(By.tagName("tr")));

    const list = await driver.findElements(By.tagName("tr"));

    await driver.sleep(1000);

    let listProxy = [];

    for (let i = 0; i < list.length; i++) {
      await list[i]
        .getText()
        .then((text) => {
          if (text.includes("anonymous")) {
            const textSplit = text.split(" ");
            listProxy.push(`${textSplit[0]}:${textSplit[1]}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    proxy = listProxy;

    return proxy;
  } finally {
    await driver.quit();
  }
};
