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
  }
  initMicros(n) {
    for (let i = 0; i < n; i++) {
      let temp = new Micro(i, 0);
      this.micros.push(temp);
    }
  }

  getArguments(argument) {
    this.argument = argument;
  }

  compute(data) {
    // Write the data array
    this.dataParsing(data);

    let waited = false;

    this.data.forEach(elem => {
      // Get the micro with the less total
      this.micros.sort((a, b) => {
        return a.total - b.total;
      });

      let firstMicro = this.micros.find(elem => {
        return (elem.name = 1);
      });

      let realtcc = this.argument.tcc;
      if (elem.readyTime <= this.micros[0].total) {
        if (
          (waited || this.micros[0].total == 0) &&
          this.micros[0].total === elem.readyTime
        ) {
          realtcc = 0;
          waited = false;
        }

        this.micros[0].total += this.operation(
          this.micros[0].total,
          realtcc,
          this.argument.tb,
          this.argument.quantum,
          elem
        );
      } else {
        waited = true;
        this.micros.forEach(micro => {
          if (micro.total < elem.readyTime) {
            micro.total = elem.readyTime;
          }
        });

        firstMicro.total += this.operation(
          firstMicro.total,
          0,
          this.argument.tb,
          this.argument.quantum,
          elem
        );
      }

      elem.completed = true;
    });
  }

  operation(total, argstcc, argsTb, argsQantum, execProcess) {
    // Check if process is ready
    if (execProcess.readyTime > total) {
      total = execProcess.readyTime;
    }

    // Get values
    let tcc = argstcc;

    let tvc =
      execProcess.te >= argsQantum
        ? Math.ceil(execProcess.te / argsQantum) * argstcc - argstcc
        : 0;

    let timeBlocked = execProcess.blockageTimes * argsTb;

    // Assign Values
    execProcess.tcc = tcc;
    execProcess.tvc = tvc;
    execProcess.tb = timeBlocked;
    execProcess.ti = total;

    return tcc + tvc + execProcess.te + timeBlocked;
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