export class rktPriceItem {
  constructor(private _itemName: string, private _itemPrice: number) {}

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
}
