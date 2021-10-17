export default class Pagination {
  private _offset: number;
  private _pages: number;

  constructor(
    public totalItems: number,
    public page: number = 1,
    public pageSize: number = 20
  ) {
    this._offset = this.pageSize * (this.page - 1);
    this._pages = Math.ceil(totalItems / this.pageSize);
  }

  get offset(): number {
    return this._offset;
  }

  get pages(): number {
    return this._pages;
  }
}
