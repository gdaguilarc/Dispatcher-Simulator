// Importing file System to write the data.json
const fs = require('fs');

// Columns inside our data.csv
const columns = ['herarchy', 'name', 'te', 'block', 'ready_time'];

// Deleting old file if exist
fs.exists('./data/data.json', exist => {
  if (exist) fs.unlinkSync('./data/data.json');
});

// Transformation of the csv to the JSON array
require('csv-to-array')(
  {
    file: './data/input.csv',
    columns: columns
  },
  function(err, array) {
    fs.appendFileSync('./data/data.json', JSON.stringify(array));
  }
);

// Adquiring our data from the new file
const data = require('./data/data.json');

module.exports = data;
