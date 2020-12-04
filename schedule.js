/**
 * http://usejsdoc.org/
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const assert = require('assert');
module.exports = async function a(id, pas) {
  const browser = await puppeteer.launch();
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
  await page.waitForNavigation('networkidle2');
  const mouse = page.mouse;
  await mouse.click(50, 200, {
    "button": "left",
    "clickCount": 1,
    "delay": 0
  });
  await page.waitForNavigation('networkidle2');
  var sukezuru = await page.evaluate(() => {
    var data1 = document.querySelectorAll('div.h3_box');
    var data = [];
    for (var i = 0; i < data1.length; i++) {

      data.push({
        date: data1[i].querySelector('h3').innerText,
        event: data1[i].querySelector('div').innerText
      });
    }
    return data;
  });
  await browser.close();
  return sukezuru;
};
