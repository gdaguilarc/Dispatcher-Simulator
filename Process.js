class Process {
  constructor(hierarchy, name, execTime, blockageTimes, readyTime) {
    // Data by the user
    this.hierarchy = parseInt(hierarchy);
    this.name = name;
    this.te = parseInt(execTime);
    this.blockageTimes = parseInt(blockageTimes);
    this.readyTime = parseInt(readyTime);

    // Default Data
    this.tcc = 0;
    this.tvc = 0;
    this.tb = 0;
    this.ti = 0;
    this.completed = false;
  }
}

module.exports = Process;
