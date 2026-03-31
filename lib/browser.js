"use strict";
/**
 * 瀏覽器 Console2 實作
 * Browser Console2 implementation
 *
 * 專為瀏覽器環境設計的 Console2 子類
 * Console2 subclass designed for browser environment
 *
 * @module debug-color2/lib/browser
 * @created 2018/7/2/002
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Console2 = void 0;
const tslib_1 = require("tslib");
const node_1 = tslib_1.__importDefault(require("./node"));
/**
 * 匯出所有 node 模組的內容
 * Export all contents from node module
 */
tslib_1.__exportStar(require("./node"), exports);
/**
 * 瀏覽器專用的 Console2 類別
 * Console2 class for browser
 *
 * 繼承自 ConsoleNode，但在瀏覽器中預設停用色彩輸出
 * Inherits from ConsoleNode, but disables color output by default in browser
 */
class Console2 extends node_1.default {
    /**
     * 建構函式
     * Constructor
     *
     * @param target - 目標 Console 實例，預設為全域 console / Target Console instance, defaults to global console
     * @param options - 選項設定 / Options configuration
     */
    constructor(target = console, options) {
        super(target, options);
        this.enabledColor = false;
    }
}
exports.Console2 = Console2;
exports.default = Console2;
//# sourceMappingURL=browser.js.map