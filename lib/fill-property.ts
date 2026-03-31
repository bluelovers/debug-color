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
import { IFillProperty, IFillPropertyAuto, IValueOfArray } from './types';
import { IMethods } from './types/CrossConsole';

/**
 * 空函式
 * No-operation function
 *
 * 用於填充不存在的 Console 方法
 * Used to fill non-existent Console methods
 */
function noop(...argv): void {}

/**
 * stdout 方法列表
 * stdout methods list
 *
 * 輸出到標準輸出串流的方法
 * Methods that output to stdout stream
 */
export const methods_stdout = [

	"debug",

	"info",
	"log",

] as const;

/**
 * 輸出方法列表
 * Output methods list
 *
 * 格式化輸出方法（如 table, dir）
 * Formatted output methods (like table, dir)
 */
export const methods_output = [

	"table",

	"dir",
	"dirxml",

] as const;

/**
 * 其他方法列表
 * Other methods list
 *
 * 輔助功能方法（如 group, time）
 * Auxiliary function methods (like group, time)
 */
export const methods_other = [

	"clear",

	"group",
	"groupCollapsed",
	"groupEnd",

	"time",
	"timeEnd",

	"count",

] as const;

/**
 * 檢視器專用方法列表
 * Inspector-only methods list
 *
 * 僅在檢視器中可用的方法
 * Methods only available in inspector
 */
export const methods_inspector = [
	"profile",
	"profileEnd",
	"timeStamp",
	"markTimeline",

	"timeline",
	"timelineEnd",
] as const;

/**
 * stderr 方法列表
 * stderr methods list
 *
 * 輸出到標準錯誤串流的方法
 * Methods that output to stderr stream
 */
export const methods_stderr = [
	"assert",
	"error",
	"trace",
	"warn",

	"exception",
] as const;

/**
 * 取得物件值的類型
 * Get type of object values
 */
type ValueOf<T> = Exclude<T[keyof T], number | Function>;

/**
 * 所有 Console 方法的合併列表
 * Combined list of all Console methods
 */
export const methods = [].concat(
		methods_stdout,
		methods_stderr,
		methods_inspector,
		methods_other,
		methods_output,
	) as (
		ValueOf<typeof methods_stdout>
		| ValueOf<typeof methods_stderr>
		| ValueOf<typeof methods_inspector>
		| ValueOf<typeof methods_other>
		| ValueOf<typeof methods_output>
		)[] as IMethods[]
;

/**
 * 填充目標物件的 Console 方法
 * Fill Console methods to target object
 *
 * 為目標物件填入缺失的 Console 方法
 * Fill missing Console methods to target object
 *
 * @param target - 目標物件，預設為 console / Target object, defaults to console
 * @param ls - 方法名稱列表 / List of method names
 * @param fn - 預設函式 / Default function
 * @returns 填充後的目標物件 / Filled target object
 */
export function fillProperty<T extends object = Console, P extends string[] = IMethods[], U extends (...argv: any) => any = (...argv: any) => void>(target?: T,
	ls?: P,
	fn?: U,
): T & IFillProperty<T, IValueOfArray<P>, U>
{
	// @ts-ignore
	target ??= console;
	// @ts-ignore
	ls ??= methods;
	// @ts-ignore
	fn ??= noop;

	ls.forEach(function (method)
	{
		if (!(method in target))
		{
			target[method as string] = fn;
		}
	});

	return target as any
}

export default fillProperty;
