import { Builder, Browser, By, until } from "selenium-webdriver";

export const getProxyServices = async () => {
  let proxy = null;

  let driver = await new Builder().forBrowser(Browser.CHROME).build();
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
          if (
            text.includes("anonymous") &&
            text.includes("yes") &&
            !text.includes(" no ")
          ) {
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
