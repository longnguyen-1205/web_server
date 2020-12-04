/**
 * http://usejsdoc.org/
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const assert = require('assert');
module.exports = async function a(id, pas) {
  //const browser = await puppeteer.launch({
    //headless: true
  //});
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
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
  var type = await page.evaluate(() => {
    var data3 = document.querySelectorAll('span[class="icon_arrow"]');
    return data3.length;
    });
    const mouse = page.mouse;
  if(type == 5){



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
}else{
  var ichiran = [];
  ichiran.push({no: "",subject:"",time:""
  });
}

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
      attendance: ichiran, // 出欠
      schedule: sukezuru, // スケジュール
      camp: camp, // 学内連絡
      clas: clas // 授業連絡
  }
};
