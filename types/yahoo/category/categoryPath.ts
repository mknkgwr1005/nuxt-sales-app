import { Title } from "./title";

export class CategoryPath {
  constructor(
    private _attributes: number,
    private _id: number,
    private _parentId: number,
    private _title: Array<Title>
  ) {}

  public get attributes(): number {
    return this._attributes;
  }

  public set attributes(attributes: number) {
    this._attributes = attributes;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get parentId(): number {
    return this._parentId;
  }

  public set parentId(parentId: number) {
    this._parentId = parentId;
  }

  public get title(): Array<Title> {
    return this._title;
  }

  public set title(title: Array<Title>) {
    this._title = title;
  }
}
