import { SellerReview } from "./sellerReview";
export class Seller {
  constructor(
    private _sellerId: string,
    private _name: string,
    private _url: string,
    private _isBestSeller: string,
    private _review: Array<SellerReview>,
    private _imageId: string
  ) {}

  public get sellerId(): string {
    return this._sellerId;
  }

  public set sellerId(sellerId: string) {
    this._sellerId = sellerId;
  }

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

  public get isBestSeller(): string {
    return this._isBestSeller;
  }

  public set isBestSeller(isBestSeller: string) {
    this._isBestSeller = isBestSeller;
  }

  public get review(): Array<SellerReview> {
    return this._review;
  }

  public set review(review: Array<SellerReview>) {
    this._review = review;
  }
  public get imageId(): string {
    return this._imageId;
  }

  public set imageId(imageId: string) {
    this._imageId = imageId;
  }
}
