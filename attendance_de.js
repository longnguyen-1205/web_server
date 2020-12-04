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
await page.goto('https://ksuweb.kyusan-u.ac.jp/portalv2/sp', { waitUntil: 'networkidle2' })
await page.focus('input[name="userID"]');
await page.keyboard.type(id); //xxxxxはユーザ名です
await page.focus('input[name="password"]');
await page.keyboard.type(pas);  //yyyyyはパスワードです
await page.click('a[href="javascript:void(0);"]');
await page.waitForNavigation({
    waitUntil: 'networkidle2'
  });
const mouse = page.mouse;
await mouse.click(50, 380, {
    "button": "left",
    "clickCount": 1,
    "delay": 0
});
await page.waitForNavigation({
    waitUntil: 'networkidle2'
  });
  for(var i =1;i<=no/5;i++){
    await page.click('a[onclick="javascript:nextShow();"]');
  }
await page.waitForSelector('div[onclick="return showAttendanceInfo('+no+');"]');
await page.click('div[onclick="return showAttendanceInfo('+no+');"]');

await page.waitForSelector('table');
var sukezuru = await page.evaluate(() => {
    var data1 = document.querySelector('table');
    var data =[];

    //date = "Wed Apr 17 00:00:00 JST 2019";
    //Date date = date2[1];
  /*  for(var i=0;i<data1.length;i+=4){

    	data.push({
    	no:data1[i].innerText,
        date:data1[i+1].innerText,
    	attend:data1[i+3].innerText
    	});
    }*/
    data.push({
      naiyo : data1.innerText

    });
    return data;
});
await browser.close();
return sukezuru;




};
