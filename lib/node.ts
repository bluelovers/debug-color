/**
 * Created by user on 2018/7/2/002.
 */

/// <reference types="node" />

import chalk, { Chalk, Level } from 'chalk';
import * as util from 'util';
import { SYM_CHALK, SYM_CONSOLE } from './val';
import { SYM_DATA } from './val';
import { IStyles, styleNames, styleNamesFn } from './styles';
import { Console } from 'console';
import * as FillProperty from './fill-property';
import { DateTime } from 'luxon';
export { InspectOptions } from 'util';

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

export interface Console2 extends Console, IStyles
{
	(...argv): void

	[SYM_CONSOLE]: Console;
	[SYM_CHALK]: Chalk;

	[SYM_DATA]: IOptions
}

export class Console2
{
	constructor(target = console, options?: IOptions)
	{
		this[SYM_CONSOLE] = target;
		this[SYM_CHALK] = chalk.constructor();

		// @ts-ignore
		this[SYM_DATA] = Object.create({
			colors: Object.create(defaultColors),
		});

		// @ts-ignore
		this[SYM_DATA].stream = !!(console._stdout && console._stderr);

		Object.assign(this[SYM_DATA], options || {});
	}

	get chalk()
	{
		return this[SYM_CHALK]
	}

	set chalk(value)
	{
		this[SYM_CHALK] = value
	}

	get levelColor()
	{
		return this[SYM_CHALK].level
	}

	set levelColor(value)
	{
		this[SYM_CHALK].level = value
	}

	get enabledColor()
	{
		return this[SYM_CHALK].enabled
	}

	set enabledColor(value)
	{
		this[SYM_CHALK].enabled = value
	}

	get inspectOptions()
	{
		return this[SYM_DATA].inspectOptions
	}

	set inspectOptions(value)
	{
		this[SYM_DATA].inspectOptions = value
	}

	get enabled()
	{
		return this[SYM_DATA].enabled !== false
	}

	set enabled(value)
	{
		this[SYM_DATA].enabled = value === true
	}

	setOptions(options: IOptions)
	{
		Object.assign(this[SYM_DATA], options);

		return this;
	}

	withOptions(options: IOptions)
	{
		let o = this._clone();

		o[SYM_CHALK] = this[SYM_CHALK];

		o[SYM_DATA] = Object.assign({}, this[SYM_DATA], options);

		return o;
	}

	protected _clone(): this
	{
		const self = this;

		let o = function Console2Method(...argv)
		{
			// @ts-ignore
			return o.log(...argv);
		};

		/**
		 * allow hacking parent object
		 */
		// @ts-ignore
		//o.__proto__ = this.__proto__.constructor.prototype;
		o.__proto__ = this;

		//o = o.bind(o);

		o[SYM_CONSOLE] = self[SYM_CONSOLE];
		o[SYM_DATA] = self[SYM_DATA];

		// @ts-ignore
		return o;
	}

	protected _chalkStyleProp(name)
	{
		let o = this._clone();
		o[SYM_CHALK] = this[SYM_CHALK][name];
		return o;
	}

	protected _logFormat(format, ...args)
	{
		return util.format(format, ...args);
	}

	success(...argv)
	{
		return this._log('success', argv);
	}

	ok(...argv)
	{
		return this._log('ok', argv);
	}

	fail(...argv)
	{
		return this._log('fail', argv, 'error');
	}

	protected _log(name: string, argv, failBack = 'log')
	{
		if (!this.enabled)
		{
			return;
		}

		// @ts-ignore
		let s = this._logFormat(...argv);
		let o = this[SYM_CHALK](s);

		let arr = [];

		let data = this[SYM_DATA];

		if (data.time)
		{
			arr.push(this._time());
		}

		if (data.label)
		{
			let _ok = true;

			if (Array.isArray(data.label) && !data.label.includes(name))
			{
				_ok = false;
			}

			_ok && arr.push(`[${name.toString().toUpperCase()}]`);
		}

		arr.push(o);

		if (arr.length && data.colors && data.colors[name])
		{
			let c: any = data.colors[name];

			if (typeof c === 'string')
			{
				c = chalk[c];
			}

			arr = arr.map(v => c(v));
		}

		if (process.platform == 'win32')
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

		return this[SYM_CONSOLE][name](...arr);
	}

	protected _chalkStyleMethod(name)
	{
		return function chalkStyleMethod(...argv)
		{
			let o = this._clone();

			o[SYM_CHALK] = this[SYM_CHALK][name](...argv);

			return o;
		};
	}

	protected _time()
	{
		return DateTime.local().toFormat('[HH:mm:ss.SSS]');
	}
}

util.inherits(Console2, Function);

styleNames.forEach(function (name)
{
	if (styleNamesFn.includes(name))
	{
		Object.defineProperty(Console2.prototype, name, {
			get()
			{
				return this._chalkStyleMethod(name);
			},
		});
	}
	else
	{
		Object.defineProperty(Console2.prototype, name, {
			get()
			{
				return this._chalkStyleProp(name);
			},
		});
	}
});

FillProperty.methods.forEach(function (name: string)
{
	if (name == 'dir')
	{
		Console2.prototype[name] = function chalkStyleLogOthers(object, options)
		{
			if (!this.enabled)
			{
				return;
			}

			if (!options && this[SYM_DATA].inspectOptions)
			{
				options = this[SYM_DATA].inspectOptions;
			}

			if (options)
			{
				return this[SYM_CONSOLE][name](object, options);
			}

			return this[SYM_CONSOLE][name](object);
		};
	}
	else if (name == 'assert')
	{
		Console2.prototype[name] = function chalkStyleLogAssert(value, ...argv)
		{
			if (!this.enabled)
			{
				return;
			}

			if (!value)
			{
				let o;
				if (argv.length)
				{
					let s = this._logFormat(...argv);

					o = this[SYM_CHALK](s);
				}
				return this[SYM_CONSOLE][name](value, o);
			}
		};
	}
	else if (FillProperty.methods_stdout.includes(name))
	{
		Console2.prototype[name] = function chalkStyleLog(...argv)
		{
			return this._log(name, argv)
		};
	}
	else if (FillProperty.methods_stderr.includes(name))
	{
		Console2.prototype[name] = function chalkStyleLog(...argv)
		{
			return this._log(name, argv, 'error')
		};
	}
	else
	{
		Console2.prototype[name] = function chalkStyleLogOthers(...argv)
		{
			if (!this.enabled)
			{
				return;
			}

			return this[SYM_CONSOLE][name](...argv);
		};
	}
});

export interface IChalkLike
{
	(string): string,
	(string,...argv): string,
	(...argv): string,
}

export default Console2
