"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isForceColor = isForceColor;
exports.isSupportsColor = isSupportsColor;
exports.createFnChalkByConsole = createFnChalkByConsole;
exports.chalkByConsoleMaybe = chalkByConsoleMaybe;
exports.createChalkStyleLog = createChalkStyleLog;
exports.hasConsoleStream = hasConsoleStream;
exports.arrayIncludes = arrayIncludes;
const tslib_1 = require("tslib");
/**
 * 工具函數模組
 * Utility functions module
 *
 * @module debug-color2/lib/util
 * @created 2018/6/29
 */
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const env_bool_1 = require("env-bool");
/**
 * 檢查是否強制啟用顏色輸出
 * Check if color output should be forced
 *
 * @param env - 環境變數物件 / Environment variables object
 * @returns 強制顏色等級 / Force color level
 */
function isForceColor(env) {
    if (typeof env === 'undefined' && process) {
        env = process.env;
    }
    let forceColor = env && (0, env_bool_1.envBool)(env.FORCE_COLOR, true);
    return forceColor;
}
/**
 * 檢查終端機是否支援顏色
 * Check if terminal supports colors
 *
 * @returns 顏色支援等級 / Color support level
 */
function isSupportsColor() {
    return chalk_1.default.supportsColor.level;
}
/**
 * 建立一個回調函數，可存取 Console 的 Chalk 實例
 * Create a callback function that can access Console's Chalk instance
 *
 * 此函數返回一个高階函數，用於在回調中存取 Console2 實例的 Chalk 實例
 * This function returns a higher-order function to access the Chalk instance of Console2 in a callback
 *
 * @param console - Console2 實例 / Console2 instance
 * @returns 回調函數 / Callback function
 *
 * @example
 * ```typescript
 * import { createFnChalkByConsole } from 'debug-color2/lib/util';
 * import { Console2 } from 'debug-color2/lib/node';
 *
 * const console2 = new Console2();
 * const chalkFn = createFnChalkByConsole(console2);
 *
 * // 在回調中存取 chalk 和 console2
 * const result = chalkFn((chalk, _console) => {
 *     return chalk.red('Hello World');
 * });
 * ```
 */
function createFnChalkByConsole(console) {
    return function chalkByConsole(cb, 
    // @ts-ignore
    _console = console) {
        return cb(_console.chalk, _console);
    };
}
/**
 * 取得 Chalk 實例，若無 Console2 實例則回退到預設 chalk
 * Get Chalk instance, fallback to default chalk if no Console2 instance
 *
 * 此函數提供了一個安全取得 Chalk 實例的方式，若傳入的 Console2 實例不存在 Chalk，則使用預設的 chalk
 * This function provides a safe way to get a Chalk instance, using default chalk if the passed Console2 doesn't have one
 *
 * @param console - Console2 實例（可選）/ Console2 instance (optional)
 * @returns Chalk 實例 / Chalk instance
 *
 * @example
 * ```typescript
 * import { chalkByConsoleMaybe } from 'debug-color2/lib/util';
 * import { Console2 } from 'debug-color2/lib/node';
 *
 * // 有 Console2 實例的情況
 * const console2 = new Console2();
 * const chalk1 = chalkByConsoleMaybe(console2); // 使用 console2.chalk
 *
 * // 沒有 Console2 實例的情況
 * const chalk2 = chalkByConsoleMaybe(); // 使用預設的 chalk
 * ```
 */
function chalkByConsoleMaybe(console) {
    var _a;
    return (_a = console === null || console === void 0 ? void 0 : console.chalk) !== null && _a !== void 0 ? _a : chalk_1.default;
}
/**
 * 建立一個具有 Chalk 風格的日誌函數
 * Create a Chalk-styled log function
 *
 * @param console - Console2 實例 / Console2 instance
 * @param name - 方法名稱 / Method name
 * @param failBack - 失敗時回退的方法名稱 / Fallback method name
 * @returns 風格化日誌函數 / Styled log function
 */
function createChalkStyleLog(console, name, failBack = 'log') {
    if (!name || typeof name !== 'string' || name in console) {
        throw TypeError(`name is not allow in target console`);
    }
    if (!failBack || typeof failBack !== 'string' || failBack in console) {
        throw TypeError(`failBack is not allow in target console`);
    }
    // @ts-ignore
    if (typeof console._log !== 'function') {
        throw TypeError(`input console not a Console2 like object`);
    }
    return function chalkStyleLog(...argv) {
        // @ts-ignore
        return console._log(name, argv, failBack);
    };
}
/**
 * 檢查目標物件是否具有 Console 串流（_stdout, _stderr）
 * Check if target object has Console streams (_stdout, _stderr)
 *
 * @param target - 目標物件 / Target object
 * @returns 是否具有串流 / Whether has streams
 */
function hasConsoleStream(target) {
    return !!(target._stdout && target._stderr);
}
/**
 * 檢查陣列是否包含指定值
 * Check if array contains specified value
 *
 * @param arr - 陣列 / Array
 * @param value - 要檢查的值 / Value to check
 * @returns 是否包含 / Whether contains
 */
function arrayIncludes(arr, value) {
    return arr.includes(value);
}
//# sourceMappingURL=util.js.map