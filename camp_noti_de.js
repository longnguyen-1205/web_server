/**
 * http://usejsdoc.org/
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const assert = require('assert');
module.exports =async function a (id,pas,no){
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
page.setViewport({ width: 1280, height:720 });
await page.goto('https://ksuweb.kyusan-u.ac.jp/portalv2/sp', { waitUntil: 'networkidle2' });
//await page.screenshot({path: 'kenh14.png'});
//await browser.close();
await page.focus('input[name="userID"]');
await page.keyboard.type(id); //xxxxxはユーザ名です
await page.focus('input[name="password"]');
await page.keyboard.type(pas);  //yyyyyはパスワードです
await page.click('a[href="javascript:void(0);"]');
await page.waitForNavigation();
var a= 'a[onclick='+'"'
var b="postMenuSubmitForSp('S04', '/smartphone/smartPhoneCommonContact/initialize');"
var c= a+b+'"]';
const mouse = page.mouse;
await mouse.click(50, 150, {
    "button": "left",
    "clickCount": 1,
    "delay": 0
});
await page.waitForNavigation({
    waitUntil: 'networkidle2'
  });
await page.click(c);
await page.waitForSelector('input[value="1"]');
await page.click('input[value="1"]');
await page.click('span[class="icon"]');
for (var i = 1; i <= no/5; i++) {
  await page.waitForSelector('a[onclick="javascript:nextShow();"]');
  await page.click('a[onclick="javascript:nextShow();"]');
}
await page.waitForSelector('div[onclick="return showCommonContactDetail('+no+');"]');
await page.click('div[onclick="return showCommonContactDetail('+no+');"]');
await page.waitForSelector('h3.ttl');
//await page.click('a[href="javascript:void(0);"]');
var jikanwari = await page.evaluate(() => {
    var data1 = document.querySelectorAll('h3.ttl');
    var data2 = document.querySelectorAll('div.rich_area');
    var data3 = document.querySelector('div.h3_box_inner');
    var data4=data3.querySelectorAll('p');
    var data =[];
    for(var i=0;i<data1.length;i+=1){
    	data.push({

    	title:data1[i].innerText,
    	naiyo:data3.innerText,
    	});
    }
    return data;
});
await browser.close();
return jikanwari;


};
