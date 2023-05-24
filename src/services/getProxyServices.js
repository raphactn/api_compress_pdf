import { Builder, Browser, By } from "selenium-webdriver";

export const getProxyServices = async () => {
  let proxy = null;

  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get(
      "https://vpnoverview.com/privacy/anonymous-browsing/free-proxy-servers/"
    );

    const elemento = await driver.findElement(
      By.css("#post-331324 > div.post__content > div.scrollable.has-scroll")
    );

    await driver.executeScript("arguments[0].scrollIntoView();", elemento);

    await driver.sleep(1000);

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
