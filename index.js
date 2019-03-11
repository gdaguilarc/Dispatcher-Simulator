const Dispatcher = require('./dispatcher');
const data = require('./data');
const chalk = require('chalk');

let dispatcher = new Dispatcher();
dispatcher.dataParsing(data);

console.log(chalk.bgRed.white.bold('Dispatcher: \n'), dispatcher);
console.log(chalk.bgRed.white.bold('First process: \n'), dispatcher.data[0]);
