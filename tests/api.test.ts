import {
  addCookie,
  cookieExists,
  cookieHasValue,
  deleteAllCookies,
  deleteCookie,
  getAllCookies,
  getCookie,
  getCookieDecoded,
  setCookie,
} from '../src/api';

describe('Cookie API', () => {
  beforeEach(deleteAllCookies);
  it('addCookie() should add a new cookie to the document if not exists already', () => {
    addCookie('name', 'value');
    expect(document.cookie).toBe('name=value');
  });
  it('addCookie() should have no effect when the cookie already exists', () => {
    document.cookie = 'name=oldValue';
    addCookie('name', 'value');
    expect(document.cookie).toBe('name=oldValue');
  });
  it('setCookie() should add a new cookie to the document if not exists already', () => {
    setCookie('name', 'value');
    expect(document.cookie).toBe('name=value');
  });
  it("setCookie() should add a new cookie to the document whether or not it's already exists", () => {
    document.cookie = 'name=oldValue';
    setCookie('name', 'value');
    expect(document.cookie).toBe('name=value');
  });
  it('setCookie() should add a new cookie to the document with the given options', () => {
    setCookie('name', 'value', { path: '/', maxAge: 1000 * 60 * 60 * 24 });
    expect(document.cookie).toBe('name=value');
  });
  it('setCookie() should add a new cookie to the document with the given options', () => {
    setCookie('name', 'value', { expDate: 'Tue, 13 Aug 2119 10:29:45 GMT' });
    expect(document.cookie).toBe('name=value');
  });
  it('setCookie() should have no effect when the given domain is not the same as the current domain', () => {
    setCookie('name', 'value', { domain: 'example.com' });
    expect(document.cookie).toBe('');
  });
  it('setCookie() should have no effect when secure flag is set to true but the app is running on normal HTTP', () => {
    setCookie('name', 'value', { secure: true });
    expect(document.cookie).toBe('');
  });
  it('setCookie() should add a new encoded cookie to the document when encode option is set to true', () => {
    setCookie('name', 'value', { encode: true });
    expect(document.cookie).toBe('name=dmFsdWU%3D');
  });
  it('setCookie() should add a new encoded cookie to the document when encode option is set to true', () => {
    const window = (global as any).window;
    delete (global as any).window;
    setCookie('name', 'value', { encode: true });
    (global as any).window = window;
    expect(document.cookie).toBe('name=dmFsdWU%3D');
  });
  it('getAllCookies() should return all visible cookies', () => {
    document.cookie = 'name=value';
    document.cookie = 'name1=value1';
    expect(getAllCookies()).toStrictEqual({ name: 'value', name1: 'value1' });
  });
  it("getCookieDecoded() should return decoded cookie's value if found", () => {
    document.cookie = 'name=dmFsdWU%3D';
    expect(getCookieDecoded('name')).toBe('value');
  });
  it("getCookieDecoded() should return decoded cookie's value if found", () => {
    const window = (global as any).window;
    delete (global as any).window;
    document.cookie = 'name=dmFsdWU%3D';
    const value = getCookieDecoded('name');
    (global as any).window = window;
    expect(value).toBe('value');
  });
  it("getCookie() should return cookie's value if found", () => {
    document.cookie = 'name=value';
    expect(getCookie('name')).toBe('value');
  });
  it('getCookie() should return undefined if cookie not found and no default value set', () => {
    expect(getCookie('name')).toBeUndefined();
  });
  it('getCookie() should return the default value if cookie not found', () => {
    expect(getCookie('name', 'defaultValue')).toBe('defaultValue');
  });
  it('getCookieDecoded() should return the default value if cookie not found', () => {
    expect(getCookieDecoded('name', 'defaultValue')).toBe('defaultValue');
  });
  it('deleteCookie() should delete cookie if found', () => {
    document.cookie = 'name=value';
    deleteCookie('name');
    expect(document.cookie).toBe('');
  });
  it('deleteAllCookies() should delete all visible cookies', () => {
    document.cookie = 'name=value';
    document.cookie = 'name1=value1';
    document.cookie = 'name2=value2';
    deleteAllCookies();
    expect(document.cookie).toBe('');
  });
  it('cookieExists() should return true if cookie exists', () => {
    document.cookie = 'name=value';
    document.cookie = 'name1=value1';
    expect(cookieExists('name')).toBe(true);
  });
  it('cookieExists() should return true if cookie exists', () => {
    document.cookie = 'name=value';
    document.cookie = 'name1=value1';
    expect(cookieExists('name1')).toBe(true);
  });
  it('cookieExists() should return false if cookie not exists', () => {
    document.cookie = 'name=value';
    document.cookie = 'name1=value1';
    expect(cookieExists('name2')).toBe(false);
  });
  it('cookieHasValue() should return true if cookie exists and has the given value', () => {
    document.cookie = 'name=value';
    document.cookie = 'name1=value1';
    expect(cookieHasValue('name', 'value')).toBe(true);
  });
  it('cookieHasValue() should return true if cookie exists and has the given value', () => {
    document.cookie = 'name=value';
    document.cookie = 'name1=value1';
    expect(cookieHasValue('name1', 'value1')).toBe(true);
  });
  it('cookieHasValue() should return false if cookie not exists', () => {
    document.cookie = 'name=value';
    document.cookie = 'name1=value1';
    expect(cookieHasValue('name2', 'value')).toBe(false);
  });
  it("cookieHasValue() should return false if don't has the given value", () => {
    document.cookie = 'name=value';
    document.cookie = 'name1=value1';
    expect(cookieHasValue('name', 'value1')).toBe(false);
  });
});
