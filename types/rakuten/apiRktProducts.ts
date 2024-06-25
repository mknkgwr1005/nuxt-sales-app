import { rktProducts } from "./rktProducts";

export class apiRktProducts {
  constructor(private _item: Array<rktProducts>) {}

  public get item(): Array<rktProducts> {
    return this._item;
  }

  public set item(item: Array<rktProducts>) {
    this._item = item;
  }
}
