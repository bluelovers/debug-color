/**
 * Created by user on 2018/6/29/029.
 */

import chalk, { Level } from 'chalk';
import envBool from 'env-bool';
import Console2, { IConsoleWithStream, IChalk } from './node';

export function isForceColor(env?): boolean | number | Level
{
	if (typeof env === 'undefined' && process)
	{
		env = process.env;
	}

	let forceColor = env && envBool(env.FORCE_COLOR, true);

	return forceColor;
}

export function isSupportsColor()
{
	return chalk.supportsColor.level
}

export function createFnChalkByConsole<CI extends Console2>(console: CI)
{
	return function chalkByConsole<R, C extends Console2 = CI>(cb: (chalk: C["chalk"], _console: C) => R,
		// @ts-ignore
		_console: C = console): R
	{
		return cb(_console.chalk, _console)
	}
}

export function chalkByConsoleMaybe<CI extends Console2>(console?: CI): IChalk
{
	return console?.chalk ?? chalk
}

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

export function hasConsoleStream(target: IConsoleWithStream<object>)
{
	return !!(target._stdout && target._stderr);
}

export default exports as typeof import('./util');
