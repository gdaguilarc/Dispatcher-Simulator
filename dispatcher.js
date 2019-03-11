// Initialization of all the Micros
// TODO: Use args and chalk to communicate with the terminal
// initMicros(2);

// function initMicros(numberOfMicros) {
//   let micros = [numberOfMicros - 1];
//   var i;
//   for (i = 0; i < numberOfMicros; i++) {
//     micros[i] = {
//       total: 0,
//       processes: []
//     };
//   }
// }

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

  compute(data) {}

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
