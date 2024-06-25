export class rktCategoryDetail {
  constructor(
    private _genreId: number,
    private _genreLevel: number,
    private _genreName: string
  ) {}

  public get genreId(): number {
    return this._genreId;
  }

  public set genreId(genreId: number) {
    this._genreId = genreId;
  }

  public get genreLevel(): number {
    return this._genreLevel;
  }

  public set genreLevel(genreLevel: number) {
    this._genreLevel = genreLevel;
  }

  public get genreName(): string {
    return this._genreName;
  }

  public set genreName(genreName: string) {
    this._genreName = genreName;
  }
}
