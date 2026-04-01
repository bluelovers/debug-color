"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._logFormat = void 0;
/**
 * 日誌格式化工具
 * Log format utility
 *
 * 使用 util.format 進行格式化，這是 Node.js 內建的格式化工具
 * Use util.format for formatting, which is Node.js built-in formatting utility
 *
 * @example
 * // _logFormat 是 util.format 的重新匯出
 * // _logFormat is re-export of util.format
 *
 * // 基本用法：
 * // Basic usage:
 * import { _logFormat } from 'debug-color2/lib/console/_logFormat';
 *
 * _logFormat('Hello %s', 'World');        // → 'Hello World'
 * _logFormat('Number: %d', 42);           // → 'Number: 42'
 * _logFormat('Object: %O', { a: 1 });     // → 'Object: { a: 1 }'
 *
 * @example
 * // 格式化佔位符：
 * // Format placeholders:
 * _logFormat('%s', 'text');               // → 'text'
 * _logFormat('%d', 3.14);                  // → '3'
 * _logFormat('%f', 3.14);                  // → '3.14'
 * _logFormat('%j', { a: 1 });              // → '{"a":1}'
 * _logFormat('%%', 'ignored');            // → '%'
 *
 * @example
 * // 多個參數：
 * // Multiple arguments:
 * _logFormat('%s %s', 'Hello', 'World');  // → 'Hello World'
 * _logFormat('%d + %d = %d', 1, 2, 3);    // → '1 + 2 = 3'
 */
var util_1 = require("util");
Object.defineProperty(exports, "_logFormat", { enumerable: true, get: function () { return util_1.format; } });
//# sourceMappingURL=_logFormat.js.map