/**
 * 工具函數模組
 * Utility functions module
 *
 * @module debug-color2/lib/util
 * @created 2018/6/29
 */
import { Level } from 'chalk';
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
export declare function isForceColor(env?: any): boolean | number | Level;
/**
 * 檢查終端機是否支援顏色
 * Check if terminal supports colors
 *
 * @returns 顏色支援等級 / Color support level
 */
export declare function isSupportsColor(): Level;
/**
 * 建立一個回調函數，可存取 Console 的 Chalk 實例
 * Create a callback function that can access Console's Chalk instance
 *
 * 此函數返回一个高階函數，用於在回調中存取 Console2 實例的 Chalk 實例
 * This function returns a higher-order function to access the Chalk instance of Console2 in a callback
 *
 * @param console - Console2 實例 / Console2 instance
 * @returns 回調函數 / Callback function
 */
export declare function createFnChalkByConsole<CI extends Console2>(console: CI): <R, C extends Console2 = CI>(cb: (chalk: C["chalk"], _console: C) => R, _console?: C) => R;
/**
 * 取得 Chalk 實例，若無 Console2 實例則回退到預設 chalk
 * Get Chalk instance, fallback to default chalk if no Console2 instance
 *
 * 此函數提供了一個安全取得 Chalk 實例的方式，若傳入的 Console2 實例不存在 Chalk，則使用預設的 chalk
 * This function provides a safe way to get a Chalk instance, using default chalk if the passed Console2 doesn't have one
 *
 * @param console - Console2 實例（可選）/ Console2 instance (optional)
 * @returns Chalk 實例 / Chalk instance
 */
export declare function chalkByConsoleMaybe<CI extends Console2>(console?: CI): IChalk;
/**
 * 建立一個具有 Chalk 風格的日誌函數
 * Create a Chalk-styled log function
 *
 * @param console - Console2 實例 / Console2 instance
 * @param name - 方法名稱 / Method name
 * @param failBack - 失敗時回退的方法名稱 / Fallback method name
 * @returns 風格化日誌函數 / Styled log function
 */
export declare function createChalkStyleLog<CI extends Console2>(console: CI, name: string, failBack?: string): (...argv: any[]) => any;
/**
 * 檢查目標物件是否具有 Console 串流（_stdout, _stderr）
 * Check if target object has Console streams (_stdout, _stderr)
 *
 * @param target - 目標物件 / Target object
 * @returns 是否具有串流 / Whether has streams
 */
export declare function hasConsoleStream(target: IConsoleWithStream<object>): boolean;
/**
 * 檢查陣列是否包含指定值
 * Check if array contains specified value
 *
 * @param arr - 陣列 / Array
 * @param value - 要檢查的值 / Value to check
 * @returns 是否包含 / Whether contains
 */
export declare function arrayIncludes<T>(arr: ITSArrayListMaybeReadonly<T>, value: any): value is T;
