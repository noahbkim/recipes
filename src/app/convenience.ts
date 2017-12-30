/** Just warn. */
export function warn(): (error: any) => void {
  return error => console.warn(error);
}

/** Shortcut to reject from a promise. */
export function warnAndReject(reject): (error: any) => void {
  return (error) => {
    console.warn('Error: ');
    reject();
  };
}

/** Element controller. */
export class ElementController {

  static template: String;
  element: Element;

  /** Instantiate with the element. */
  constructor(element: Element) {
    this.element = element;
  }

}
