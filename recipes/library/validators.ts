class Lengthy { public length: number; }   // lmfao what am I doing with my life


export class Invalid {
  constructor(public error: string) {}
}


export function asOptionalString(value: any): string {
  if (value === undefined || value === null)
    return '';
  return String(value);
}

export function asString(value: any, error = 'invalid string'): string {
  if (Object.prototype.toString.call(value) !== '[object String]')
    throw new Invalid(error);
  return value as string;
}

export function asNotEmpty<T extends Lengthy>(value: T, error = 'object empty'): T {
  if (value.length === 0)
    throw new Invalid(error);
  return value;
}

export function asOptionalArray(value: any): Array<any> {
  if (value === undefined || value === null)
    return [];
  return value as Array<any>;
}

export function asArray(value: any, error = 'invalid array'): Array<any> {
  if (Object.prototype.toString.call(value) !== '[object Array]')
    throw new Invalid(error);
  return value;
}

export function asNumber(value: any, error = 'invalid array'): number {
  if (Object.prototype.toString.call(value) !== '[object Number]')
    throw new Invalid(error);
  return value as number;
}

export function asOptionalNumber(value: any): number {
  if (Object.prototype.toString.call(value) !== '[object Number]')
    return undefined;
  return value as number;
}
