export class parentGenreCategories {
  constructor(
    private _id: number,
    private _name: string,
    private _depth: number
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get depth(): number {
    return this._depth;
  }

  public set depth(depth: number) {
    this._depth = depth;
  }
}
