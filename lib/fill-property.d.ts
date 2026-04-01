/**
 * 屬性填充模組
 * Property filling module
 *
 * 定義 Console 方法列表和屬性填充函式
 * Define Console method lists and property filling function
 *
 * @module debug-color2/lib/fill-property
 * @created 2018/6/29/029
 */
import { IFillProperty, IValueOfArray } from './types';
import { IMethods } from './types/CrossConsole';
/**
 * stdout 方法列表
 * stdout methods list
 *
 * 輸出到標準輸出串流的方法
 * Methods that output to stdout stream
 */
export declare const methods_stdout: readonly ["debug", "info", "log"];
/**
 * 輸出方法列表
 * Output methods list
 *
 * 格式化輸出方法（如 table, dir）
 * Formatted output methods (like table, dir)
 */
export declare const methods_output: readonly ["table", "dir", "dirxml"];
/**
 * 其他方法列表
 * Other methods list
 *
 * 輔助功能方法（如 group, time）
 * Auxiliary function methods (like group, time)
 */
export declare const methods_other: readonly ["clear", "group", "groupCollapsed", "groupEnd", "time", "timeEnd", "count"];
/**
 * 檢視器專用方法列表
 * Inspector-only methods list
 *
 * 僅在檢視器中可用的方法
 * Methods only available in inspector
 */
export declare const methods_inspector: readonly ["profile", "profileEnd", "timeStamp", "markTimeline", "timeline", "timelineEnd"];
/**
 * stderr 方法列表
 * stderr methods list
 *
 * 輸出到標準錯誤串流的方法
 * Methods that output to stderr stream
 */
export declare const methods_stderr: readonly ["assert", "error", "trace", "warn", "exception"];
/**
 * 所有 Console 方法的合併列表
 * Combined list of all Console methods
 */
export declare const methods: IMethods[];
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
 *
 * @example
 * // 基本用法：填充 console 的所有方法
 * // Basic usage: fill all console methods
 * import { fillProperty } from 'debug-color2';
 *
 * const myConsole = {};
 * const result = fillProperty(myConsole);
 * // myConsole now has all Console methods (log, info, error, warn, etc.)
 *
 * @example
 * // 指定特定方法列表
 * // Specify specific method list
 * import { fillProperty, methods_stdout } from 'debug-color2';
 *
 * const customConsole = {};
 * fillProperty(customConsole, methods_stdout);
 * // customConsole only has: debug, info, log
 *
 * @example
 * // 自定義預設函式
 * // Custom default function
 * import { fillProperty, methods_stderr } from 'debug-color2';
 *
 * const loggedConsole = {};
 * const logger = (msg) => console.log('[LOGGED]', msg);
 * fillProperty(loggedConsole, methods_stderr, logger);
 * // error, warn, trace, assert will use logger when called
 */
export declare function fillProperty<T extends object = Console, P extends string[] = IMethods[], U extends (...argv: any) => any = (...argv: any) => void>(target?: T, ls?: P, fn?: U): T & IFillProperty<T, IValueOfArray<P>, U>;
export default fillProperty;
