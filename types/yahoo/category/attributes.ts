export class Attributes {
  constructor(private _sordOrder: number) {}

  public get sordOrder(): number {
    return this._sordOrder;
  }

  public set sordOrder(sordOrder: number) {
    this._sordOrder = sordOrder;
  }
}
