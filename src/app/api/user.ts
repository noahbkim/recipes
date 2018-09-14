export class User {

  public username: string;
  public password: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  toJSON(): {} {
    return {username: this.username, password: this.password};
  }

}
