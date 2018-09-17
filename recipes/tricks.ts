/** Stores tracked instance methods and provides an installation method. */
export class Modular {

  private static modules: Map<any, Array<any>> = {} as Map<any, Array<any>>;

  public static add(key: any, descriptor: any): void {
    if (!Modular.modules.hasOwnProperty(key))
      Modular.modules[key] = [];
    Modular.modules[key].push(descriptor);
  }

  public static get(key: any): Array<any> {
    return Modular.modules[key];
  }

  public start(): void {
    for (const descriptor of Modular.get(this.constructor.prototype)) {
      descriptor.value.call(this);
      console.log('Installed ' + descriptor.value.name);
    }
  }

}


/** Track module instance methods via decorators. */
export function module(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
  Modular.add(target.constructor.prototype, descriptor);
}
