export class rktImage {
  constructor(private _imageUrl: string) {}

  public get imageUrl(): string {
    return this._imageUrl;
  }

  public set imageUrl(imageUrl: string) {
    this._imageUrl = imageUrl;
  }
}
