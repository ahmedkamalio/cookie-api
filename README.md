![npm bundle size (version)](https://img.shields.io/bundlephobia/min/cookie-api/1.0.0?style=flat-square)
![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hw/cookie-api?style=flat-square)
![npm](https://img.shields.io/npm/dw/cookie-api?style=flat-square)

# Cookie API

A handy set of APIs to manage browser cookies.

## Why cookie-api

- You Can use it in [NodeJs](https://nodejs.org/en/) or any Browser.
- You don't have to worry about character encoding.
- dependency-free.
- JSON support out of the box.
- Base64 encoding/decoding out of the box.
- Pre-compressed version included.
- Tiny (2.8 kb UMD minified).
- Available through [NPM](https://www.npmjs.com/package/cookie-api) or [JsDelivr CDN](https://cdn.jsdelivr.net/npm/cookie-api/).
- Available as [API style](#api-style) and [Builder class style](#builder-style).
- Compatible with [Angular](https://github.com/angular/angular), [React](https://github.com/facebook/react) and [Vue](https://github.com/vuejs/vue).
- Strictly typed, build with the lovely [TypeScript](https://github.com/Microsoft/TypeScript) ❤️.

## API style

API is a set of functions for adding reading deleting cookies and so on.

## API functions

|     Function     |                                          Definition                                          |
| :--------------: | :------------------------------------------------------------------------------------------: |
|    addCookie     |        Add a new cookie to the document only if no cookie exists with the same name.         |
|    setCookie     | Set a new cookie to the document, this will override any existing cookie with the same name. |
|  getAllCookies   |                     Get all visible cookies as `{ name: value }` pairs.                      |
|    getCookie     |                 Get cookie's value by its name or return the default value.                  |
| getCookieDecoded |             Get cookie's decoded value by its name or return the default value.              |
|   deleteCookie   |                                 Delete a cookie by its name.                                 |
| deleteAllCookies |                                 Delete all visible cookies.                                  |
|   cookieExists   |                            Check if a cookie exists by its name.                             |
|  cookieHasValue  |    Check if a cookie exists by the given name and whether or not it has the given value.     |

## API usage example

Setting a cookie.

```javascript
import { setCookie, getAllCookies } from 'cookie-api';

setCookie('name', 'value');

console.log(getAllCookies()); // returns { name: "value" }
```

Setting a cookie with options.

```javascript
import { setCookie, getAllCookies } from 'cookie-api';

setCookie('name', 'value', { maxAge: 1000 * 60 * 60 * 24, secure: true });

console.log(getAllCookies()); // returns { name: "value" }
```

Setting a cookie with encoded value.

```javascript
import { setCookie, getCookie, getCookieDecoded } from 'cookie-api';

setCookie('name', 'value', { encode: true });

console.log(getCookie('name')); // returns "dmFsdWU%3D"
console.log(getCookieDecoded('name')); // returns "value"
```

Setting a cookie with JSON value.

```javascript
import { setCookie, getCookie } from 'cookie-api';

setCookie('name', { key: 'value' });

console.log(getCookie('name')); // returns '{ "key": "value" }'
```

Reading a cookie.

```javascript
import { getCookie } from 'cookie-api';

console.log(getCookie('name')); // returns the value of "name" or empty string
```

Reading a cookie with default value.

```javascript
import { getCookie } from 'cookie-api';

console.log(getCookie('name', 'defaultValue')); // returns the value of "name" or "defaultValue"
```

Deleting a cookie.

```javascript
import { deleteCookie } from 'cookie-api';

deleteCookie('name');
```

Deleting all visible cookies.

```javascript
import { deleteAllCookies } from 'cookie-api';

deleteAllCookies();
```

## Builder style

Cookie builder is a builder class that have the exact same functionality as [API style](#api-style) but in a fluent way.

## Builder class functions

|     Function      |                                     Definition                                      |
| :---------------: | :---------------------------------------------------------------------------------: |
|    static get     |            Creates new cookie builder class based on an existing cookie.            |
| static getDecoded | Creates new cookie builder class with an encoded value based on an existing cookie. |
|      setName      |                                 Set Cookie's name.                                  |
|      getName      |                                 Get Cookie's name.                                  |
|     setValue      |                                 Set cookie's value.                                 |
|     getValue      |             Get cookie's value if exists, otherwise the default value.              |
|      setPath      |                                 Set cookie's path.                                  |
|      getPath      |                                 Get cookie's path.                                  |
|     setDomain     |                                Set cookie's domain.                                 |
|     getDomain     |                                Get cookie's domain.                                 |
|    setExpDate     |                            Set cookie's expiration date.                            |
|    getExpDate     |                            Get cookie's expiration date.                            |
|     setMaxAge     |                                Set cookie's maxAge.                                 |
|     getMaxAge     |                                Get cookie's maxAge.                                 |
|     setSecure     |                              Set cookie's secure flag.                              |
|     isSecure      |                              Get cookie's secure flag.                              |
|     setEncode     |                             Set cookie's encode option.                             |
|     isEncoded     |                             Get cookie's encode option.                             |
|       save        |                          Save this cookie to the document.                          |

## Builder usage example

Setting a cookie.

```javascript
import { Cookie } from 'cookie-api';

new Cookie('name', 'value').save();

// or

new Cookie()
  .setName('name')
  .setValue('value')
  .save();

console.log(Cookie.get('name').getValue()); // returns "value"
```

Setting a cookie with options.

```javascript
import { Cookie } from 'cookie-api';

new Cookie('name', 'value', {
  path: '/',
  expDate: 'Tue, 13 Aug 2020 10:29:45 GMT'
}).save();

// or

new Cookie()
  .setName('name')
  .setValue('value')
  .setPath('/')
  .setExpDate('Tue, 13 Aug 2020 10:29:45 GMT')
  .save();

console.log(Cookie.get('name').getValue()); // returns "value"
```

Setting a cookie with encoded value.

```javascript
import { Cookie } from 'cookie-api';

new Cookie('name', 'value', { encode: true }).save();

// or

new Cookie()
  .setName('name')
  .setValue('value')
  .setEncode(true)
  .save();

console.log(Cookie.get('name').getValue()); // returns "value"
console.log(Cookie.getDecoded('name').getValue()); // returns "value"
```

Setting a cookie with JSON value.

```javascript
import { Cookie } from 'cookie-api';

new Cookie('name', { key: 'value' }).save();

// or

new Cookie()
  .setName('name')
  .setValue({ key: 'value' })
  .save();

console.log(Cookie.get('name').getValue()); // returns '{ "key": "value" }'
```

Reading a cookie.

```javascript
import { Cookie } from 'cookie-api';

console.log(Cookie.get('name').getValue()); // returns the value of "name" or empty string
```

Reading a cookie with default value.

```javascript
import { Cookie } from 'cookie-api';

console.log(Cookie.get('name', 'defaultValue').getValue()); // returns the value of "name" or "defaultValue"
```

## Note about the builder class

Using the builder class will not save any changes to the document untill you call the `save` function.

```javascript
import { Cookie } from 'cookie-api';

// name and value are saved in memory but takes no effect at the document.
const cookie = new Cookie().setName('name').setValue('value');

// you have to call save to actually save it.
cookie.save();
```

## Available options

Available cookie options for both API and Builder class.

|        Option         |        Type        | Default |
| :-------------------: | :----------------: | :-----: |
|         path          |      `string`      |  `''`   |
|        domain         |      `string`      |  `''`   |
| expDate (aka expires) | `string` or `Date` |  `''`   |
|        maxAge         |      `number`      |  `-1`   |
|        secure         |     `boolean`      | `false` |
|        encode         |     `boolean`      | `false` |

## Using the CDN version

You can import it directly in the browser by adding the script below in your web page.

```html
<script src="https://cdn.jsdelivr.net/npm/cookie-api@2.0.1/dist/umd/index.js"></script>
```

Both the API and the builder class are available under the `CookieAPI` namespace.

```html
<script src="https://cdn.jsdelivr.net/npm/cookie-api@2.0.1/dist/umd/index.js"></script>
<script>
  CookieAPI.setCookie('name', 'value');
  console.log(CookieAPI.getAllCookies()); // returns { name: "value" }
</script>
```

## Contributing

See [Contribution Guidelines](https://github.com/ahmedmkamal/cookie-api/blob/master/CONTRIBUTING.md)
