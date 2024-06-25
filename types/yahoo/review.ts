export class Review {
  constructor(
    private _count: number,
    private _url: string,
    private _rate: number
  ) {}

  public get count(): number {
    return this._count;
  }

  public set count(count: number) {
    this._count = count;
  }

  public get url(): string {
    return this._url;
  }

  public set url(url: string) {
    this._url = url;
  }

  public get rate(): number {
    return this._rate;
  }

  public set rate(rate: number) {
    this._rate = rate;
  }
}
