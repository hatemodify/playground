const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const methodOverride = require('method-override');



const app = express();


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(bodyParser.json());

app.listen(process.env.PORT || 7000);


app.get('/', (req, res) => {
  res.render('index.html', {
    title: 'MAD',
    arr: [1, 2, 3, 4, 5, 6, 7]
  });
  console.log(res);
});

app.get('/test', (req, res) => {
  res.render('index2.html', {
  });
  console.log(res);
});