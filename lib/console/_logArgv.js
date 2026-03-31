"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._logErrorArgv = _logErrorArgv;
exports._logArgv = _logArgv;
const tslib_1 = require("tslib");
const val_1 = require("../val");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const _time_1 = require("./_time");
const _logFormat_1 = require("./_logFormat");
const _labelFormat_1 = require("./_labelFormat");
const processPlatform_1 = require("../util/processPlatform");
/**
 * 格式化錯誤參數
 * Format error arguments
 *
 * 錯誤專用的參數處理，實際處理邏輯委託給 _logArgv
 * Error-specific argument processing, actual logic delegated to _logArgv
 *
 * @param this - Console2 實例 / Console2 instance
 * @param argv - 參數陣列 / Arguments array
 * @param name - 方法名稱 / Method name
 * @param failBack - 備用方法名稱 / Fallback method name
 * @returns 處理後的參數 / Processed arguments
 */
function _logErrorArgv(argv, name = 'error', failBack = 'error') {
    var _a;
    return ((_a = this._logArgv) !== null && _a !== void 0 ? _a : _logArgv).call(this, argv, name, failBack);
}
/**
 * 格式化日誌參數
 * Format log arguments
 *
 * 處理時間戳、標籤、色彩等格式化
 * Handle timestamp, label, color and other formatting
 *
 * 處理流程：
 * 1. 使用 util.format 格式化輸入參數
 * 2. 套用 Chalk 樣式
 * 3. 根據設定加入時間戳和標籤
 * 4. 套用自定義顏色（若有的話）
 * 5. Windows 平台的特殊修復
 * 6. 回傳處理後的參數和目標方法名稱
 *
 * Processing flow:
 * 1. Format input arguments using util.format
 * 2. Apply Chalk styles
 * 3. Add timestamp and label according to settings
 * 4. Apply custom colors (if any)
 * 5. Special fix for Windows platform
 * 6. Return processed arguments and target method name
 *
 * @param this - Console2 實例 / Console2 instance
 * @param argv - 參數陣列 / Arguments array
 * @param name - 方法名稱 / Method name
 * @param failBack - 備用方法名稱 / Fallback method name
 * @returns 處理後的參數物件 / Processed arguments object
 */
function _logArgv(argv, name = 'log', failBack = 'log') {
    var _a, _b, _c, _d, _e, _f;
    /**
     * 使用 util.format 格式化所有傳入的參數
     * Format all incoming arguments using util.format
     */
    let s = ((_a = this._logFormat) !== null && _a !== void 0 ? _a : _logFormat_1._logFormat).call(this, ...argv);
    /**
     * 套用 Chalk 樣式到格式化後的字串
     * Apply Chalk styles to the formatted string
     */
    let o = ((_b = this[val_1.SYM_CHALK]) !== null && _b !== void 0 ? _b : chalk_1.default)(s);
    let arr = [];
    let data = (_c = this[val_1.SYM_DATA]) !== null && _c !== void 0 ? _c : {};
    /**
     * 如果啟用時間戳功能，則格式化時間並加入輸出
     * If timestamp feature is enabled, format time and add to output
     */
    if (data.time) {
        let ret = ((_d = this._time) !== null && _d !== void 0 ? _d : _time_1._time).call(this, {
            name,
            argv,
            failBack,
        });
        if (ret != null) {
            arr.push(ret);
        }
    }
    /**
     * 如果啟用標籤功能，檢查標籤是否適用於此日誌類型
     * If label feature is enabled, check if label applies to this log type
     */
    if (data.label) {
        let _ok = true;
        /**
         * 如果標籤是陣列格式且不包含當前日誌方法名稱，則跳過
         * If label is an array format and doesn't include current log method name, skip
         */
        if (Array.isArray(data.label) && !data.label.includes(name)) {
            _ok = false;
        }
        if (_ok) {
            let ret = ((_e = this._labelFormat) !== null && _e !== void 0 ? _e : _labelFormat_1._labelFormat)({
                name,
                argv,
                failBack,
            });
            if (ret != null) {
                arr.push(ret);
            }
        }
    }
    arr.push(o);
    /**
     * 如果有為特定日誌方法設定自定義顏色，則套用該顏色到所有輸出元素
     * If custom colors are set for specific log methods, apply that color to all output elements
     */
    if (arr.length && ((_f = data.colors) === null || _f === void 0 ? void 0 : _f[name])) {
        let c = data.colors[name];
        if (typeof c === 'string') {
            c = chalk_1.default[c];
        }
        arr = arr.map(v => c(v));
    }
    /**
     * Windows 平台的特殊修復：確保在粗體文字後正確重置樣式
     * Special fix for Windows platform: ensure style is properly reset after bold text
     *
     * @FIXME fix bug on windows when after bold
     * https://github.com/chalk/chalk/issues/145#issuecomment-288985903
     */
    if ((0, processPlatform_1.processPlatform)() == 'win32' && this.enabledColor) {
        arr = arr.map(v => '\u001B[0m' + v + '\u001B[0m');
    }
    /**
     * 如果目標方法不存在於原始 Console 中，則使用 failBack 方法
     * If target method doesn't exist in original Console, use failBack method
     */
    if (!(name in this[val_1.SYM_CONSOLE])) {
        name = failBack;
    }
    return {
        name,
        arr,
    };
}
//# sourceMappingURL=_logArgv.js.map