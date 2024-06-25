export class SellerReview {
  constructor(private _count: number, private _rate: number) {}

  public get count(): number {
    return this._count;
  }

  public set count(count: number) {
    this._count = count;
  }

  public get rate(): number {
    return this._rate;
  }

  public set rate(rate: number) {
    this._rate = rate;
  }
}
