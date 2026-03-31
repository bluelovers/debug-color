"use strict";
/**
 * 樣式模組
 * Styles module
 *
 * 定義 Chalk 樣式名稱和相關類型
 * Define Chalk style names and related types
 *
 * @module debug-color2/lib/styles
 * @created 2018/6/26/026
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.styleNamesWithoutFn = exports.styleNamesFn = exports.styleNames = void 0;
exports.getStyleNamesByChalk = getStyleNamesByChalk;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
/**
 * 匯出所有類型定義
 * Export all type definitions
 */
tslib_1.__exportStar(require("./types"), exports);
/**
 * 從 Chalk 實例取得樣式名稱列表
 * Get style names from Chalk instance
 *
 * @param chalk - Chalk 實例 / Chalk instance
 * @returns 樣式名稱陣列 / Array of style names
 */
function getStyleNamesByChalk(chalk) {
    const prototype = chalk.constructor.prototype;
    return Object
        .getOwnPropertyNames(prototype)
        .filter(v => v != 'constructor');
}
/**
 * 所有樣式名稱
 * All style names
 *
 * 從 Chalk Prototype 取得的樣式名稱列表
 * List of style names obtained from Chalk Prototype
 */
exports.styleNames = getStyleNamesByChalk(chalk_1.default);
/**
 * 函式型樣式名稱
 * Function-type style names
 *
 * 需要傳入參數的樣式（如顏色值）
 * Styles that require parameters (like color values)
 */
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
/**
 * 非函式型樣式名稱
 * Non-function-type style names
 *
 * 不需要傳入參數的樣式（如 bold, italic）
 * Styles that don't require parameters (like bold, italic)
 */
exports.styleNamesWithoutFn = exports.styleNames.filter(name => !exports.styleNamesFn.includes(name));
exports.default = exports;
//# sourceMappingURL=styles.js.map