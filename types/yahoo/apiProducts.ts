import { Image } from "./image";
import { Review } from "./review";
import { PriceLabel } from "./priceLabel";
import { Point } from "./point";
import { Shipping } from "./shipping";
import { GenreCategory } from "./genreCategory";
import { parentGenreCategories } from "./parentGenreCategories";
import { Brand } from "./brand";
import { ParentBrands } from "./parentBrands";
import { Seller } from "./seller";
import { Delivery } from "./delivery";
/**
 * APIから情報を取得する際に使用するドメインクラス
 */
export class apiProducts {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private _index: number,
    private _name: string,
    private _description: string,
    private _headLine: string,
    private _url: string,
    private _inStock: string,
    private _code: string,
    private _condition: string,
    private _imageId: string,
    private _image: Array<Image>,
    private _review: Array<Review>,
    private _affiliateRate: number,
    private _price: number,
    private _premiumPrice: number,
    private _premiumPriceStatus: string,
    private _premiumDiscountRate: string,
    private _premiumDiscountType: string,
    private _priceLabel: Array<PriceLabel>,
    private _point: Array<Point>,
    private _shipping: Array<Shipping>,
    private _genreCategory: Array<GenreCategory>,
    private _parentGenreCategories: Array<parentGenreCategories>,
    private _brand: Array<Brand>,
    private _parentBrands: Array<ParentBrands>,
    private _janCode: string,
    private _payment: string,
    private _releaseDate: string,
    private _seller: Array<Seller>,
    private _delivery: Array<Delivery>
  ) {}

  /**
   * 説明文をフォーマットする
   */
  get formatDescription(): string {
    const str = this._description;
    const formatDescription = str.replace("<br>", "\n");
    return formatDescription;
  }

  public get index(): number {
    return this._index;
  }

  public set index(index: number) {
    this._index = index;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get description(): string {
    return this._description;
  }

  public set description(description: string) {
    this._description = description;
  }

  public get headLine(): string {
    return this._headLine;
  }

  public set headLine(headLine: string) {
    this._headLine = headLine;
  }

  public get url(): string {
    return this._url;
  }

  public set url(url: string) {
    this._url = url;
  }

  public get inStock(): string {
    return this._inStock;
  }

  public set inStock(inStock: string) {
    this._inStock = inStock;
  }

  public get code(): string {
    return this._code;
  }

  public set code(code: string) {
    this._code = code;
  }

  public get condition(): string {
    return this._condition;
  }

  public set condition(condition: string) {
    this._condition = condition;
  }

  public get imageId(): string {
    return this._imageId;
  }

  public set imageId(imageId: string) {
    this._imageId = imageId;
  }

  public get image(): Array<Image> {
    return this._image;
  }

  public set image(image: Array<Image>) {
    this._image = image;
  }

  public get review(): Array<Review> {
    return this._review;
  }

  public set review(review: Array<Review>) {
    this._review = review;
  }

  public get affiliateRate(): number {
    return this._affiliateRate;
  }

  public set affiliateRate(affiliateRate: number) {
    this._affiliateRate = affiliateRate;
  }

  public get price(): number {
    return this._price;
  }

  public set price(price: number) {
    this._price = price;
  }

  public get premiumPrice(): number {
    return this._premiumPrice;
  }

  public set premiumPrice(premiumPrice: number) {
    this._premiumPrice = premiumPrice;
  }

  public get premiumPriceStatus(): string {
    return this._premiumPriceStatus;
  }

  public set premiumPriceStatus(premiumPriceStatus: string) {
    this._premiumPriceStatus = premiumPriceStatus;
  }

  public get premiumDiscountRate(): string {
    return this._premiumDiscountRate;
  }

  public set premiumDiscountRate(premiumDiscountRate: string) {
    this._premiumDiscountRate = premiumDiscountRate;
  }

  public get premiumDiscountType(): string {
    return this._premiumDiscountType;
  }

  public set premiumDiscountType(premiumDiscountType: string) {
    this._premiumDiscountType = premiumDiscountType;
  }

  public get priceLabel(): Array<PriceLabel> {
    return this._priceLabel;
  }

  public set priceLabel(priceLabel: Array<PriceLabel>) {
    this._priceLabel = priceLabel;
  }

  public get point(): Array<Point> {
    return this._point;
  }

  public set point(point: Array<Point>) {
    this._point = point;
  }

  public get shipping(): Array<Shipping> {
    return this._shipping;
  }

  public set shipping(shipping: Array<Shipping>) {
    this._shipping = shipping;
  }

  public get genreCategory(): Array<GenreCategory> {
    return this._genreCategory;
  }

  public set genreCategory(genreCategory: Array<GenreCategory>) {
    this._genreCategory = genreCategory;
  }

  public get parentGenreCategories(): Array<parentGenreCategories> {
    return this._parentGenreCategories;
  }

  public set parentGenreCategories(
    parentGenreCategories: Array<parentGenreCategories>
  ) {
    this._parentGenreCategories = parentGenreCategories;
  }

  public get brand(): Array<Brand> {
    return this._brand;
  }

  public set brand(brand: Array<Brand>) {
    this._brand = brand;
  }

  public get parentBrands(): Array<ParentBrands> {
    return this._parentBrands;
  }

  public set parentBrands(parentBrands: Array<ParentBrands>) {
    this._parentBrands = parentBrands;
  }

  public get janCode(): string {
    return this._janCode;
  }

  public set janCode(janCode: string) {
    this._janCode = janCode;
  }

  public get payment(): string {
    return this._payment;
  }

  public set payment(payment: string) {
    this._payment = payment;
  }

  public get releaseDate(): string {
    return this._releaseDate;
  }

  public set releaseDate(releaseDate: string) {
    this._releaseDate = releaseDate;
  }

  public get seller(): Array<Seller> {
    return this._seller;
  }

  public set seller(seller: Array<Seller>) {
    this._seller = seller;
  }

  public get delivery(): Array<Delivery> {
    return this._delivery;
  }

  public set delivery(delivery: Array<Delivery>) {
    this._delivery = delivery;
  }
}
