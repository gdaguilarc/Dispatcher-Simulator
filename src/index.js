const Dispatcher = require('./dispatcher');
const Arguments = require('./arguments');
const data = require('../data/data.json');
const chalk = require('chalk');

let dispatcher = new Dispatcher();
dispatcher.solve(data, Arguments);

console.log(
  chalk.bgGreen.black('Proceso' + '\t'),
  chalk.bgBlue.black('TCC' + '\t'),
  chalk.bgYellow.black('TE' + '\t'),
  chalk.bgMagenta.black('TVC' + '\t'),
  chalk.bgCyan.black('TB' + '\t'),
  chalk.bgWhite.black('TT' + '\t'),
  chalk.bgHex('#ffaa00').black('TI' + '\t'),
  chalk.bgHex('#ff00a1').white('TF' + '\t')
);

dispatcher.data.forEach(elem => {
  console.log(
    chalk.bgGreen.black(elem.name + '\t'),
    chalk.bgBlue.black(elem.tcc + '\t'),
    chalk.bgYellow.black(elem.te + '\t'),
    chalk.bgMagenta.black(elem.tvc + '\t'),
    chalk.bgCyan.black(elem.tb + '\t'),
    chalk.bgWhite.black(elem.tcc + elem.tvc + elem.te + elem.tb + '\t'),
    chalk.bgHex('#ffaa00').black(elem.ti + '\t'),
    chalk
      .bgHex('#ff00a1')
      .white(elem.ti + elem.tcc + elem.tvc + elem.te + elem.tb + '\t')
  );
});
