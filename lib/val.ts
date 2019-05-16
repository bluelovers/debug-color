/**
 * Created by user on 2018/6/26/026.
 */

import { Chalk, ChalkOptions } from 'chalk';
import util = require('util');
import val = require('./val');
import { DateTime } from 'luxon';
import { IStyles, IStylesColorNames } from './styles';
export { InspectOptions } from 'util';
export { ChalkOptions }

export const SYM_DEBUG_CONSOLE = Symbol('DebugConsole');
export const SYM_CHALK = Symbol('chalk');

export const SYM_CONSOLE = Symbol('console');

export const SYM_EVENT = Symbol('event');

export const SYM_DATA = Symbol('data');

export default val;

export type IOptionsColorsProp = 'debug' | 'error' | 'info' | 'log' | 'trace' | 'warn' | 'success' | 'ok' | 'exception' | 'fail';

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
	 * allow change timeFormat
	 *
	 * @default '[HH:mm:ss.SSS]'
	 */
	timeFormat?: string;
	timeFormatFn?<T extends unknown[]>(data: Parameters<IOptions["labelFormatFn"]>[0] & {
		failBackTimeFormat: string
		date: DateTime,
	}): string;

	/**
	 * allow change labelFormat
	 *
	 * @default `[${data.name.toString().toUpperCase()}]`
	 */
	labelFormatFn?<T extends unknown[]>(data: {
		name: string,
		argv?: T,
		failBack: string,
	}): string;

	/**
	 * set default inspectOptions
	 */
	inspectOptions?: util.InspectOptions,

	chalkOptions?: ChalkOptions,

	/**
	 * set color style
	 */
	colors?: Record<IOptionsColorsProp | string, Chalk | IChalkLike | IStylesColorNames>,

	/**
	 * check is node.js console
	 */
	readonly stream?: boolean,
}

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

export interface IChalkLike
{
	(string): string,

	(string, ...argv): string,

	(...argv): string,
}
