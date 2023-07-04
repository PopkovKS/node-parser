const puppeteer = require('puppeteer');

let vendorCode = ['138593051', '94340317','94340606','138590435','138607462', '94339119', '94339244']

for( let i = 0; i < vendorCode.length; i++) {

(async () => {
    let url = `https://www.wildberries.ru/catalog/${vendorCode[i]}/detail.aspx?targetUrl=SP`;
    const browser = await puppeteer.launch({product: 'chrome', headless: false, defaultViewport: null});
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'load', timeout: 0});

    await page.waitForSelector('span.sizes-list__size');


    let arr = await page.evaluate(()=> {

        let id = 'Art:' +(document.querySelector("#productNmId").innerText)
        let text = Array.from(document.querySelectorAll("label.sizes-list__button:not(.disabled) span.sizes-list__size"), el => el.innerText)

        return  [id, ...text]
    })
    console.log(arr)

    await browser.close()
})();
}

/**
 * TODO: По поводу информации об остатках на складе, не нашел инфы...
 */