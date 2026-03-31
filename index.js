"use strict";
/**
 * debug-color2 - 彩色化 Console 輸出的模組
 * Colorize console.log output with customizable styles
 *
 * @module debug-color2
 * @version 1.3.2
 * @author bluelovers
 * @license ISC
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.chalkByConsole = exports.console = exports.Console = exports.Console2 = exports.chalkByConsoleMaybe = exports.createFnChalkByConsole = exports.isSupportsColor = exports.isForceColor = exports.hasConsoleStream = exports.createChalkStyleLog = void 0;
const tslib_1 = require("tslib");
// 匯入用於創建 Chalk 回調函數的工具函數
// Import utility function for creating Chalk callback
const util_1 = require("./lib/util");
// 匯入 Console2 主類
// Import Console2 main class
const auto_1 = require("./lib/auto");
Object.defineProperty(exports, "Console2", { enumerable: true, get: function () { return auto_1.Console2; } });
Object.defineProperty(exports, "Console", { enumerable: true, get: function () { return auto_1.Console2; } });
// 匯出所有類型定義
// Export all type definitions
tslib_1.__exportStar(require("./lib/types"), exports);
// 匯出工具函數
// Export utility functions
var util_2 = require("./lib/util");
Object.defineProperty(exports, "createChalkStyleLog", { enumerable: true, get: function () { return util_2.createChalkStyleLog; } });
Object.defineProperty(exports, "hasConsoleStream", { enumerable: true, get: function () { return util_2.hasConsoleStream; } });
Object.defineProperty(exports, "isForceColor", { enumerable: true, get: function () { return util_2.isForceColor; } });
Object.defineProperty(exports, "isSupportsColor", { enumerable: true, get: function () { return util_2.isSupportsColor; } });
Object.defineProperty(exports, "createFnChalkByConsole", { enumerable: true, get: function () { return util_2.createFnChalkByConsole; } });
Object.defineProperty(exports, "chalkByConsoleMaybe", { enumerable: true, get: function () { return util_2.chalkByConsoleMaybe; } });
/**
 * 預設的彩色 Console 實例
 * Default colorized console instance
 */
exports.console = new auto_1.Console2();
/**
 * 使用 Chalk 搭配 Console 的便捷函數
 * Convenience function to use Chalk with Console
 */
exports.chalkByConsole = (0, util_1.createFnChalkByConsole)(exports.console);
// 預設匯出
// Default export
exports.default = exports.console;
//# sourceMappingURL=index.js.map