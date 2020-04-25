export class Exchange {
  constructor(baseVal, excRate) {
    this.baseVal = baseVal;
    this.excRate = excRate;
  }

  calculate() {
    return this.roundNum(this.baseVal * this.excRate);
  }

  roundNum(num) {
    return Math.round(num * 10) / 10;
  }

}