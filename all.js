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
  var name = await page.evaluate(() => {
    var data1 = document.querySelector('div.border_box_inner');
    var data = [];
    return {
      student_id: data1.innerText.slice(0, 7),
      name: data1.innerText.slice(7)

    }
  });

  const mouse = page.mouse;
  await mouse.click(50, 280, {
    "button": "left",
    "clickCount": 1,
    "delay": 0
  });
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
        let tmp = data1[i + j + 1].innerText.split("\n");
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
  await page.click('a[onclick="pageback();"]');
  await page.waitForSelector('div[id="footer"]');

  await mouse.click(50, 380, {
    "button": "left",
    "clickCount": 1,
    "delay": 0
  });
  await page.waitForNavigation({
    waitUntil: 'networkidle2'
  });
  var ichiran = await page.evaluate(() => {
    var data1 = document.querySelectorAll('div.h3_box');
    //var data2 = document.querySelectorAll('p');
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
  await page.click('a[onclick="pageback();"]');
  await page.waitForSelector('div[id="footer"]');
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
  await page.click('a[onclick="pageback();"]');
  await page.waitForSelector('div[id="footer"]');
  await mouse.click(50, 150, {
    "button": "left",
    "clickCount": 1,
    "delay": 0
  });

  await page.waitForNavigation({
    waitUntil: 'networkidle2'
  });
  var a = 'a[onclick=' + '"'
  var b = "postMenuSubmitForSp('S04', '/smartphone/smartPhoneCommonContact/initialize');"
  var c = a + b + '"]';
  await page.click(c);
  await page.waitForSelector('input[value="1"]');
  await page.click('input[value="1"]');
  await page.click('span[class="icon"]');
  for (var i = 1; i <= 2; i++) {
    await page.waitForSelector('a[onclick="javascript:nextShow();"]');
    await page.click('a[onclick="javascript:nextShow();"]');

  }
  await page.waitForSelector('div[onclick="return showCommonContactDetail(9);"]');
  var camp = await page.evaluate(() => {
    var data1 = document.querySelectorAll('h3.ttl');
    var data2 = document.querySelectorAll('p');
    var data = [];

    for (var i = 0; i < data1.length; i += 1) {
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
        time: data2[i].innerText
      });
    }
    return data;
  });

  await page.click('a[onclick="pageback();"]');
  await page.waitForSelector('div[id="footer_inner"]');
  var e = 'a[onclick=' + '"'
  var d = "postMenuSubmitForSp('S03', '/smartphone/smartPhoneClassContact/initialize');"
  var f = e + d + '"]';
  await page.click(f);
  await page.waitForSelector('input[value="1"]');
  await page.click('input[value="1"]');
  await page.click('span[class="icon"]');
  for (var i = 1; i <= 2; i++) {
    await page.waitForSelector('a[onclick="javascript:nextShow();"]');
    await page.click('a[onclick="javascript:nextShow();"]');

  }
  await page.waitForSelector('div[onclick="return showClassContactDetail(9);"]');
  var clas = await page.evaluate(() => {
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
  await browser.close();
  return {
      name: name, // 氏名
      timetable: jikanwari, // 時間割
      attendace: ichiran, // 出欠
      schedule: sukezuru, // スケジュール
      camp: camp, // 学内連絡
      clas: clas // 授業連絡
  }
};
