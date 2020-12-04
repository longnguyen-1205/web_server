/**
 * http://usejsdoc.org/
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const assert = require('assert');
module.exports = async function a(id, pas) {
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
  await page.focus('input[name="userID"]');
  await page.keyboard.type(id); //xxxxxはユーザ名です
  await page.focus('input[name="password"]');
  await page.keyboard.type(pas); //yyyyyはパスワードです
  await page.click('a[href="javascript:void(0);"]');
  await page.waitForNavigation({
    waitUntil: 'networkidle2'
  });

  const mouse = page.mouse;
  await mouse.click(50, 280, {
    "button": "left",
    "clickCount": 1,
    "delay": 0
  });
  //await browser.close();
  await page.waitForNavigation({
    waitUntil: 'networkidle2'
  });
  var jikanwari = await page.evaluate(() => {
    var data1 = document.querySelectorAll('td');
    var data = [];
    for (var i = 0; i < data1.length; i += 15) {
      for (var j = 1; j < 15; j += 2) {
        var teacher = "";
        var room = "";
        let tmp =data1[i + j + 1].innerText.split("\n");
        if (tmp[1]) {
          teacher = tmp[1];
          room = tmp[2];
        }
        data.push({
          date: data1[i].innerText,
          period: 1 + (j - 1) / 2,
          subject: tmp[0],
          teacher: teacher,
          room: room,
        });
      }
    }
    return data;
  });

  //console.dir(jikanwari);
  await browser.close();
  return jikanwari;


};
