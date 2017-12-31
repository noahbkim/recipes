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
