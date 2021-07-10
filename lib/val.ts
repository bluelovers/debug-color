/**
 * Created by user on 2018/6/26/026.
 */

import { IOptions } from './types';

export * from './types';

export const SYM_DEBUG_CONSOLE = Symbol.for('DebugConsole');
export const SYM_CHALK = Symbol.for('chalk');

export const SYM_CONSOLE = Symbol.for('console');

export const SYM_EVENT = Symbol.for('event');

export const SYM_DATA = Symbol.for('data');

export const SYM_THIS = Symbol.for('console.this');

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
