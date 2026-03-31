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
export const SYM_DEBUG_CONSOLE = Symbol.for('DebugConsole');
/**
 * Chalk Symbol
 * 用於儲存 Chalk 實例 / Used to store Chalk instance
 */
export const SYM_CHALK = Symbol.for('chalk');

/**
 * Console Symbol
 * 用於儲存 Console 實例 / Used to store Console instance
 */
export const SYM_CONSOLE = Symbol.for('console');

/**
 * Event Symbol
 * 用於儲存事件資料 / Used to store event data
 */
export const SYM_EVENT = Symbol.for('event');

/**
 * Data Symbol
 * 用於儲存選項資料 / Used to store options data
 */
export const SYM_DATA = Symbol.for('data');

/**
 * This Symbol
 * 用於儲存 this 參考 / Used to store this reference
 */
export const SYM_THIS = Symbol.for('console.this');

/**
 * 預設色彩配置
 * Default color configuration
 *
 * 定義各日誌類型的預設色彩
 * Define default colors for each log type
 */
export const defaultColors: Partial<IOptions["colors"]> = {
	error: 'red',
	exception: 'red',
	warn: 'red',

	fail: 'red',

	info: 'cyan',
	debug: 'cyan',

	success: 'green',
	ok: 'green',
};

export default exports as typeof import('./val');
