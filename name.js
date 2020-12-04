/**
 * http://usejsdoc.org/
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const assert = require('assert');
module.exports =async function a (id,pas) {
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
page.setViewport({ width: 1280, height:720 });
await page.goto('https://ksuweb.kyusan-u.ac.jp/portalv2/sp', { waitUntil: 'networkidle2' });
await page.focus('input[name="userID"]');
await page.keyboard.type(id); //xxxxxはユーザ名です
await page.focus('input[name="password"]');
await page.keyboard.type(pas);  //yyyyyはパスワードです
await page.click('a[href="javascript:void(0);"]');
await page.waitForNavigation({ waitUntil: 'networkidle2' });
var name = await page.evaluate(() => {
    var data1 = document.querySelector('div.border_box_inner');
    var data =[];
    	data.push({
    	student_id:data1.innerText.slice(0,7),
    		name:data1.innerText.slice(7)

    	});
    return data;
});
return name;
//await browser.close();
};
