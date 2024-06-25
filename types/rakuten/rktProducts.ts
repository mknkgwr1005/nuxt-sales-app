import { rktImage } from "./rktImage";
import { rktTag } from "./rktTag";
export class rktProducts {
  constructor(
    private _affiliateRate: number,
    private _affiliateUrl: string,
    private _asurakuArea: string,
    private _asurakuClosingTime: string,
    private _asurakuFlag: number,
    private _availability: number,
    private _catchcopy: string,
    private _creditCardFlag: number,
    private _endTime: string,
    private _genreId: string,
    private _giftFlag: number,
    private _imageFlag: number,
    private _itemCaption: string,
    private _itemCode: string,
    private _itemName: string,
    private _itemPrice: number,
    private _itemUrl: string,
    private _mediumImageUrls: Array<rktImage>,
    private _pointRate: number,
    private _pointRateEndTime: string,
    private _pointRateStartTime: string,
    private _postageFlag: number,
    private _reviewAverage: number,
    private _reviewCount: number,
    private _shipOverseasArea: string,
    private _shipOverseasFlag: number,
    private _shopAffiliateUrl: string,
    private _shopCode: string,
    private _shopName: string,
    private _shopOfTheYearFlag: number,
    private _shopUrl: string,
    private _smallImageUrls: Array<rktImage>,
    private _startTime: string,
    private _tagIds: Array<rktTag>,
    private _taxFlag: number
  ) {}

  public get affiliateRate(): number {
    return this._affiliateRate;
  }

  public set affiliateRate(affiliateRate: number) {
    this._affiliateRate = affiliateRate;
  }

  public get affiliateUrl(): string {
    return this._affiliateUrl;
  }

  public set affiliateUrl(affiliateUrl: string) {
    this._affiliateUrl = affiliateUrl;
  }

  public get asurakuArea(): string {
    return this._asurakuArea;
  }

  public set asurakuArea(asurakuArea: string) {
    this._asurakuArea = asurakuArea;
  }

  public get asurakuClosingTime(): string {
    return this._asurakuClosingTime;
  }

  public set asurakuClosingTime(asurakuClosingTime: string) {
    this._asurakuClosingTime = asurakuClosingTime;
  }

  public get asurakuFlag(): number {
    return this._asurakuFlag;
  }

  public set asurakuFlag(asurakuFlag: number) {
    this._asurakuFlag = asurakuFlag;
  }

  public get availability(): number {
    return this._availability;
  }

  public set availability(availability: number) {
    this._availability = availability;
  }

  public get catchcopy(): string {
    return this._catchcopy;
  }

  public set catchcopy(catchcopy: string) {
    this._catchcopy = catchcopy;
  }

  public get creditCardFlag(): number {
    return this._creditCardFlag;
  }

  public set creditCardFlag(creditCardFlag: number) {
    this._creditCardFlag = creditCardFlag;
  }

  public get endTime(): string {
    return this._endTime;
  }

  public set endTime(endTime: string) {
    this._endTime = endTime;
  }

  public get genreId(): string {
    return this._genreId;
  }

  public set genreId(genreId: string) {
    this._genreId = genreId;
  }

  public get giftFlag(): number {
    return this._giftFlag;
  }

  public set giftFlag(giftFlag: number) {
    this._giftFlag = giftFlag;
  }

  public get imageFlag(): number {
    return this._imageFlag;
  }

  public set imageFlag(imageFlag: number) {
    this._imageFlag = imageFlag;
  }

  public get itemCaption(): string {
    return this._itemCaption;
  }

  public set itemCaption(itemCaption: string) {
    this._itemCaption = itemCaption;
  }

  public get itemCode(): string {
    return this._itemCode;
  }

  public set itemCode(itemCode: string) {
    this._itemCode = itemCode;
  }

  public get itemName(): string {
    return this._itemName;
  }

  public set itemName(itemName: string) {
    this._itemName = itemName;
  }

  public get itemPrice(): number {
    return this._itemPrice;
  }

  public set itemPrice(itemPrice: number) {
    this._itemPrice = itemPrice;
  }

  public get itemUrl(): string {
    return this._itemUrl;
  }

  public set itemUrl(itemUrl: string) {
    this._itemUrl = itemUrl;
  }

  public get mediumImageUrls(): Array<rktImage> {
    return this._mediumImageUrls;
  }

  public set mediumImageUrls(mediumImageUrls: Array<rktImage>) {
    this._mediumImageUrls = mediumImageUrls;
  }

  public get pointRate(): number {
    return this._pointRate;
  }

  public set pointRate(pointRate: number) {
    this._pointRate = pointRate;
  }

  public get pointRateEndTime(): string {
    return this._pointRateEndTime;
  }

  public set pointRateEndTime(pointRateEndTime: string) {
    this._pointRateEndTime = pointRateEndTime;
  }

  public get pointRateStartTime(): string {
    return this._pointRateStartTime;
  }

  public set pointRateStartTime(pointRateStartTime: string) {
    this._pointRateStartTime = pointRateStartTime;
  }

  public get postageFlag(): number {
    return this._postageFlag;
  }

  public set postageFlag(postageFlag: number) {
    this._postageFlag = postageFlag;
  }

  public get reviewAverage(): number {
    return this._reviewAverage;
  }

  public set reviewAverage(reviewAverage: number) {
    this._reviewAverage = reviewAverage;
  }

  public get reviewCount(): number {
    return this._reviewCount;
  }

  public set reviewCount(reviewCount: number) {
    this._reviewCount = reviewCount;
  }

  public get shipOverseasArea(): string {
    return this._shipOverseasArea;
  }

  public set shipOverseasArea(shipOverseasArea: string) {
    this._shipOverseasArea = shipOverseasArea;
  }

  public get shipOverseasFlag(): number {
    return this._shipOverseasFlag;
  }

  public set shipOverseasFlag(shipOverseasFlag: number) {
    this._shipOverseasFlag = shipOverseasFlag;
  }

  public get shopAffiliateUrl(): string {
    return this._shopAffiliateUrl;
  }

  public set shopAffiliateUrl(shopAffiliateUrl: string) {
    this._shopAffiliateUrl = shopAffiliateUrl;
  }

  public get shopCode(): string {
    return this._shopCode;
  }

  public set shopCode(shopCode: string) {
    this._shopCode = shopCode;
  }

  public get shopName(): string {
    return this._shopName;
  }

  public set shopName(shopName: string) {
    this._shopName = shopName;
  }

  public get shopOfTheYearFlag(): number {
    return this._shopOfTheYearFlag;
  }

  public set shopOfTheYearFlag(shopOfTheYearFlag: number) {
    this._shopOfTheYearFlag = shopOfTheYearFlag;
  }

  public get shopUrl(): string {
    return this._shopUrl;
  }

  public set shopUrl(shopUrl: string) {
    this._shopUrl = shopUrl;
  }

  public get smallImageUrls(): Array<rktImage> {
    return this._smallImageUrls;
  }

  public set smallImageUrls(smallImageUrls: Array<rktImage>) {
    this._smallImageUrls = smallImageUrls;
  }

  public get startTime(): string {
    return this._startTime;
  }

  public set startTime(startTime: string) {
    this._startTime = startTime;
  }

  public get tagIds(): Array<rktTag> {
    return this._tagIds;
  }

  public set tagIds(tagIds: Array<rktTag>) {
    this._tagIds = tagIds;
  }

  public get taxFlag(): number {
    return this._taxFlag;
  }

  public set taxFlag(taxFlag: number) {
    this._taxFlag = taxFlag;
  }
}
