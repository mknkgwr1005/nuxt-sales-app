export class CategoryTitle {
  constructor(
    private _short: string,
    private _medium: string,
    private _long: string
  ) {}

  public get short(): string {
    return this._short;
  }

  public set short(short: string) {
    this._short = short;
  }

  public get medium(): string {
    return this._medium;
  }

  public set medium(medium: string) {
    this._medium = medium;
  }

  public get long(): string {
    return this._long;
  }

  public set long(long: string) {
    this._long = long;
  }
}
