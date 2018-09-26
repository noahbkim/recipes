/** Stores tracked instance methods and provides an installation method. */
export class Modular {

  private static modules: Map<any, Array<PropertyDescriptor>> = {} as Map<any, Array<PropertyDescriptor>>;

  public static add(key: any, descriptor: any): void {
    if (!Modular.modules.hasOwnProperty(key))
      Modular.modules[key] = [];
    Modular.modules[key].push(descriptor);
  }

  public static get(key: any): Array<any> {
    return Modular.modules[key];
  }

  public initialize(then: Function): void {
    const descriptors = Modular.get(this.constructor.prototype).slice();
    const next = () => {
      if (descriptors.length > 0)
        descriptors.splice(0, 1)[0].value.call(this, next);
      else then();
    };
    next();
  }

}


/** Track module instance methods via decorators. */
export function module(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
  Modular.add(target.constructor.prototype, descriptor);
}
