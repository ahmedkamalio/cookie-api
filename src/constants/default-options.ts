import { ICookieOptions } from '../interfaces/cookie-options';

/**
 * The default values of the cookie's options.
 */
export const DEFAULT_COOKIE_OPTIONS: ICookieOptions = {
  path: '',
  domain: '',
  expDate: '',
  maxAge: -1,
  secure: false,
  encode: false,
};
