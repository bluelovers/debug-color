"use strict";
/**
 * 數值與常數模組
 * Values and constants module
 *
 * 定義 Symbols 和預設色彩配置
 * Define Symbols and default color configuration
 *
 * @module debug-color2/lib/val
 * @created 2018/6/26/026
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultColors = exports.SYM_THIS = exports.SYM_DATA = exports.SYM_EVENT = exports.SYM_CONSOLE = exports.SYM_CHALK = exports.SYM_DEBUG_CONSOLE = void 0;
const tslib_1 = require("tslib");
/**
 * 匯出所有類型定義
 * Export all type definitions
 */
tslib_1.__exportStar(require("./types"), exports);
/**
 * Debug Console Symbol
 * 用於儲存 Debug Console 實例 / Used to store Debug Console instance
 */
exports.SYM_DEBUG_CONSOLE = Symbol.for('DebugConsole');
/**
 * Chalk Symbol
 * 用於儲存 Chalk 實例 / Used to store Chalk instance
 */
exports.SYM_CHALK = Symbol.for('chalk');
/**
 * Console Symbol
 * 用於儲存 Console 實例 / Used to store Console instance
 */
exports.SYM_CONSOLE = Symbol.for('console');
/**
 * Event Symbol
 * 用於儲存事件資料 / Used to store event data
 */
exports.SYM_EVENT = Symbol.for('event');
/**
 * Data Symbol
 * 用於儲存選項資料 / Used to store options data
 */
exports.SYM_DATA = Symbol.for('data');
/**
 * This Symbol
 * 用於儲存 this 參考 / Used to store this reference
 */
exports.SYM_THIS = Symbol.for('console.this');
/**
 * 預設色彩配置
 * Default color configuration
 *
 * 定義各日誌類型的預設色彩
 * Define default colors for each log type
 */
exports.defaultColors = {
    error: 'red',
    exception: 'red',
    warn: 'red',
    fail: 'red',
    info: 'cyan',
    debug: 'cyan',
    success: 'green',
    ok: 'green',
};
exports.default = exports;
//# sourceMappingURL=val.js.map