// Initialization of all the Micros
// TODO: Use args and chalk to communicate with the terminal
initMicros(2);

function initMicros(numberOfMicros) {
  let micros = [numberOfMicros - 1];
  var i;
  for (i = 0; i < numberOfMicros; i++) {
    micros[i] = {
      total: 0,
      processes: []
    };
  }
}
