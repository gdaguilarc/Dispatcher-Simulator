const Process = require('./Process');
const Micro = require('./Micro');

class Dispatcher {
  constructor() {
    this.micros = [];
    this.data = [];
    this.argument = {};
  }
  solve(data, argument) {
    this.getArguments(argument);
    this.initMicros(this.argument.micros);
    this.compute(data);
    this.getTotals(this.data);
  }
  getTotals(data) {
    data.forEach(elem => {
      elem.tt = elem.tcc + elem.tvc + elem.tb + elem.ti + elem.te;
    });
  }
  initMicros(n) {
    for (let i = 0; i < n; i++) {
      let temp = new Micro(i, 0, false);
      this.micros.push(temp);
    }
  }

  getArguments(argument) {
    this.argument = argument;
  }

  compute(data) {
    // Write the data array
    this.dataParsing(data);

    this.data.forEach(elem => {
      this.micros.sort((a, b) =>
        a.total > b.total
          ? 1
          : a.total === b.total
          ? a.name > b.name
            ? 1
            : -1
          : -1
      );

      let realtcc = this.argument.tcc;
      let i = 0;
      if (
        this.micros[i].total === 0 &&
        this.micros[i].total >= elem.readyTime
      ) {
        realtcc = 0;
      } else if (this.micros[i].total < elem.readyTime) {
        i = this.micros.length;

        this.micros.sort((a, b) =>
          a.name > b.name
            ? 1
            : a.name === b.name
            ? a.total > b.total
              ? 1
              : -1
            : -1
        );

        this.micros.forEach(micro => {
          if (micro.total < elem.readyTime && micro.name < i) {
            i = micro.name;
          }
        });

        this.micros[i].total = elem.readyTime;
        this.micros[i].waited = true;
      }

      if (this.micros[i].waited === true) {
        elem.wait = true;
        this.micros[i].waited = false;
        realtcc = 0;
      }

      elem.micro = this.micros[i].name;
      this.micros[i].total += this.operation(
        this.micros[i].total,
        realtcc,
        this.argument.tcc,
        this.argument.tb,
        this.argument.quantum,
        elem
      );
    });
  }

  operation(total, realtcc, argstcc, argsTb, argsQantum, execProcess) {
    //create variables
    let tcc = realtcc;
    let tvc =
      execProcess.te >= argsQantum
        ? Math.ceil(execProcess.te / argsQantum) * argstcc - argstcc
        : 0;
    let tb = execProcess.blockageTimes * argsTb;
    let ti = total;
    let te = execProcess.te;
    let tt = tcc + te + tvc + tb;

    //set variables
    execProcess.tcc = tcc;
    execProcess.tvc = tvc;
    execProcess.tb = tb;
    execProcess.ti = ti;
    execProcess.tt = tt;
    return tt;
  }

  dataParsing(data) {
    data.sort((a, b) => {
      return parseInt(a.herarchy) - parseInt(b.herarchy);
    });

    for (let i = 0; i < data.length; i++) {
      let temp = new Process(
        data[i].herarchy,
        data[i].name,
        data[i].te,
        data[i].block,
        data[i].ready_time
      );
      this.data.push(temp);
    }
  }
}

module.exports = Dispatcher;
