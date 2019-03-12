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
    //dataparsing
    //buscar micro con menor tiempo --> menor ID
    //checar tiempo de entrada del proceso =< total del micro que se escogió
      //sino es =< 
        //filter micro con tiempo < tiempo de entrada 
         //volver total de esos micros al T entrada 
         //total de ese micro - 1TC   *
      //si si es y continuación
        //total += ejecución/quantum*TCC + ejecución + bloqueo*#bloqueo
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


