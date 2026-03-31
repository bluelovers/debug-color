"use strict";
/**
 * 工具函數模組
 * Utility functions module
 *
 * @module debug-color2/lib/util
 * @created 2018/6/29
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isForceColor = isForceColor;
exports.isSupportsColor = isSupportsColor;
exports.createFnChalkByConsole = createFnChalkByConsole;
exports.chalkByConsoleMaybe = chalkByConsoleMaybe;
exports.createChalkStyleLog = createChalkStyleLog;
exports.hasConsoleStream = hasConsoleStream;
exports.arrayIncludes = arrayIncludes;
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
    let forceColor = env && envBool(env.FORCE_COLOR, true);
    return forceColor;
}
/**
 * 檢查終端機是否支援顏色
 * Check if terminal supports colors
 *
 * @returns 顏色支援等級 / Color support level
 */
function isSupportsColor() {
    return chalk.supportsColor.level;
}
/**
 * 建立一個回調函數，可存取 Console 的 Chalk 實例
 * Create a callback function that can access Console's Chalk instance
 *
 * @param console - Console2 實例 / Console2 instance
 * @returns 回調函數 / Callback function
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
 * @param console - Console2 實例（可選）/ Console2 instance (optional)
 * @returns Chalk 實例 / Chalk instance
 */
function chalkByConsoleMaybe(console) {
    var _a;
    return (_a = console === null || console === void 0 ? void 0 : console.chalk) !== null && _a !== void 0 ? _a : chalk;
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
exports.default = exports;
//# sourceMappingURL=util.js.map