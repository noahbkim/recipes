export class Dispatcher {

  private registered = {} as Map<string, any>;
  private listeners = {} as Map<string, Function>;

  public complete(name: string, value: any = true): void {
    this.registered[name] = value;
    if (this.listeners.hasOwnProperty(name))
      this.listeners[name]();
  }

  public wait(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.registered.hasOwnProperty(name)) {
        resolve(this.registered[name]);
      } else {
        if (this.listeners.hasOwnProperty(name))
          console.log(`override wait for ${name}`);
        this.listeners[name] = () => resolve(this.registered[name]);
      }
    });
  }

}
