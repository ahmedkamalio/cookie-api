import { DEFAULT_COOKIE_OPTIONS } from './constants/default-options';
import { getCookie, getCookieDecoded, setCookie } from './api';
import { ICookieOptions } from './interfaces/cookie-options';

export class Cookie {
  private _name!: string;
  private _value!: string;
  private _path: string;
  private _domain: string;
  private _expDate: Date | string;
  private _maxAge: number;
  private _secure: boolean;
  private _encode: boolean;

  /**
   * Creates new cookie builder class.
   * @param name Cookie's name.
   * @param value Cookie's value.
   * @param options Cookie options.
   */
  constructor(
    name = '',
    value: unknown = '',
    options: ICookieOptions = DEFAULT_COOKIE_OPTIONS
  ) {
    this._name = name;
    this.setValue(value);
    this._path = options.path || '';
    this._domain = options.domain || '';
    this._expDate = options.expDate || '';
    this._maxAge = options.maxAge || -1;
    this._secure = options.secure || false;
    this._encode = options.encode || false;
  }

  /**
   * Creates new cookie builder class based on an existing cookie.
   * @param name Cookie's name.
   * @param defaultValue optional default value.
   * @returns Cookie class if a cookie with the given name exists, otherwise undefined.
   */
  static get(name: string, defaultValue?: string): Cookie | undefined {
    const value = getCookie(name);
    if (!value && !defaultValue) {
      return undefined;
    }
    return new Cookie(name, value ?? defaultValue);
  }

  /**
   * Creates new cookie builder class with an encoded value based on an existing cookie.
   * @param name Cookie's name.
   * @param defaultValue optional default value.
   * @returns Cookie class if a cookie with the given name exists, otherwise undefined.
   */
  static getDecoded(name: string, defaultValue?: string): Cookie | undefined {
    const value = getCookieDecoded(name);
    if (!value && !defaultValue) {
      return undefined;
    }
    return new Cookie(name, value ?? defaultValue);
  }

  /**
   * Set Cookie's name.
   * @param name Cookie's name.
   * @returns this Cookie builder.
   */
  setName(name: string): Cookie {
    this._name = name;
    return this;
  }

  /**
   * Get Cookie's name.
   */
  getName(): string {
    return this._name;
  }

  /**
   * Set cookie's value.
   * @param value Cookie's value.
   * @returns this Cookie builder.
   */
  setValue(value: unknown): Cookie {
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      this._value = value.toString();
      return this;
    }
    this._value = JSON.stringify(value);
    return this;
  }

  /**
   * Get cookie's value if exists, otherwise the default value.
   */
  getValue(): string {
    return this._value;
  }

  /**
   * Set cookie's path.
   * @param path Cookie's path.
   * @returns this Cookie builder.
   */
  setPath(path: string): Cookie {
    this._path = path;
    return this;
  }

  /**
   * Get cookie's path.
   */
  getPath(): string {
    return this._path;
  }

  /**
   * Set cookie's domain.
   * @param domain Cookie's domain.
   * @returns this Cookie builder.
   */
  setDomain(domain: string): Cookie {
    this._domain = domain;
    return this;
  }

  /**
   * Get cookie's domain.
   */
  getDomain(): string {
    return this._domain;
  }

  /**
   * Set cookie's expiration date.
   * @param expDate Cookie's expiration date.
   * @returns this Cookie builder.
   */
  setExpDate(expDate: Date | string): Cookie {
    this._expDate = expDate;
    return this;
  }

  /**
   * Get cookie's expiration date.
   */
  getExpDate(): Date | string {
    return this._expDate;
  }

  /**
   * Set cookie's maxAge.
   * @param maxAge Cookie's maxAge.
   * @returns this Cookie builder.
   */
  setMaxAge(maxAge: number): Cookie {
    this._maxAge = maxAge;
    return this;
  }

  /**
   * Get cookie's maxAge.
   */
  getMaxAge(): number {
    return this._maxAge;
  }

  /**
   * Set cookie's secure flag.
   * @param secure Cookie secure flag.
   * @returns this Cookie builder.
   */
  setSecure(secure: boolean): Cookie {
    this._secure = secure;
    return this;
  }

  /**
   * Get cookie's secure flag.
   */
  isSecure(): boolean {
    return this._secure;
  }

  /**
   * Set cookie's encode option.
   * @param encode Cookie encode option.
   * @returns this Cookie builder.
   */
  setEncode(encode: boolean): Cookie {
    this._encode = encode;
    return this;
  }

  /**
   * Get cookie's encode option.
   */
  isEncoded(): boolean {
    return this._encode;
  }

  /**
   * Save this cookie to the document.
   */
  save(): void {
    setCookie(this._name, this._value, {
      path: this._path,
      domain: this._domain,
      expDate: this._expDate,
      maxAge: this._maxAge,
      secure: this._secure,
      encode: this._encode,
    });
  }
}
