const Dispatcher = require('./dispatcher');
const Arguments = require('./arguments');
const data = require('./data');
const chalk = require('chalk');

let dispatcher = new Dispatcher();
dispatcher.solve(data, Arguments);

console.log(chalk.bgRed.white.bold('Dispatcher: \n'), dispatcher);
console.log(chalk.bgRed.white.bold('First process: \n'), dispatcher.data[0]);
