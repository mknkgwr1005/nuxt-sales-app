import { Attributes } from "./attributes";
import { CategoryTitle } from "./categoryTitle";

export class ChildCategory {
  constructor(
    private _attributes: Array<Attributes>,
    private _id: number,
    private _url: string,
    private _title: Array<CategoryTitle>
  ) {}

  public get attributes(): Array<Attributes> {
    return this._attributes;
  }

  public set attributes(attributes: Array<Attributes>) {
    this._attributes = attributes;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get url(): string {
    return this._url;
  }

  public set url(url: string) {
    this._url = url;
  }

  public get title(): Array<CategoryTitle> {
    return this._title;
  }

  public set title(title: Array<CategoryTitle>) {
    this._title = title;
  }
}
