"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.methods = exports.methods_stderr = exports.methods_inspector = exports.methods_other = exports.methods_output = exports.methods_stdout = void 0;
exports.fillProperty = fillProperty;
/**
 * 空函式
 * No-operation function
 *
 * 用於填充不存在的 Console 方法
 * Used to fill non-existent Console methods
 */
function noop(...argv) { }
/**
 * stdout 方法列表
 * stdout methods list
 *
 * 輸出到標準輸出串流的方法
 * Methods that output to stdout stream
 */
exports.methods_stdout = [
    "debug",
    "info",
    "log",
];
/**
 * 輸出方法列表
 * Output methods list
 *
 * 格式化輸出方法（如 table, dir）
 * Formatted output methods (like table, dir)
 */
exports.methods_output = [
    "table",
    "dir",
    "dirxml",
];
/**
 * 其他方法列表
 * Other methods list
 *
 * 輔助功能方法（如 group, time）
 * Auxiliary function methods (like group, time)
 */
exports.methods_other = [
    "clear",
    "group",
    "groupCollapsed",
    "groupEnd",
    "time",
    "timeEnd",
    "count",
];
/**
 * 檢視器專用方法列表
 * Inspector-only methods list
 *
 * 僅在檢視器中可用的方法
 * Methods only available in inspector
 */
exports.methods_inspector = [
    "profile",
    "profileEnd",
    "timeStamp",
    "markTimeline",
    "timeline",
    "timelineEnd",
];
/**
 * stderr 方法列表
 * stderr methods list
 *
 * 輸出到標準錯誤串流的方法
 * Methods that output to stderr stream
 */
exports.methods_stderr = [
    "assert",
    "error",
    "trace",
    "warn",
    "exception",
];
/**
 * 所有 Console 方法的合併列表
 * Combined list of all Console methods
 */
exports.methods = [].concat(exports.methods_stdout, exports.methods_stderr, exports.methods_inspector, exports.methods_other, exports.methods_output);
/**
 * 填充目標物件的 Console 方法
 * Fill Console methods to target object
 *
 * 為目標物件填入缺失的 Console 方法，若目標、方法列表或預設函式未提供，則使用預設值
 * Fill missing Console methods to target object, using defaults if target, method list, or default function not provided
 *
 * @param target - 目標物件，預設為 console / Target object, defaults to console
 * @param ls - 方法名稱列表，預設為所有 Console 方法 / List of method names, defaults to all Console methods
 * @param fn - 預設函式，預設為空函式 / Default function, defaults to noop
 * @returns 填充後的目標物件 / Filled target object
 */
function fillProperty(target, ls, fn) {
    // @ts-ignore
    target !== null && target !== void 0 ? target : (target = console);
    // @ts-ignore
    ls !== null && ls !== void 0 ? ls : (ls = exports.methods);
    // @ts-ignore
    fn !== null && fn !== void 0 ? fn : (fn = noop);
    ls.forEach(function (method) {
        if (!(method in target)) {
            target[method] = fn;
        }
    });
    return target;
}
exports.default = fillProperty;
//# sourceMappingURL=fill-property.js.map