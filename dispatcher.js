const Process = require('./Process');

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
  }
  // TODO: Initialize keys as strings
  initMicros(n) {
    for (let i = 0; i < n; i++) {
      // TODO: Convert this into a class
      let object = {
        name: i,
        total: 0,
        tasks: []
      };
      this.micros.push(object);
    }
  }

  getArguments(argument) {
    this.argument = argument;
  }

  // TODO: Compute method
  compute(data) {
    // Write the data array
    this.dataParsing(data);

    data.forEach(elem => {
      // Get the micro with the less total
      this.micros.sort((a, b) => {
        return a.total - b.total;
      });

      if (elem.readyTime <= this.micros[0].total) {
        this.micros[0].total += this.operation(
          this.micros[0].total,
          this.argument.tcc,
          this.argument.tb,
          this.argument.quantum,
          elem
        );
      } else {
        this.micros.forEach(micro => {
          if (micro.total < elem.readyTime) {
            micro.total = elem.readyTime;
          }
        });

        let firstMicro = this.micros.find(elem => {
          return (elem.name = 1);
        });

        firstMicro.total += this.operation(
          firstMicro.total,
          this.argument.tcc,
          this.argument.tb,
          this.argument.quantum,
          elem
        );
      }

      elem.completed = true;
    });
  }

  operation(total, argstcc, argsTb, argsQantum, execProcess) {
    // Get values
    let tcc = total === 0 ? 0 : argstcc;

    let tvc = (execProcess.te / argsQantum) * argstcc - argstcc;

    let tb = execProcess.blockageTimes * argsTb;

    // Assign Values
    execProcess.tcc = tcc;
    execProcess.tvc = tvc;
    execProcess.tb = tb;
    execProcess.ti = total;

    return tcc + tvc + execProcess.te + tb;
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
