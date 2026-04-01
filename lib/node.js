"use strict";
/**
 * Console2 核心模組
 * Console2 core module
 *
 * 彩色化 Console 輸出的主要類別實現
 * Main class implementation for colorized console output
 *
 * @module debug-color2/lib/node
 * @created 2018/7/2
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Console2 = void 0;
const tslib_1 = require("tslib");
/// <reference types="node" />
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const util_1 = require("util");
const chk_1 = tslib_1.__importDefault(require("./chk"));
const fill_property_1 = require("./fill-property");
const styles_1 = require("./styles");
const val_1 = require("./val");
const util_2 = require("./util");
const bindBaseMethods_1 = require("./util/bindBaseMethods");
const _logArgv_1 = require("./console/_logArgv");
const _time_1 = require("./console/_time");
const _logFormat_1 = require("./console/_logFormat");
const _labelFormat_1 = require("./console/_labelFormat");
const _log_1 = require("./console/_log");
const _get_enabled_1 = require("./console/_get_enabled");
tslib_1.__exportStar(require("./types"), exports);
/**
 * Console2 類別 - 彩色化 Console 輸出
 * Console2 class - Colorized console output
 *
 * @class Console2
 */
class Console2 {
    /**
     * 建構函式
     * Constructor
     *
     * @param target - 目標 Console 實例，預設為全域 console / Target Console instance, defaults to global console
     * @param options - 選項設定 / Options configuration
     */
    constructor(target = console, options) {
        var _a;
        this[val_1.SYM_CONSOLE] = target || console;
        if (options === null || options === void 0 ? void 0 : options.chalkOptions) {
            this[val_1.SYM_CHALK] = chalk_1.default.constructor(options.chalkOptions);
        }
        else {
            this[val_1.SYM_CHALK] = chalk_1.default.constructor();
        }
        // @ts-ignore
        this[val_1.SYM_DATA] = Object.create({
            colors: Object.create(val_1.defaultColors),
            // @ts-ignore
        });
        // @ts-ignore
        this[val_1.SYM_DATA].stream = null;
        if (this[val_1.SYM_CONSOLE] instanceof Console2) {
            let target = this[val_1.SYM_CONSOLE].getStream();
            if (target) {
                // @ts-ignore
                this[val_1.SYM_DATA].stream = (0, util_2.hasConsoleStream)(target);
            }
            else {
                // @ts-ignore
                this[val_1.SYM_DATA].stream = false;
            }
        }
        else {
            // @ts-ignore
            this[val_1.SYM_DATA].stream = (0, util_2.hasConsoleStream)(this[val_1.SYM_CONSOLE]);
        }
        Object.assign(this[val_1.SYM_DATA], options || {});
        this[val_1.SYM_DATA].chalkOptions = this[val_1.SYM_DATA].chalkOptions || {};
        if (this[val_1.SYM_DATA].chalkOptions.enabled) {
            this[val_1.SYM_CHALK].enabled = true;
        }
        else if (this[val_1.SYM_CHALK].enabled && !(0, chk_1.default)()) {
            this[val_1.SYM_CHALK].enabled = false;
        }
        else if (!this[val_1.SYM_CHALK].enabled && (0, util_2.isForceColor)()) {
            this[val_1.SYM_CHALK].enabled = true;
        }
        if (((_a = this[val_1.SYM_DATA].inspectOptions) === null || _a === void 0 ? void 0 : _a.depth) < 0) {
            this[val_1.SYM_DATA].inspectOptions.depth = null;
        }
        (0, bindBaseMethods_1.bindBaseMethods)(this);
    }
    /**
     * 取得 stdout 串流
     * Get stdout stream
     */
    get _stdout() {
        return this.getStream()._stdout;
    }
    /**
     * 取得 stderr 串流
     * Get stderr stream
     */
    get _stderr() {
        return this.getStream()._stderr;
    }
    /**
     * 取得串流資訊
     * Get stream information
     * @returns 包含 stdout 和 stderr 的物件 / Object containing stdout and stderr
     */
    getStream() {
        if (this[val_1.SYM_DATA].stream) {
            let _stdout;
            let _stderr;
            if (this[val_1.SYM_CONSOLE] instanceof Console2) {
                return this[val_1.SYM_CONSOLE].getStream();
            }
            else {
                // @ts-ignore
                ({ _stdout, _stderr } = this[val_1.SYM_CONSOLE]);
            }
            return {
                _stdout,
                _stderr,
            };
        }
        return null;
    }
    /**
     * 取得 Chalk 實例
     * Get Chalk instance
     *
     * 回傳儲存的 Chalk 實例，用於色彩樣式處理
     * Returns the stored Chalk instance for color style handling
     *
     * @example
     * ```typescript
     * const logger = new Console2();
     * // 使用 Chalk 實例進行色彩處理
     * logger.chalk.red('紅色');
     * logger.chalk.blue('藍色');
     * logger.chalk.bold.underline('粗體底線');
     * ```
     */
    get chalk() {
        return this[val_1.SYM_CHALK];
    }
    /**
     * 設定 Chalk 實例
     * Set Chalk instance
     *
     * 用於替換或更新 Chalk 實例
     * Used to replace or update the Chalk instance
     *
     * @param value - 新的 Chalk 實例 / New Chalk instance
     *
     * @example
     * ```typescript
     * import chalk from 'chalk';
     * const customChalk = chalk.constructor({ level: 2 });
     * const logger = new Console2();
     * logger.chalk = customChalk;
     * ```
     */
    set chalk(value) {
        this[val_1.SYM_CHALK] = value;
    }
    /**
     * 取得目前色彩等級
     * Get current color level
     *
     * Chalk 的色彩等級：0 = 關閉, 1 = 基本, 2 = 256色, 3 = 真彩色
     * Chalk color level: 0 = off, 1 = basic, 2 = 256 colors, 3 = truecolor
     *
     * @returns 色彩等級 (0-3) / Color level (0-3)
     *
     * @example
     * ```typescript
     * const logger = new Console2();
     * console.log(logger.levelColor); // 預設取決於終端機能力
     * logger.levelColor = 2;          // 設定為 256 色模式
     * ```
     */
    get levelColor() {
        return this[val_1.SYM_CHALK].level;
    }
    /**
     * 設定色彩等級
     * Set color level
     *
     * 設定 Chalk 的色彩輸出等級
     * Sets the Chalk color output level
     *
     * @param value - 色彩等級 (0-3) / Color level (0-3)
     *
     * @example
     * ```typescript
     * const logger = new Console2();
     * logger.levelColor = 0; // 關閉色彩
     * logger.levelColor = 1; // 基本色彩 (8 種)
     * logger.levelColor = 2; // 256 色
     * logger.levelColor = 3; // 真彩色 (1677 萬色)
     * ```
     */
    set levelColor(value) {
        this[val_1.SYM_CHALK].level = value;
    }
    /**
     * 取得色彩啟用狀態
     * Get color enabled status
     */
    get enabledColor() {
        return this[val_1.SYM_CHALK].enabled;
    }
    /**
     * 設定色彩啟用狀態
     * Set color enabled status
     */
    set enabledColor(value) {
        this[val_1.SYM_CHALK].enabled = value !== null && value !== void 0 ? value : false;
    }
    /**
     * 取得 Chalk 選項
     * Get Chalk options
     *
     * 回傳 Chalk 的配置選項
     * Returns Chalk configuration options
     *
     * @returns Chalk 選項物件 / Chalk options object
     *
     * @example
     * ```typescript
     * const logger = new Console2(console, { chalkOptions: { level: 2 } });
     * console.log(logger.chalkOptions); // { level: 2 }
     * ```
     */
    get chalkOptions() {
        return this[val_1.SYM_DATA].chalkOptions;
    }
    /**
     * 設定 Chalk 選項
     * Set Chalk options
     *
     * 用於更新 Chalk 的配置選項
     * Used to update Chalk configuration options
     *
     * @param value - Chalk 選項物件 / Chalk options object
     *
     * @example
     * ```typescript
     * const logger = new Console2();
     * logger.chalkOptions = { level: 2, enabled: true };
     * ```
     */
    set chalkOptions(value) {
        this[val_1.SYM_DATA].chalkOptions = value;
    }
    /**
     * 取得檢視選項
     * Get inspect options
     *
     * 回傳 util.inspect 的配置選項
     * Returns util.inspect configuration options
     *
     * @returns 檢視選項物件 / Inspect options object
     *
     * @example
     * ```typescript
     * const logger = new Console2(console, {
     *     inspectOptions: { colors: true, depth: 4 }
     * });
     * console.log(logger.inspectOptions); // { colors: true, depth: 4 }
     * ```
     */
    get inspectOptions() {
        return this[val_1.SYM_DATA].inspectOptions;
    }
    /**
     * 設定檢視選項
     * Set inspect options
     *
     * 用於更新 util.inspect 的配置選項
     * Used to update util.inspect configuration options
     *
     * @param value - 檢視選項物件 / Inspect options object
     *
     * @example
     * ```typescript
     * const logger = new Console2();
     * logger.inspectOptions = { colors: true, depth: null };
     * ```
     */
    set inspectOptions(value) {
        this[val_1.SYM_DATA].inspectOptions = value;
    }
    /**
     * 設定檢視選項
     * Set inspect options
     *
     * @param value - 檢視選項物件 / Inspect options object
     */
    setInspectOptions(value) {
        this[val_1.SYM_DATA].inspectOptions = Object.assign(this[val_1.SYM_DATA].inspectOptions || {}, value);
    }
    /**
     * 取得 debug 啟用狀態
     * Get debug enabled status
     *
     * 控制是否輸出日誌訊息
     * Controls whether to output log messages
     *
     * @returns 是否啟用 / Whether enabled
     *
     * @example
     * ```typescript
     * const logger = new Console2(console, { enabled: true });
     * console.log(logger.enabled); // true
     * ```
     */
    get enabled() {
        return (0, _get_enabled_1._get_enabled)(this[val_1.SYM_DATA].enabled);
    }
    /**
     * 設定 debug 啟用狀態
     * Set debug enabled status
     *
     * 設定是否輸出日誌訊息
     * Sets whether to output log messages
     *
     * @param value - 啟用狀態 / Enabled status
     *
     * @example
     * ```typescript
     * const logger = new Console2(console);
     * logger.enabled = false;  // 停用日誌輸出
     * logger.log('這不會輸出'); // 無輸出
     * logger.enabled = true;  // 啟用日誌輸出
     * logger.log('這會輸出');  // 正常輸出
     * ```
     */
    set enabled(value) {
        this[val_1.SYM_DATA].enabled = (0, _get_enabled_1._set_enabled)(value !== null && value !== void 0 ? value : false);
    }
    /**
     * 設定選項
     * Set options
     *
     * 合併新選項到現有配置中
     * Merge new options into existing configuration
     *
     * @param options - 選項物件 / Options object
     * @returns this 實例 / this instance
     *
     * @example
     * ```typescript
     * const logger = new Console2(console, { enabled: true });
     * logger.setOptions({ label: true, time: true });
     * // 現在 logger 會顯示標籤和時間
     * ```
     */
    setOptions(options) {
        Object.assign(this[val_1.SYM_DATA], options);
        return this;
    }
    /**
     * 建立具有新選項的複製品
     * Create a copy with new options
     *
     * 建立新的 Console2 實例，複製現有配置並合併新選項
     * Creates a new Console2 instance, copies existing config and merges new options
     *
     * @param options - 新選項物件 / New options object
     * @returns 新的 Console2 實例 / New Console2 instance
     *
     * @example
     * ```typescript
     * const logger = new Console2(console, { enabled: true });
     * const childLogger = logger.withOptions({ label: true, time: true });
     *
     * // parent 保持不變
     * console.log(logger.enabled);   // true
     * console.log(logger.label);     // undefined
     *
     * // child 有新的選項
     * console.log(childLogger.enabled); // true (繼承)
     * console.log(childLogger.label);  // true (新設定)
     * ```
     */
    withOptions(options) {
        let o = this._clone();
        o[val_1.SYM_CHALK] = this[val_1.SYM_CHALK];
        o[val_1.SYM_DATA] = Object.assign({}, this[val_1.SYM_DATA], options);
        return o;
    }
    /**
     * 建立 Console2 的淺層複製品
     * Create a shallow copy of Console2
     *
     * 內部方法，用於建立具有相同配置的新實例
     * Internal method for creating new instance with same configuration
     *
     * @returns 新的 Console2 實例 / New Console2 instance
     *
     * @example
     * ```typescript
     * const logger = new Console2(console, { enabled: true });
     * const clone = logger._clone();
     * // clone 是一個新的可呼叫 Console2 實例
     * clone('hello'); // 輸出訊息
     * ```
     */
    _clone() {
        const self = this;
        let o = function Console2Method(...argv) {
            // @ts-ignore
            return o.log(...argv);
        };
        /**
         * allow hacking parent object
         */
        // @ts-ignore
        //o.__proto__ = this.__proto__.constructor.prototype;
        o.__proto__ = this;
        //o = o.bind(o);
        o[val_1.SYM_CONSOLE] = self[val_1.SYM_CONSOLE];
        o[val_1.SYM_DATA] = self[val_1.SYM_DATA];
        // @ts-ignore
        (0, bindBaseMethods_1.bindBaseMethods)(o);
        // @ts-ignore
        return o;
    }
    /**
     * 取得指定名稱的 Chalk 樣式屬性
     * Get Chalk style property by name
     *
     * @param name - Chalk 樣式名稱 / Chalk style name
     * @returns 新的 Console2 實例 / New Console2 instance
     */
    _chalkStyleProp(name) {
        let o = this._clone();
        o[val_1.SYM_CHALK] = this[val_1.SYM_CHALK][name];
        return o;
    }
    /**
     * 格式化日誌訊息
     * Format log message
     *
     * @param format - 格式化字串 / Format string
     * @param args - 格式化參數 / Format arguments
     * @returns 格式化後的字串 / Formatted string
     */
    _logFormat(format, ...args) {
        return (0, _logFormat_1._logFormat)(format, ...args);
    }
    /**
     * 輸出成功訊息（綠色）
     * Output success message (green)
     *
     * @param argv - 訊息參數 / Message arguments
     */
    success(...argv) {
        return this._log('success', argv);
    }
    /**
     * 輸出確定訊息（淺綠色）
     * Output OK message (light green)
     *
     * @param argv - 訊息參數 / Message arguments
     */
    ok(...argv) {
        return this._log('ok', argv);
    }
    /**
     * 輸出失敗訊息（紅色）
     * Output fail message (red)
     *
     * @param argv - 訊息參數 / Message arguments
     */
    fail(...argv) {
        return this._log('fail', argv, 'error');
    }
    /**
     * 格式化標籤
     * Format label
     *
     * @param data - 標籤資料 / Label data
     * @returns 格式化後的標籤 / Formatted label
     */
    _labelFormat(data) {
        return _labelFormat_1._labelFormat.call(this, data);
    }
    /**
     * 格式化錯誤參數
     * Format error arguments
     *
     * @param argv - 參數陣列 / Arguments array
     * @param name - 方法名稱 / Method name
     * @param failBack - 備用方法名稱 / Fallback method name
     * @returns 處理後的參數 / Processed arguments
     */
    _logErrorArgv(argv, name = 'error', failBack = 'error') {
        return _logArgv_1._logErrorArgv.call(this, argv, name, failBack);
    }
    /**
     * 格式化日誌參數
     * Format log arguments
     *
     * @param argv - 參數陣列 / Arguments array
     * @param name - 方法名稱 / Method name
     * @param failBack - 備用方法名稱 / Fallback method name
     * @returns 處理後的參數 / Processed arguments
     */
    _logArgv(argv, name = 'log', failBack = 'log') {
        return _logArgv_1._logArgv.call(this, argv, name, failBack);
    }
    /**
     * 執行日誌輸出
     * Execute log output
     *
     * @param name - 日誌類型名稱 / Log type name
     * @param argv - 參數陣列 / Arguments array
     * @param failBack - 備用方法名稱 / Fallback method name
     * @returns 日誌輸出結果 / Log output result
     */
    _log(name, argv, failBack = 'log') {
        return _log_1._log.call(this, name, argv, failBack);
    }
    /**
     * 執行錯誤日誌輸出
     * Execute error log output
     *
     * @param name - 日誌類型名稱 / Log type name
     * @param argv - 參數陣列 / Arguments array
     * @param failBack - 備用方法名稱 / Fallback method name
     * @returns 錯誤日誌輸出結果 / Error log output result
     */
    _logError(name, argv, failBack = 'error') {
        return this._log(name, argv, failBack);
    }
    /**
     * 建立 Chalk 樣式方法
     * Create Chalk style method
     *
     * @param name - Chalk 樣式名稱 / Chalk style name
     * @returns 包裝後的函式 / Wrapped function
     */
    _chalkStyleMethod(name) {
        return function chalkStyleMethod(...argv) {
            let o = this._clone();
            o[val_1.SYM_CHALK] = this[val_1.SYM_CHALK][name](...argv);
            return o;
        };
    }
    /**
     * 格式化時間標籤
     * Format time label
     *
     * @param data - 時間資料 / Time data
     * @returns 格式化後的時間標籤 / Formatted time label
     */
    _time(data) {
        return _time_1._time.call(this, data);
    }
}
exports.Console2 = Console2;
/**
 * 讓 Console2 繼承 Function 以支援可呼叫功能
 * Make Console2 inherit from Function to support callable functionality
 */
(0, util_1.inherits)(Console2, Function);
/**
 * 將 Console2 類別指派給原型屬性以便於型別檢查
 * Assign Console2 class to prototype property for type checking convenience
 */
// @ts-ignore
Console2.prototype.Console = Console2;
/**
 * 為每個樣式名稱建立 getter
 * Create getters for each style name
 *
 * 根據樣式類型建立對應的屬性或方法
 * Create corresponding property or method based on style type
 */
styles_1.styleNames.forEach(function (name) {
    if (styles_1.styleNamesFn.includes(name)) {
        Object.defineProperty(Console2.prototype, name, {
            get() {
                return this._chalkStyleMethod(name);
            },
        });
    }
    else {
        Object.defineProperty(Console2.prototype, name, {
            get() {
                return this._chalkStyleProp(name);
            },
        });
    }
});
/**
 * 為每個標準 Console 方法建立包裝函式
 * Create wrapper functions for each standard Console method
 *
 * 根據方法類型應用不同的色彩樣式處理
 * Apply different color style handling based on method type
 */
fill_property_1.methods.forEach(function (name) {
    if (name == 'dir') {
        Console2.prototype[name] = function chalkStyleLogOthers(object, options) {
            if (!this.enabled) {
                return;
            }
            let enabledColor = this.enabledColor;
            if (!options && this[val_1.SYM_DATA].inspectOptions) {
                options = this[val_1.SYM_DATA].inspectOptions;
            }
            if (options) {
                if (enabledColor && options.colors == null) {
                    options = {
                        ...options,
                        colors: enabledColor
                    };
                }
                return this[val_1.SYM_CONSOLE][name](object, options);
            }
            return this[val_1.SYM_CONSOLE][name](object, {
                colors: enabledColor,
            });
        };
    }
    else if (name == 'assert') {
        Console2.prototype[name] = function chalkStyleLogAssert(value, ...argv) {
            if (!this.enabled) {
                return;
            }
            if (!value) {
                let o;
                if (argv.length) {
                    // @ts-ignore
                    let s = this._logFormat(...argv);
                    o = this[val_1.SYM_CHALK](s);
                }
                return this[val_1.SYM_CONSOLE][name](value, o);
            }
        };
    }
    else if ((0, util_2.arrayIncludes)(fill_property_1.methods_stdout, name)) {
        Console2.prototype[name] = function chalkStyleLogStdout(...argv) {
            var _a;
            // @ts-ignore
            return ((_a = this._log) !== null && _a !== void 0 ? _a : Console2.prototype._log).call(this, name, argv);
        };
    }
    else if ((0, util_2.arrayIncludes)(fill_property_1.methods_stderr, name)) {
        Console2.prototype[name] = function chalkStyleLogStderr(...argv) {
            var _a;
            // @ts-ignore
            return ((_a = this._logError) !== null && _a !== void 0 ? _a : Console2.prototype._logError).call(this, name, argv, 'error');
        };
    }
    else {
        Console2.prototype[name] = function chalkStyleLogOthers(...argv) {
            if (!this.enabled) {
                return;
            }
            return this[val_1.SYM_CONSOLE][name](...argv);
        };
    }
});
exports.default = Console2;
//# sourceMappingURL=node.js.map