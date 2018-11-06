const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const methodOverride = require('method-override');
const request = require('request');
const schedule = require('node-schedule');
const puppeteer = require('puppeteer');
const Board = require('./models/board');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();

mongoose.connect(
  'mongodb://admin:asdasd12@ds151753.mlab.com:51753/crwal',
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', callbak => {
  console.log('db connection success');
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.listen(process.env.PORT || 7001);

app.get('/', (req, res) => {
  res.render('index.html', {
    title: 'MAD',
    arr: [1, 2, 3, 4, 5, 6, 7]
  });
  console.log(res);
});

// request({uri:'http://issuein.org', encoding:'binary'},								// URI - 통합자원주소
// 		function( err, res, body ){
// 			var strContents = new Buffer(body, 'binary');
// 			console.log(strContents.toString());
// });

const rule = new schedule.RecurrenceRule();
const date = new Date();
rule.minute = 1;

app.get('/list', (req, res) => {
  Board.find({}, 'tit cont author createdAt', (err, boards) => {
    if (err) console.log(err);
    res.render('list', { boards, today:getDate(date)  });
  });
});

app.get('/view/:id', (req, res) => {
  Board.findOne(
    {
      _id: req.params.id
    },
    'tit author cont reply',
    (err, board) => {
      if (err) {
        console.log(err);
      }
      res.render('view', { board, id: req.params.id });
    }
  );
});

app.post('/view/:id', (req, res) => {
  const replyCont = {
    name: req.body.name,
    password: req.body.password,
    content: req.body.content
  };
  console.log(replyCont);
  Board.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $push: {
        reply: replyCont
      }
    },
    success => {
      console.log('success');
    }
  );
});

schedule.scheduleJob('*/1 * * * *', () => {
  console.log(date);

  crwal();
});

const crwal = async () => {
  const screenshot = 'test2.png';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.tracing.start({
  //   path: 'trace.json',
  //   categories: ['devtools.timeline']
  // });

  let tempArr = [];
  let tempObj = {};
  await page.goto('https://media.daum.net/economic');
  await page.waitForSelector('ul.list_issue a.link_txt');
  const stories = await page.$$eval('a.link_txt', anchors => {
    return anchors.map(anchor => anchor.href).slice(0, 10);
  });

  for (let storyLink of stories) {
    await page.goto(storyLink);
    const tit = await page.$eval('.tit_view', element => {
      return element.innerHTML;
    });

    const cont = await page.$eval('.news_view', element => {
      return element.innerHTML;
    });
    tempObj.tit = tit;
    tempObj.cont = cont;
    tempArr.push(tempObj);

    Board.find({ tit: tit }, (err, board, result) => {
      const new_contents = new Board({ tit, cont });
      new_contents.save(err => {
        err ? console.log(err) : console.log('success');
      });
    });
  }

  await browser.close();
};



function getDate (dateObj){
  if (dateObj instanceof Date)
    return (
      dateObj.getFullYear() +
      '-' +
      get2digits(dateObj.getMonth() + 1) +
      '-' +
      get2digits(dateObj.getDate())
    );
};

function get2digits(num){
  return ("0" + num).slice(-2);
}