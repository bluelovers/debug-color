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
 * 匯出所有類型定義
 * Export all type definitions
 */
export * from './types';
/**
 * Debug Console Symbol
 * 用於儲存 Debug Console 實例 / Used to store Debug Console instance
 */
export declare const SYM_DEBUG_CONSOLE: unique symbol;
/**
 * Chalk Symbol
 * 用於儲存 Chalk 實例 / Used to store Chalk instance
 */
export declare const SYM_CHALK: unique symbol;
/**
 * Console Symbol
 * 用於儲存 Console 實例 / Used to store Console instance
 */
export declare const SYM_CONSOLE: unique symbol;
/**
 * Event Symbol
 * 用於儲存事件資料 / Used to store event data
 */
export declare const SYM_EVENT: unique symbol;
/**
 * Data Symbol
 * 用於儲存選項資料 / Used to store options data
 */
export declare const SYM_DATA: unique symbol;
/**
 * This Symbol
 * 用於儲存 this 參考 / Used to store this reference
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
