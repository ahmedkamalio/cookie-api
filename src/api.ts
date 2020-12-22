import { assertNameSet } from './utils/assert-name-set';
import { expires } from './utils/expires';
import { ICookieOptions } from './interfaces/cookie-options';
import { DEFAILT_COOKIE_OPTIONS } from './constants/default-options';

/**
 * Add a new cookie to the document only if no cookie exists with the same name.
 * @param name Cookie's name.
 * @param value Cookie value.
 * @param options Cookie options.
 */
export function addCookie(
  name: string,
  value: string,
  options: ICookieOptions = DEFAILT_COOKIE_OPTIONS
) {
  if (cookieExists(name)) {
    return;
  }
  setCookie(name, value, options);
}

/**
 * Set a new cookie to the document, this will override
 *              any existing cookie with the same name.
 * @param name Cookie's name.
 * @param value Cookie value.
 * @param options Cookie options.
 */
export function setCookie(
  name: string,
  value: string,
  options: ICookieOptions = DEFAILT_COOKIE_OPTIONS
) {
  assertNameSet(name);
  const { path, domain, expDate, maxAge, secure } = options;
  let cookie = `${name}=`;
  if (options.encode) {
    cookie += `${encodeURIComponent(Buffer.from(value).toString('base64'))};`;
  } else {
    cookie += `${encodeURIComponent(value)};`;
  }
  if (path) {
    cookie += `path=${path};`;
  }
  if (domain) {
    cookie += `domain=${domain};`;
  }
  const _expires = expires(expDate);
  if (_expires) {
    cookie += `expires=${_expires};`;
  }
  if (!!maxAge && maxAge > -1) {
    cookie += `max-age=${maxAge};`;
  }
  if (secure) {
    cookie += `secure`;
  }
  document.cookie = cookie;
}

/**
 * Get all visible cookies as `{ name: value }` pairs.
 */
export function getAllCookies(): { [key: string]: string } {
  const cookies: { [key: string]: string } = {};
  document.cookie
    .split(';')
    .map((pairs) => pairs.split('='))
    .forEach((pair) => {
      cookies[pair[0].trim()] = decodeURIComponent((pair[1] || '').replace(/%/g, '%25'));
    });
  Object.keys(cookies).forEach((cookie) => {
    if (!cookie) {
      delete cookies[cookie];
    }
  });
  return cookies;
}

/**
 * Get cookie's value by its name or return the default value.
 * @param name Cookie's name.
 * @param defaultValue Default value.
 */
export function getCookie(name: string, defaultValue?: string): string | undefined {
  return getAllCookies()[name] || defaultValue;
}

/**
 * Get cookie's decoded value by its name or return the default value.
 * @param name Cookie's name.
 * @param defaultValue Default value.
 */
export function getCookieDecoded(
  name: string,
  defaultValue?: string
): string | undefined {
  const value = getAllCookies()[name];
  if (!value) {
    return defaultValue;
  }
  return Buffer.from(value, 'base64').toString();
}

/**
 * Delete a cookie by its name.
 * @param name Cookie's name.
 */
export function deleteCookie(name: string) {
  setCookie(name, '', { expDate: 'Thu, 01 Jan 1970 00:00:01 GMT' });
}

/**
 * Delete all visible cookies.
 */
export function deleteAllCookies() {
  Object.keys(getAllCookies()).forEach(deleteCookie);
}

/**
 * Check if a cookie exists by its name.
 * @param name Cookie's name.
 */
export function cookieExists(name: string): boolean {
  return !!getAllCookies()[name];
}

/**
 * Check if a cookie exists by the given name and whether or not it has the given value.
 * @param name Cookie's name.
 * @param value Cookie value.
 */
export function cookieHasValue(name: string, value: string): boolean {
  return getAllCookies()[name] === value;
}
