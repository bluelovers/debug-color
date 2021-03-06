/**
 * Created by user on 2018/6/29/029.
 */
import { IFillProperty, IFillPropertyAuto, IValueOfArray } from './types';
import { IMethods } from './types/CrossConsole';

function noop(...argv): void {}

export const methods_stdout = [

	"debug",

	"info",
	"log",

] as const;

export const methods_output = [

	"table",

	"dir",
	"dirxml",

] as const;

export const methods_other = [

	"clear",

	"group",
	"groupCollapsed",
	"groupEnd",

	"time",
	"timeEnd",

	"count",

] as const;

export const methods_inspector = [
	"profile",
	"profileEnd",
	"timeStamp",
	"markTimeline",

	"timeline",
	"timelineEnd",
] as const;

export const methods_stderr = [
	"assert",
	"error",
	"trace",
	"warn",

	"exception",
] as const;

type ValueOf<T> = Exclude<T[keyof T], number | Function>;

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
		)[]
;

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
