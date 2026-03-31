"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._time = _time;
const val_1 = require("../val");
const luxon_1 = require("luxon");
/**
 * 格式化時間戳
 * Format timestamp
 *
 * 根據自訂時間格式化函式產生時間戳，若無自訂函式則產生預設格式
 * Generate timestamp from custom time format function, or produce default format if none
 *
 * 處理流程：
 * 1. 檢查是否存在自訂時間格式化函式 (timeFormatFn)
 * 2. 若有自訂函式，則傳遞相關資料並呼叫該函式
 * 3. 若無自訂函式，則使用 Luxon 產生預設格式的時間戳
 *
 * Processing flow:
 * 1. Check if custom time formatting function (timeFormatFn) exists
 * 2. If custom function exists, pass relevant data and call the function
 * 3. If no custom function, use Luxon to generate timestamp with default format
 *
 * @param this - Console2 實例 / Console2 instance
 * @param data - 時間資料 / Time data
 * @returns 格式化後的時間字串 / Formatted time string
 */
function _time(data) {
    var _a, _b;
    /**
     * 檢查是否有自訂時間格式化函式
     * Check if custom time formatting function exists
     */
    if ((_a = this === null || this === void 0 ? void 0 : this[val_1.SYM_DATA]) === null || _a === void 0 ? void 0 : _a.timeFormatFn) {
        let data2 = {
            ...data,
            failBackTimeFormat: this[val_1.SYM_DATA].timeFormat || '[HH:mm:ss.SSS]',
            date: luxon_1.DateTime.local(),
        };
        return this[val_1.SYM_DATA].timeFormatFn(data2);
    }
    /**
     * 使用預設格式產生時間戳
     * Generate timestamp using default format
     */
    return luxon_1.DateTime.local().toFormat(((_b = this === null || this === void 0 ? void 0 : this[val_1.SYM_DATA]) === null || _b === void 0 ? void 0 : _b.timeFormat) || '[HH:mm:ss.SSS]');
}
//# sourceMappingURL=_time.js.map