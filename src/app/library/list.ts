export class ListEditDelegate {

  private readonly list: any[];

  constructor(list: any[]) {
    this.list = list;
  }

  add(object: any, index: number = null) {
    if (index === null)
      index = this.list.length;
    this.list.splice(index, 0, object);
  }

  remove(index: number) {
     this.list.splice(index, 1)
  }

  get(index: number) {
    return this.list[index];
  }

}
