/**
 * 工具函數模組
 * Utility functions module
 *
 * @module debug-color2/lib/util
 * @created 2018/6/29
 */
import chalk, { Level } from 'chalk';
import { envBool } from 'env-bool';
import { Console2 } from './node';
import { IConsoleWithStream, IChalk } from './types';
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';

/**
 * 檢查是否強制啟用顏色輸出
 * Check if color output should be forced
 *
 * @param env - 環境變數物件 / Environment variables object
 * @returns 強制顏色等級 / Force color level
 */
export function isForceColor(env?): boolean | number | Level
{
	if (typeof env === 'undefined' && process)
	{
		env = process.env;
	}

	let forceColor = env && envBool(env.FORCE_COLOR, true);

	return forceColor;
}

/**
 * 檢查終端機是否支援顏色
 * Check if terminal supports colors
 *
 * @returns 顏色支援等級 / Color support level
 */
export function isSupportsColor()
{
	return chalk.supportsColor.level
}

/**
 * 建立一個回調函數，可存取 Console 的 Chalk 實例
 * Create a callback function that can access Console's Chalk instance
 *
 * @param console - Console2 實例 / Console2 instance
 * @returns 回調函數 / Callback function
 */
export function createFnChalkByConsole<CI extends Console2>(console: CI)
{
	return function chalkByConsole<R, C extends Console2 = CI>(cb: (chalk: C["chalk"], _console: C) => R,
		// @ts-ignore
		_console: C = console): R
	{
		return cb(_console.chalk, _console)
	}
}

/**
 * 取得 Chalk 實例，若無 Console2 實例則回退到預設 chalk
 * Get Chalk instance, fallback to default chalk if no Console2 instance
 *
 * @param console - Console2 實例（可選）/ Console2 instance (optional)
 * @returns Chalk 實例 / Chalk instance
 */
export function chalkByConsoleMaybe<CI extends Console2>(console?: CI): IChalk
{
	return console?.chalk ?? chalk
}

/**
 * 建立一個具有 Chalk 風格的日誌函數
 * Create a Chalk-styled log function
 *
 * @param console - Console2 實例 / Console2 instance
 * @param name - 方法名稱 / Method name
 * @param failBack - 失敗時回退的方法名稱 / Fallback method name
 * @returns 風格化日誌函數 / Styled log function
 */
export function createChalkStyleLog<CI extends Console2>(console: CI, name: string, failBack = 'log')
{
	if (!name || typeof name !== 'string' || name in console)
	{
		throw TypeError(`name is not allow in target console`)
	}

	if (!failBack || typeof failBack !== 'string' || failBack in console)
	{
		throw TypeError(`failBack is not allow in target console`)
	}

	// @ts-ignore
	if (typeof console._log !== 'function')
	{
		throw TypeError(`input console not a Console2 like object`)
	}

	return function chalkStyleLog(...argv)
	{
		// @ts-ignore
		return console._log(name, argv, failBack)
	}
}

/**
 * 檢查目標物件是否具有 Console 串流（_stdout, _stderr）
 * Check if target object has Console streams (_stdout, _stderr)
 *
 * @param target - 目標物件 / Target object
 * @returns 是否具有串流 / Whether has streams
 */
export function hasConsoleStream(target: IConsoleWithStream<object>)
{
	return !!(target._stdout && target._stderr);
}

/**
 * 檢查陣列是否包含指定值
 * Check if array contains specified value
 *
 * @param arr - 陣列 / Array
 * @param value - 要檢查的值 / Value to check
 * @returns 是否包含 / Whether contains
 */
export function arrayIncludes<T>(arr: ITSArrayListMaybeReadonly<T>, value: any): value is T
{
	return arr.includes(value as any)
}

export default exports as typeof import('./util');
