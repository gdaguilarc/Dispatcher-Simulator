const Process = require('./Process');

class Dispatcher {
  constructor() {
    this.micros = [];
    this.data = [];
  }
  solve(n, data) {
    this.initMicros(n);
    this.compute(data);
  }
  initMicros(n) {
    for (let i = 0; i < n; i++) {
      this.micros[i].push({ total: 0, tasks: [] });
    }
  }

  // TODO: Compute method
  compute(data) {
    this.dataParsing(data);
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
