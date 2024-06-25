import { idGroup } from "./idGroup";
export class rktTag {
  constructor(private _tagIds: Array<idGroup>) {}

  public get tagIds(): Array<idGroup> {
    return this._tagIds;
  }

  public set tagIds(tagIds: Array<idGroup>) {
    this._tagIds = tagIds;
  }
}
