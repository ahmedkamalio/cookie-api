import { expires } from '../../src/utils/expires';

describe('expires()', () => {
  it('Should return undefined when the given date is undefined', () => {
    expect(expires(undefined)).toBeUndefined();
  });
  it('Should return undefined when the given date is neither date type nor string type', () => {
    expect(expires({} as any)).toBeUndefined();
  });
  it('Should return a valid UTC date string when the given date is valid string', () => {
    const date = new Date().toString();
    expect(expires(date)).toBe(new Date(date).toUTCString());
  });
  it('Should return a valid UTC date string when the given date is valid date', () => {
    const date = new Date();
    expect(expires(new Date())).toBe(date.toUTCString());
  });
});
