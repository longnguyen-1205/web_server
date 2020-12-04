/**
 * http://usejsdoc.org/
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const assert = require('assert');
module.exports = async function a(id, pas,no) {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  page.setViewport({
    width: 1280,
    height: 720
  });
  await page.goto('https://ksuweb.kyusan-u.ac.jp/portalv2/sp', {
    waitUntil: 'networkidle2'
  });
  //await page.screenshot({path: 'kenh14.png'});
  //await browser.close();
  await page.focus('input[name="userID"]');
  await page.keyboard.type(id); //xxxxxはユーザ名です
  await page.focus('input[name="password"]');
  await page.keyboard.type(pas); //yyyyyはパスワードです
  await page.click('a[href="javascript:void(0);"]');
  await page.waitForNavigation({
    waitUntil: 'networkidle2'
  });
  var a = 'a[onclick=' + '"'
  var b = "postMenuSubmitForSp('S03', '/smartphone/smartPhoneClassContact/initialize');"
  var c = a + b + '"]';
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
  
    await page.waitForSelector('div[onclick="return showClassContactDetail(' + no + ');"]');
  var jikanwari = await page.evaluate(() => {
    var data1 = document.querySelectorAll('h3.ttl');
    var data2 = document.querySelectorAll('div.h3_box');

    var data = [];
    for (var i = 0; i < data1.length; i += 1) {
      var data3 = data2[i].querySelectorAll('p');
      var data4 = data1[i].innerText.split("\n");
      var unread = false;
      var important = false;
      if (data4.length >= 3) {
        unread = true;
        important = true;
      } else if (data4[0] == "重要") {
        important = true;
      } else if (data4[0] == "未読") {
        unread = true;
      }

      data.push({
        no: i + 1,
        unread: unread,
        important: important,
        title: data4[data4.length - 1],
        subject: data3[0].innerText,
        period: data3[1].innerText,


      });
    }
    return data;
  });

  return jikanwari;

  await browser.close();
};
