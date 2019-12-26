const isClient = typeof window !== "undefined" ? true : false;

const functional = require('fxjs/Strict');
const lazyFunctional = require('fxjs/Lazy');
const concurrencyFunctional = require("fxjs/Concurrency");
Object.assign(!!isClient ? window : global, functional, { L: lazyFunctional, C: concurrencyFunctional });

const common = require('./common');
Object.assign(!!isClient ? window : global, common);