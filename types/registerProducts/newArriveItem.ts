export class newArriveItem {
  constructor(
    private _searchOption: string,
    private _keyword: string,
    private _name: string,
    private _image: string,
    private _brand: string,
    private _genreId: number,
    private _genre: string,
    private _url: string,
    private _lastHitUrl: string
  ) {}

  public get searchOption(): string {
    return this._searchOption;
  }

  public set searchOption(searchOption: string) {
    this._searchOption = searchOption;
  }

  public get keyword(): string {
    return this._keyword;
  }

  public set keyword(keyword: string) {
    this._keyword = keyword;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get image(): string {
    return this._image;
  }

  public set image(image: string) {
    this._image = image;
  }

  public get brand(): string {
    return this._brand;
  }

  public set brand(brand: string) {
    this._brand = brand;
  }

  public get genreId(): number {
    return this._genreId;
  }

  public set genreId(genreId: number) {
    this._genreId = genreId;
  }

  public get genre(): string {
    return this._genre;
  }

  public set genre(genre: string) {
    this._genre = genre;
  }

  public get url(): string {
    return this._url;
  }

  public set url(url: string) {
    this._url = url;
  }

  public get lastHitUrl(): string {
    return this._lastHitUrl;
  }

  public set lastHitUrl(lastHitUrl: string) {
    this._lastHitUrl = lastHitUrl;
  }
}
