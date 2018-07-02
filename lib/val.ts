/**
 * Created by user on 2018/6/26/026.
 */

import { Chalk } from 'chalk';
import * as util from 'util';
import * as val from './val';
export { InspectOptions } from 'util';

export const SYM_DEBUG_CONSOLE = Symbol('DebugConsole');
export const SYM_CHALK = Symbol('chalk');

export const SYM_CONSOLE = Symbol('console');

export const SYM_EVENT = Symbol('event');

export const SYM_DATA = Symbol('data');

export default val;

export interface IOptions
{
	/**
	 * enable log display or not
	 */
	enabled?: boolean,

	/**
	 * show label string
	 */
	label?: boolean | string[],

	/**
	 * show time label
	 */
	time?: boolean,

	/**
	 * set default inspectOptions
	 */
	inspectOptions?: util.InspectOptions,

	/**
	 * set color style
	 */
	colors?: {
		debug?,
		error?,
		info?,
		log?,
		trace?,
		warn?,
		success?,
		ok?,
		[k: string]: string | Chalk | IChalkLike,
	},

	/**
	 * check is node.js console
	 */
	readonly stream?: boolean,
}

export const defaultColors: IOptions["colors"] = {
	error: 'red',
	exception: 'red',
	warn: 'red',

	fail: 'red',

	info: 'cyan',
	debug: 'cyan',

	success: 'green',
	ok: 'green',
};

export interface IChalkLike
{
	(string): string,

	(string, ...argv): string,

	(...argv): string,
}
