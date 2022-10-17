import * as fs from 'fs';
import puppeteer from "puppeteer";

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}  

(async () => {

    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();

    await page.setViewport({width: 1440,height: 900});
    await page.goto('http://localhost:3000/resume.html');
    await page.content();
    await delay(999)

    if (!fs.existsSync('./dist')) 
        fs.mkdirSync('./dist');

    await page.pdf({
        path: './dist/resume.pdf',
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: false,
        margin: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        },
    })

    console.log('generate success!');
    await browser.close();
    
})();
