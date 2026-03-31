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
 * @param this - Console2 實例 / Console2 instance
 * @param data - 時間資料 / Time data
 * @returns 格式化後的時間字串 / Formatted time string
 */
function _time(data) {
    var _a, _b;
    if ((_a = this === null || this === void 0 ? void 0 : this[val_1.SYM_DATA]) === null || _a === void 0 ? void 0 : _a.timeFormatFn) {
        let data2 = {
            ...data,
            failBackTimeFormat: this[val_1.SYM_DATA].timeFormat || '[HH:mm:ss.SSS]',
            date: luxon_1.DateTime.local(),
        };
        return this[val_1.SYM_DATA].timeFormatFn(data2);
    }
    return luxon_1.DateTime.local().toFormat(((_b = this === null || this === void 0 ? void 0 : this[val_1.SYM_DATA]) === null || _b === void 0 ? void 0 : _b.timeFormat) || '[HH:mm:ss.SSS]');
}
//# sourceMappingURL=_time.js.map