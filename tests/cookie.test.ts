import { Cookie } from '../src/cookie';
import { deleteAllCookies } from '../src/api';

describe('Cookie builder', () => {
  beforeEach(deleteAllCookies);
  it('Should add a new cookie to the document with the given name and value', () => {
    new Cookie('name', 'value').save();
    expect(document.cookie).toBe('name=value');
  });
  it('Should add a new cookie to the document with the default options', () => {
    new Cookie('name', 'value', {}).save();
    expect(document.cookie).toBe('name=value');
  });
  it('Should add a new cookie to the document with the given value', () => {
    new Cookie('name', { key: 'value' }).save();
    expect(decodeURIComponent(document.cookie)).toBe('name={"key":"value"}');
  });
  it('Should add a new cookie to the document with the given value', () => {
    new Cookie('name', [{ key: 'value' }]).save();
    expect(decodeURIComponent(document.cookie)).toBe('name=[{"key":"value"}]');
  });
  it('Should add a new cookie to the document with encoded value', () => {
    new Cookie('name', 'value', { encode: true }).save();
    expect(document.cookie).toBe('name=dmFsdWU%3D');
  });
  it('Should add a new cookie to the document with the given options', () => {
    new Cookie('name').setValue('value').save();
    expect(document.cookie).toBe('name=value');
  });
  it('Should add a new cookie to the document with the given options', () => {
    new Cookie('name', 'value').setPath('/').save();
    expect(document.cookie).toBe('name=value');
  });
  it('Should add a new cookie to the document with the given options', () => {
    new Cookie('name', 'value').setExpDate('Tue, 13 Aug 2119 10:29:45 GMT').save();
    expect(document.cookie).toBe('name=value');
  });
  it('Should add a new cookie to the document with the given options', () => {
    new Cookie('name', 'value').setMaxAge(1000 * 60 * 60 * 24).save();
    expect(document.cookie).toBe('name=value');
  });
  it('Should have no effect at the document when save() not called', () => {
    new Cookie().setName('name');
    expect(document.cookie).toBe('');
  });
  it('Should return the cookie name when call getName()', () => {
    const cookie = new Cookie('name');
    expect(cookie.getName()).toBe('name');
  });
  it('Should return empty string when call getName() and the name was not set', () => {
    const cookie = new Cookie();
    expect(cookie.getName()).toBe('');
  });
  it('Should return the cookie value when call getValue()', () => {
    const cookie = new Cookie('name', 'value');
    expect(cookie.getValue()).toBe('value');
  });
  it('Should return empty string when call getValue() and the value was not set', () => {
    const cookie = new Cookie();
    expect(cookie.getValue()).toBe('');
  });
  it('Should return the cookie path when call getPath()', () => {
    const cookie = new Cookie().setPath('/');
    expect(cookie.getPath()).toBe('/');
  });
  it('Should return empty string when call getPath() and the path was not set', () => {
    const cookie = new Cookie();
    expect(cookie.getPath()).toBe('');
  });
  it('Should return the cookie domain when call getDomain()', () => {
    const cookie = new Cookie().setDomain('example.com');
    expect(cookie.getDomain()).toBe('example.com');
  });
  it('Should return empty string when call getDomain() and the domain was not set', () => {
    const cookie = new Cookie();
    expect(cookie.getDomain()).toBe('');
  });
  it('Should return the cookie expiration date when call getExpDate()', () => {
    const cookie = new Cookie().setExpDate('Tue, 13 Aug 2119 10:29:45 GMT');
    expect(cookie.getExpDate()).toBe('Tue, 13 Aug 2119 10:29:45 GMT');
  });
  it('Should return empty string when call getExpDate() and the expiration date was not set', () => {
    const cookie = new Cookie();
    expect(cookie.getExpDate()).toBe('');
  });
  it('Should return the cookie max-age when call getMaxAge()', () => {
    const cookie = new Cookie().setMaxAge(1000 * 60 * 60 * 24);
    expect(cookie.getMaxAge()).toBe(1000 * 60 * 60 * 24);
  });
  it('Should return -1 when call getMaxAge() and the max-age was not set', () => {
    const cookie = new Cookie();
    expect(cookie.getMaxAge()).toBe(-1);
  });
  it('Should return true when call isSecure()', () => {
    const cookie = new Cookie().setSecure(true);
    expect(cookie.isSecure()).toBe(true);
  });
  it('Should return false when call isSecure() and the secure flag was not set', () => {
    const cookie = new Cookie();
    expect(cookie.isSecure()).toBe(false);
  });
  it('Should return true when call isEncoded()', () => {
    const cookie = new Cookie().setEncode(true);
    expect(cookie.isEncoded()).toBe(true);
  });
  it('Should return false when call isEncoded() and the encode option was not set', () => {
    const cookie = new Cookie();
    expect(cookie.isEncoded()).toBe(false);
  });
  it('Should return cookie builder class when call get() and the cookie exists', () => {
    document.cookie = 'name=value';
    const cookie = Cookie.get('name');
    expect((cookie as Cookie).getValue()).toBe('value');
  });
  it('Should return cookie builder class with decoded value when call getDecoded() and the cookie exists', () => {
    document.cookie = 'name=dmFsdWU%3D';
    const cookie = Cookie.getDecoded('name');
    expect((cookie as Cookie).getValue()).toBe('value');
  });
  it('Should return cookie builder class when call get() and the cookie exists', () => {
    document.cookie = 'name=value';
    document.cookie = 'name1=value1';
    const cookie = Cookie.get('name1');
    expect((cookie as Cookie).getValue()).toBe('value1');
  });
  it('Should return undefined when call get() and the cookie was not exists', () => {
    const cookie = Cookie.get('name');
    expect(cookie).toBeUndefined();
  });
  it('Should return undefined when call getDecoded() and the cookie was not exists', () => {
    const cookie = Cookie.getDecoded('name');
    expect(cookie).toBeUndefined();
  });
  it('Should return default value when call get() and the cookie was not exists but default value set', () => {
    const cookie = Cookie.get('name', 'default value');
    expect((cookie as Cookie).getValue()).toBe('default value');
  });
  it('Should return default value when call getDecoded() and the cookie was not exists but default value set', () => {
    const cookie = Cookie.getDecoded('name', 'default value');
    expect((cookie as Cookie).getValue()).toBe('default value');
  });
});
