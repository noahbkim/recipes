export class Tracker {

  private registered = {} as Map<string, boolean>;
  private listeners = {} as Map<string, Function>;

  public complete(name: string): void {
    this.registered[name] = true;
    if (this.listeners.hasOwnProperty(name))
      this.listeners[name]();
  }

  public wait(name: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.registered[name] === true) {
        resolve();
      } else {
        if (this.listeners.hasOwnProperty(name))
          console.log(`override wait for ${name}`);
        this.listeners[name] = resolve;
      }
    });
  }

}
