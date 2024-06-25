export class Delivery {
  constructor(
    private _deadLine: number,
    private _day: number,
    private _area: string
  ) {}

  public get deadLine(): number {
    return this._deadLine;
  }

  public set deadLine(deadLine: number) {
    this._deadLine = deadLine;
  }

  public get day(): number {
    return this._day;
  }

  public set day(day: number) {
    this._day = day;
  }

  public get area(): string {
    return this._area;
  }

  public set area(area: string) {
    this._area = area;
  }
}
