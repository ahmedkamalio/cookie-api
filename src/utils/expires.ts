/**
 * A helper function to convert the given expiration date into string.
 * @param expDate Cookie's expiration date.
 * @returns expiration date as string if the given value was valid, otherwise undefined.
 */
export function expires(expDate?: string | Date): string | undefined {
  if (!expDate) {
    return undefined;
  }
  if (typeof expDate === 'string') {
    return new Date(expDate).toUTCString();
  }
  if (Object.prototype.toString.call(expDate) === '[object Date]') {
    return expDate.toUTCString();
  }
  return undefined;
}
