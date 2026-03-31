"use strict";
/**
 * 平台資訊工具
 * Platform information utility
 *
 * 取得目前執行環境的平台資訊
 * Get current execution environment platform information
 *
 * @module debug-color2/lib/util/processPlatform
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.processPlatform = processPlatform;
/**
 * 取得目前執行平台
 * Get current execution platform
 *
 * @returns 平台名稱（如 'win32', 'linux', 'darwin'）/ Platform name (like 'win32', 'linux', 'darwin')
 */
function processPlatform() {
    if (typeof process !== 'undefined') {
        return process.platform;
    }
}
//# sourceMappingURL=processPlatform.js.map