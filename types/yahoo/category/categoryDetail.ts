import { CategoryPath } from "./categoryPath";
import { CategoryTitle } from "./categoryTitle";
import { ChildCategory } from "./childCategory";

export class CategoryDetail {
  constructor(
    private _id: number,
    private _parendId: number,
    private _url: string,
    private _title: Array<CategoryTitle>,
    private _path: Array<CategoryPath>,
    private _children: Array<ChildCategory>
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get parendId(): number {
    return this._parendId;
  }

  public set parendId(parendId: number) {
    this._parendId = parendId;
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

  public get path(): Array<CategoryPath> {
    return this._path;
  }

  public set path(path: Array<CategoryPath>) {
    this._path = path;
  }

  public get children(): Array<ChildCategory> {
    return this._children;
  }

  public set children(children: Array<ChildCategory>) {
    this._children = children;
  }
}
