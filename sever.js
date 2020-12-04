const express = require('express');
const puppeteer = require('puppeteer');
const https = require('https');
const fs = require('fs');
var timetable = require('./timetable');
var name = require('./name');
var attendance = require('./attendance');
var schedule = require('./schedule');
var camp_noti = require('./camp_noti');
var class_noti = require('./class_noti');
var attendance_de= require('./attendance_de');
var camp_noti_de = require('./camp_noti_de');
var class_noti_de = require('./class_noti_de');
var all =require('./all');
var all2 =require('./all2');
var all3 =require('./all3');
const assert = require('assert');
const app = express();
var data = ['name', 'timetable', 'schedule'];
var modu = [];

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
//all
app.post('/all', (req, res) => {
  (async () => {
    //スタト時間
    console.time('taskA');
    var id = req.body.id;
    var pas = req.body.pas;
    res.json(await all(id, pas));
    console.timeEnd('taskA');
  })();
});
app.post('/all2', (req, res) => {
  (async () => {
    //スタト時間
    console.time('taskA');
    var id = req.body.id;
    var pas = req.body.pas;
    res.json(await all2(id, pas));
    console.timeEnd('taskA');
  })();
});
app.post('/all3', (req, res) => {
  (async () => {
    //スタト時間
    console.time('taskA');
    var id = req.body.id;
    var pas = req.body.pas;
    res.json(await all3(id, pas));
    console.timeEnd('taskA');
  })();
});
//名前と学籍番号
app.post('/name', (req, res) => {
  (async () => {
    //スタト時間
    console.time('taskA');
    var id = req.body.id;
    var pas = req.body.pas;
    res.json(await name(id, pas));
    console.timeEnd('taskA');
  })();
});
//時間割
app.post('/timetable', (req, res) => {
  (async () => {
    //スタト時間
    console.time('taskA');
    var id = req.body.id;
    var pas = req.body.pas;
    res.json(await timetable(id, pas));
    console.timeEnd('taskA');
  })();
});
//スケジュール
app.post('/schedule', (req, res) => {
  (async () => {
    //スタト時間
    console.time('taskA');
    var id = req.body.id;
    var pas = req.body.pas;
    res.json(await schedule(id, pas));
    console.timeEnd('taskA');
  })();
});
//出欠
app.post('/attendance', (req, res) => {
  (async () => {
    //スタト時間
    console.time('taskA');
    var id = req.body.id;
    var pas = req.body.pas;
    res.json(await attendance(id, pas));
    console.timeEnd('taskA');
  })();
});
//学内連絡
app.post('/camp_noti', (req, res) => {
  (async () => {
    //スタト時間
    console.time('taskA');
    var id = req.body.id;
    var pas = req.body.pas;
    var no = req.body.no;
    res.json(await camp_noti(id, pas,no));
    //エンド時間
    console.timeEnd('taskA');
  })();
});
//授業連絡
app.post('/class_noti', (req, res) => {
  (async () => {
    //スタト時間
    console.time('taskA');
    var id = req.body.id;
    var pas = req.body.pas;
    var no = req.body.no;
    res.json(await class_noti(id, pas,no));
    //エンド時間
    console.timeEnd('taskA');
  })();
});

//出欠詳細
app.post('/attendance_de', (req, res) => {
  (async () => {
    //スタト時間
    console.time('taskA');
    var id = req.body.id;
    var pas = req.body.pas;
    var no = req.body.no;
    res.json(await attendance_de(id, pas,no));
    //エンド時間
    console.timeEnd('taskA');
  })();
});

//学内連絡詳細
app.post('/camp_noti_de', (req, res) => {
  (async () => {
    //スタト時間
    console.time('taskA');
    var id = req.body.id;
    var pas = req.body.pas;
    var no = req.body.no;
    res.json(await camp_noti_de(id, pas,no));
    //エンド時間
    console.timeEnd('taskA');
  })();
});

//授業連絡詳細
app.post('/class_noti_de', (req, res) => {
  (async () => {
    //スタト時間
    console.time('taskA');
    var id = req.body.id;
    var pas = req.body.pas;
    var no = req.body.no;
    res.json(await class_noti_de(id, pas,no));
    //エンド時間
    console.timeEnd('taskA');
  })();
});
/*
for(var i in data){
  modu[i]=require('./'+data[i]);
 app.post('/'+data[i], async function (req, res) {

    var id = req.body.id;
    var pas = req.body.pas;
    res.json(await modu[0](id, pas));


});
};*/
https.createServer({
    key: fs.readFileSync('/home/long/longkslife.nw.is.kyusan-u.ac.jp.key'),
    cert: fs.readFileSync('/home/long/longkslife.nw.is.kyusan-u.ac.jp.cer'),
    ca:fs.readFileSync('/home/long/nii-odca3sha2ct.cer')
}, app).listen(3000, () => console.log('Listening on port 3000'));
