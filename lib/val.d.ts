/**
 * 數值與常數模組
 * Values and constants module
 *
 * 定義 Symbols 和預設色彩配置
 * Define Symbols and default color configuration
 *
 * @module debug-color2/lib/val
 * @created 2018/6/26/026
 */
import { IOptions } from './types';
/**
 * Debug Console Symbol
 * 用於儲存 Debug Console 實例 / Used to store Debug Console instance
 *
 * @example
 * ```typescript
 * // 使用 Symbol.for 確保跨環境一致性
 * const sym = Symbol.for('DebugConsole');
 * console.log(sym === SYM_DEBUG_CONSOLE); // true
 * ```
 */
export declare const SYM_DEBUG_CONSOLE: unique symbol;
/**
 * Chalk Symbol
 * 用於儲存 Chalk 實例 / Used to store Chalk instance
 *
 * 使用 Symbol.for('chalk') 建立，確保與 Chalk 庫的 Symbol 相容
 * Uses Symbol.for('chalk') to ensure compatibility with Chalk library
 *
 * @example
 * ```typescript
 * // 存取 Chalk 實例
 * const logger = new Console2();
 * const chalk = logger[SYM_CHALK];
 * chalk.red('紅色文字');
 * ```
 */
export declare const SYM_CHALK: unique symbol;
/**
 * Console Symbol
 * 用於儲存 Console 實例 / Used to store Console instance
 *
 * 使用 Symbol.for('console') 建立，儲存原始的 console 實例
 * Uses Symbol.for('console') to store the original console instance
 *
 * @example
 * ```typescript
 * // 取得原始 console
 * const logger = new Console2(console);
 * const originalConsole = logger[SYM_CONSOLE];
 * console.log(originalConsole === console); // true
 * ```
 */
export declare const SYM_CONSOLE: unique symbol;
/**
 * Event Symbol
 * 用於儲存事件資料 / Used to store event data
 *
 * @example
 * ```typescript
 * // 用於內部事件處理
 * const logger = new Console2();
 * logger[SYM_EVENT] = { type: 'log', timestamp: Date.now() };
 * ```
 */
export declare const SYM_EVENT: unique symbol;
/**
 * Data Symbol
 * 用於儲存選項資料 / Used to store options data
 *
 * 使用 Symbol.for('data') 建立，儲存 IOptions 配置資料
 * Uses Symbol.for('data') to store IOptions configuration data
 *
 * @example
 * ```typescript
 * // 存取選項資料
 * const logger = new Console2(console, { enabled: true, label: true });
 * const options = logger[SYM_DATA];
 * console.log(options.enabled); // true
 * console.log(options.label);  // true
 * ```
 */
export declare const SYM_DATA: unique symbol;
/**
 * This Symbol
 * 用於儲存 this 參考 / Used to store this reference
 *
 * @example
 * ```typescript
 * // 用於綁定方法的 this 上下文
 * const logger = new Console2();
 * logger[SYM_THIS] = logger;
 * ```
 */
export declare const SYM_THIS: unique symbol;
/**
 * 預設色彩配置
 * Default color configuration
 *
 * 定義各日誌類型的預設色彩
 * Define default colors for each log type
 */
export declare const defaultColors: Partial<IOptions["colors"]>;
