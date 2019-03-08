class Process {

    constructor(hierarchy, name, execTime, blockageTimes, readyTime) {
        this.hierarchy = hierarchy;
        this.name = name;
        this.execTime = execTime;
        this.blockageTimes = blockageTimes;
        this.readyTime = readyTime;
        this.completed = false;
    }

    toString() {
        return `${this.hierarchy} ${this.name} ${this.execTime} ${this.blockageTimes} ${this.readyTime}`
    }

}

module.exports = Process;