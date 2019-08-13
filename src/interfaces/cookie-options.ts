/**
 * @interface ICookieOptions
 * represents the cookie properties that client-side scripts are able to set.
 */
export interface ICookieOptions {
  path?: string;
  domain?: string;
  expDate?: Date | string;
  maxAge?: number;
  secure?: boolean;
  encode?: boolean;
}
