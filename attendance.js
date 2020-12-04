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
  })
  await page.focus('input[name="userID"]');
  await page.keyboard.type(id); //xxxxxはユーザ名です
  await page.focus('input[name="password"]');
  await page.keyboard.type(pas); //yyyyyはパスワードです
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
  var no = await page.evaluate(() => {
    var data3 = document.querySelector('div[align="right"]');
    return data3.innerText.slice(6,7)
    });
    for(var i =1;i<=no/5;i++){
      await page.click('a[onclick="javascript:nextShow();"]');
    }
  await page.waitForSelector('div[onclick="return showAttendanceInfo('+(no-1)+');"]');
  var ichiran = await page.evaluate(() => {
    var data1 = document.querySelectorAll('div.h3_box');
    var data2 = document.querySelectorAll('p');
    var data = [];
    for (var i = 0; i < data1.length; i++) {
      var data2 = data1[i].querySelectorAll('p');
      data.push({
        no: i + 1,
        subject: data2[0].innerText,
        time: data2[1].innerText,
      });
    }
    return data;
  });

  return ichiran;


  await browser.close();

};
