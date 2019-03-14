const express = require('express');
const fileUpload = require('express-fileupload');
let csvToJson = require('convert-csv-to-json');
const Dispatcher = require('./dispatcher');
const path = require('path');
const engine = require('pug');
const morgan = require('morgan');

const csvFilePath = path.join(__dirname, 'temp', 'input.csv');
const csv = require('csvtojson');
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

  await sampleFile.mv(csvFilePath, function(err) {
    if (err) {
      console.log(err);
    }
  });
  let dispatcher = new Dispatcher();
  console.log(path.join(__dirname, 'input.csv'));

  const jsonArray = await csv().fromFile(csvFilePath);

  dispatcher.solve(jsonArray, {
    tcc: parseInt(req.body.tcc),
    tb: parseInt(req.body.tb),
    micros: parseInt(req.body.micros),
    quantum: parseInt(req.body.quantum)
  });

  let values = dispatcher.data;
  let result = [];

  for (let i = 0; i < req.body.micros; i++) {
    let temp = values.filter(elem => {
      return elem.micro == i;
    });
    temp.sort((a, b) => {
      return a.ti - b.ti;
    });
    result = result.concat(temp);
  }

  res.render('simulation', {
    tasks: result
  });
});

// Starting the server
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
