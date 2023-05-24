import { Builder, Browser, By, until } from "selenium-webdriver";

export const getProxyServices = async () => {
  let proxy = null;

  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get(
      "https://vpnoverview.com/privacy/anonymous-browsing/free-proxy-servers/"
    );

    await driver.sleep(1000);

    await driver.wait(until.elementLocated(By.tagName("tr")));

    const list = await driver.findElements(By.tagName("tr"));

    await driver.sleep(1000);

    let listProxy = [];

    for (let i = 0; i < list.length; i++) {
      await list[i]
        .getText()
        .then((text) => {
          if (text.includes("HTTPS")) {
            const textSlit = text.split(" ");
            listProxy.push(`${textSlit[0]}:${textSlit[1]}`);
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
