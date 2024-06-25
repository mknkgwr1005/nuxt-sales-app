export class Shipping {
  constructor(private _code: number, private _name: string) {}

  public get code(): number {
    return this._code;
  }

  public set code(code: number) {
    this._code = code;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }
}
