import Console2 from '../node';
import { SYM_CHALK, SYM_CONSOLE, SYM_DATA } from '../val';
import chalk from 'chalk';
import { _time } from './_time';
import { _logFormat } from './_logFormat';
import { _labelFormat } from './_labelFormat';
import { processPlatform } from '../util/processPlatform';

export function _logErrorArgv(this: Console2,argv: any[], name: string = 'error', failBack = 'error')
{
	return (this._logArgv ?? _logArgv).call(this, argv, name, failBack)
}

export function _logArgv(this: Console2, argv: any[], name: string = 'log', failBack = 'log')
{
	let s = (this._logFormat ?? _logFormat).call(this, ...argv);
	let o = (this[SYM_CHALK] ?? chalk)(s);

	let arr = [];

	let data = this[SYM_DATA] ?? {} as null;

	if (data.time)
	{
		let ret = (this._time ?? _time).call(this,{
			name,
			argv,
			failBack,
		});

		if (ret != null)
		{
			arr.push(ret);
		}
	}

	if (data.label)
	{
		let _ok = true;

		if (Array.isArray(data.label) && !data.label.includes(name))
		{
			_ok = false;
		}

		if (_ok)
		{
			let ret = (this._labelFormat ?? _labelFormat)({
				name,
				argv,
				failBack,
			});

			if (ret != null)
			{
				arr.push(ret);
			}
		}
	}

	arr.push(o);

	if (arr.length && data.colors?.[name])
	{
		let c: any = data.colors[name];

		if (typeof c === 'string')
		{
			c = chalk[c];
		}

		arr = arr.map(v => c(v));
	}

	if (processPlatform() == 'win32' && this.enabledColor)
	{
		/**
		 * @FIXME fix bug on windows when after bold
		 *
		 * https://github.com/chalk/chalk/issues/145#issuecomment-288985903
		 */
		arr = arr.map(v => '\u001B[0m' + v + '\u001B[0m');
	}

	if (!(name in this[SYM_CONSOLE]))
	{
		name = failBack;
	}

	return {
		name,
		arr,
	}
}
