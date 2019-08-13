import { JSDOM } from 'jsdom';

const dom = new JSDOM();
(global as any).document = dom.window.document;
(global as any).window = dom.window;
/* (global as any).btoa = (value: string) => Buffer.from(value).toString('base64');
(global as any).atob = (value: string) => Buffer.from(value, 'base64').toString(); */
