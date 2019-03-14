const express = require('express');
const fileUpload = require('express-fileupload');
let csvToJson = require('convert-csv-to-json');
const Dispatcher = require('./dispatcher');
const path = require('path');
const engine = require('pug');
const morgan = require('morgan');

// initializations
const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// default options
app.use(fileUpload());

app.get('/', (req, res, next) => {
  res.render('index');
});

app.post('/upload', async function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let sampleFile = req.files.sample;

  sampleFile.mv('input.csv', function(err) {
    if (err) return res.status(500).send(err);
  });

  await parser;

  let dispatcher = new Dispatcher();
  console.log(req.body);
  await algorithm(dispatcher, req);

  res.send(dispatcher);
});

var parser = function() {
  const fileInputName = 'input.csv';
  const fileOutputName = 'data.json';

  csvToJson.fieldDelimiter(',').getJsonFromCsv(fileInputName);
  csvToJson.generateJsonFileFromCsv(fileInputName, fileOutputName);
};

var algorithm = function(dispatcher, req, err) {
  if (err) {
    setTimeout(algorithm(dispatcher, req), 1000);
  } else {
    dispatcher.solve(require('../data.json'), {
      tcc: parseInt(req.body.tcc),
      tb: parseInt(req.body.tb),
      micros: parseInt(req.body.micros),
      quantum: parseInt(req.body.quantum)
    });
  }
};

// Starting the server
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
