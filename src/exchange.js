export class Exchange {
  constructor(baseVal, excRate) {
    this.baseVal = baseVal;
    this.excRate = excRate;
  }

  calculate() {
    return this.baseVal * this.excRate;
  }

}