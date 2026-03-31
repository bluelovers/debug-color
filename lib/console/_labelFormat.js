"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._labelFormat = _labelFormat;
const val_1 = require("../val");
/**
 * 格式化日誌標籤
 * Format log label
 *
 * 根據自訂標籤格式化函式產生標籤，若無自訂函式則產生預設格式
 * Generate label from custom label format function, or produce default format if none
 *
 * @param this - Console2 實例 / Console2 instance
 * @param data - 標籤資料 / Label data
 * @returns 格式化後的標籤字串 / Formatted label string
 */
function _labelFormat(data) {
    var _a;
    if ((_a = this === null || this === void 0 ? void 0 : this[val_1.SYM_DATA]) === null || _a === void 0 ? void 0 : _a.labelFormatFn) {
        return this[val_1.SYM_DATA].labelFormatFn(data);
    }
    return `[${data.name.toString().toUpperCase()}]`;
}
//# sourceMappingURL=_labelFormat.js.map