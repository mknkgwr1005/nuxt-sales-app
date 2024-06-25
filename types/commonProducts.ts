export class commonProducts {
  constructor(
    private _name: string,
    private _url: string,
    private _imageUrl: string,
    private _price: number,
    private _reviewCount: number,
    private _reviewAverage: number
  ) {}

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get url(): string {
    return this._url;
  }

  public set url(url: string) {
    this._url = url;
  }

  public get imageUrl(): string {
    return this._imageUrl;
  }

  public set imageUrl(imageUrl: string) {
    this._imageUrl = imageUrl;
  }

  public get price(): number {
    return this._price;
  }

  public set price(price: number) {
    this._price = price;
  }

  public get reviewCount(): number {
    return this._reviewCount;
  }

  public set reviewCount(reviewCount: number) {
    this._reviewCount = reviewCount;
  }

  public get reviewAverage(): number {
    return this._reviewAverage;
  }

  public set reviewAverage(reviewAverage: number) {
    this._reviewAverage = reviewAverage;
  }
}
