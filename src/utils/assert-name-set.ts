/**
 * A helper function to assert that the cookie name was set and not empty or blank.
 * @param name Cookie's name.
 */
export function assertNameSet(name?: string): void {
  if (!name) {
    throw new Error('cookie name cannot be null or undefined');
  }
  if (typeof name !== 'string') {
    throw new Error(`invalid type ${typeof name} for cookie name`);
  }
  if (!name.replace(/\s/g, '').replace(/\t/g, '')) {
    throw new Error('cookie name cannot be empty or blank');
  }
}
