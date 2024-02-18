class QueryBuilder {
  private _andQuery: string = "";
  private _orQuery: string = "";
  public and(key: string, value: string) {
    if (!Boolean(this._andQuery)) {
      this._andQuery += `and=${key}:${value}`;
    } else {
      this._andQuery += `;${key}:${value}`;
    }
    return this;
  }

  public or(key: string, value: string) {
    if (!Boolean(this._orQuery)) {
      this._orQuery += `or=${key}:${value}`;
    } else {
      this._orQuery += `;${key}:${value}`;
    }
    return this;
  }

  public build() {
    return `${this._andQuery}&${this._orQuery}`;
  }
}

export default QueryBuilder;
