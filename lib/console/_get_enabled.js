"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._get_enabled = _get_enabled;
exports._set_enabled = _set_enabled;
/**
 * 檢查 debug 是否啟用
 * Check if debug is enabled
 *
 * @param enabled - 啟用狀態 / Enabled status
 * @returns 是否啟用 / Whether enabled
 */
function _get_enabled(enabled) {
    return enabled !== false;
}
/**
 * 設定 debug 啟用狀態
 * Set debug enabled status
 *
 * @param enabled - 啟用狀態 / Enabled status
 * @returns 啟用狀態 / Enabled status
 */
function _set_enabled(enabled) {
    return (enabled !== null && enabled !== void 0 ? enabled : false) !== false;
}
//# sourceMappingURL=_get_enabled.js.map