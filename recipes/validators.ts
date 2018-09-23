class Lengthy { public length: number; }   // lmfao what am I doing with my life


export function asOptionalString(value: any): string {
  if (value === undefined || value === null)
    return '';
  return String(value);
}

export function asString(value: any, error = 'invalid string'): string {
  if (!(value instanceof String))
    throw error;
  return value as string;
}

export function asNotEmpty<T extends Lengthy>(value: T, error = 'object empty'): T {
  if (value.length === 0)
    throw error;
  return value;
}

export function asOptionalArray(value: any): Array<any> {
  if (value === undefined || value === null)
    return [];
  return value as Array<any>;
}

export function asArray(value: any, error = 'invalid array'): Array<any> {
  if (!(value instanceof Array))
    throw error;
  return value;
}
