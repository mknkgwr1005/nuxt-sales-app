export class PriceLabel {
  constructor(
    private _taxable: string,
    private _defaultPrice: number,
    private _discountedPrice: string,
    private _fixedPrice: string,
    private _premiumPrice: string,
    private _periodStart: string,
    private _periodEnd: string
  ) {}

  public get taxable(): string {
    return this._taxable;
  }

  public set taxable(taxable: string) {
    this._taxable = taxable;
  }

  public get defaultPrice(): number {
    return this._defaultPrice;
  }

  public set defaultPrice(defaultPrice: number) {
    this._defaultPrice = defaultPrice;
  }

  public get discountedPrice(): string {
    return this._discountedPrice;
  }

  public set discountedPrice(discountedPrice: string) {
    this._discountedPrice = discountedPrice;
  }

  public get fixedPrice(): string {
    return this._fixedPrice;
  }

  public set fixedPrice(fixedPrice: string) {
    this._fixedPrice = fixedPrice;
  }

  public get premiumPrice(): string {
    return this._premiumPrice;
  }

  public set premiumPrice(premiumPrice: string) {
    this._premiumPrice = premiumPrice;
  }

  public get periodStart(): string {
    return this._periodStart;
  }

  public set periodStart(periodStart: string) {
    this._periodStart = periodStart;
  }

  public get periodEnd(): string {
    return this._periodEnd;
  }

  public set periodEnd(periodEnd: string) {
    this._periodEnd = periodEnd;
  }
}
