"use strict";
/**
 * Created by user on 2018/6/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
exports.chalk = chalk_1.default;
const prototype = chalk_1.default.constructor.prototype;
exports.styleNames = Object
    .getOwnPropertyNames(prototype)
    .filter(v => v != 'constructor');
exports.styleNamesFn = [
    'rgb',
    'hsl',
    'hsv',
    'hwb',
    'bgHex',
    'bgKeyword',
    'bgRgb',
    'bgHsl',
    'bgHsv',
    'bgHwb',
    'hex',
    'keyword',
];
const styles = require("./styles");
exports.default = styles;
