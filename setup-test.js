global.jQuery = require('jquery');
global.$ = global.jQuery;

require('jest-fetch-mock').enableMocks();
fetchMock.dontMock();


// import {JSDOM} from 'jsdom';
// const dom = new JSDOM();
// global.document = dom.window.document;
// global.window = dom.window;
