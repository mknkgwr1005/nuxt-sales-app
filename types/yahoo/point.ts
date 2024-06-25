export class Point {
  constructor(
    private _amount: number,
    private _times: number,
    private _bonusAmount: number,
    private _bonusTimes: number,
    private _premiumAmount: number,
    private _premiumTimes: number,
    private _premiumBonusAmount: number,
    private _premiumBonusTimes: number
  ) {}

  public get amount(): number {
    return this._amount;
  }

  public set amount(amount: number) {
    this._amount = amount;
  }

  public get times(): number {
    return this._times;
  }

  public set times(times: number) {
    this._times = times;
  }

  public get bonusAmount(): number {
    return this._bonusAmount;
  }

  public set bonusAmount(bonusAmount: number) {
    this._bonusAmount = bonusAmount;
  }

  public get bonusTimes(): number {
    return this._bonusTimes;
  }

  public set bonusTimes(bonusTimes: number) {
    this._bonusTimes = bonusTimes;
  }

  public get premiumAmount(): number {
    return this._premiumAmount;
  }

  public set premiumAmount(premiumAmount: number) {
    this._premiumAmount = premiumAmount;
  }

  public get premiumTimes(): number {
    return this._premiumTimes;
  }

  public set premiumTimes(premiumTimes: number) {
    this._premiumTimes = premiumTimes;
  }

  public get premiumBonusAmount(): number {
    return this._premiumBonusAmount;
  }

  public set premiumBonusAmount(premiumBonusAmount: number) {
    this._premiumBonusAmount = premiumBonusAmount;
  }

  public get premiumBonusTimes(): number {
    return this._premiumBonusTimes;
  }

  public set premiumBonusTimes(premiumBonusTimes: number) {
    this._premiumBonusTimes = premiumBonusTimes;
  }
}
