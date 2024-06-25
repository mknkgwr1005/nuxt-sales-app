export class Image {
  constructor(private _small: string, private _medium: string) {}

  public get small(): string {
    return this._small;
  }

  public set small(small: string) {
    this._small = small;
  }

  public get medium(): string {
    return this._medium;
  }

  public set medium(medium: string) {
    this._medium = medium;
  }
}
