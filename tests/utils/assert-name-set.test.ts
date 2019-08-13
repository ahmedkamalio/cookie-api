import { assertNameSet } from '../../src/utils/assert-name-set';

describe('assertNameSet()', () => {
  it('Should throw an error when the given name is undefined', () => {
    expect(() => assertNameSet(undefined)).toThrow();
  });
  it('Should throw an error when the given name is empty', () => {
    expect(() => assertNameSet('')).toThrow();
  });
  it('Should throw an error when the given name is blank', () => {
    expect(() => assertNameSet('     ')).toThrow();
  });
  it('Should throw an error when the given name is blank', () => {
    expect(() => assertNameSet('\t\t')).toThrow();
  });
  it('Should throw an error when the given name is not a string type', () => {
    expect(() => assertNameSet({} as any)).toThrow();
  });
  it('Should not throw when the given name is valid', () => {
    expect(() => assertNameSet('valid')).not.toThrow();
  });
});
