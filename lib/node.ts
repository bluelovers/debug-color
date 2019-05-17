/**
 * Created by user on 2018/7/2/002.
 */

/// <reference types="node" />

import chalk, { Chalk, Level, ChalkOptions } from 'chalk';
import { Console } from 'console';
import { DateTime } from 'luxon';
import util = require('util');
import isNodeJs from './chk';
import FillProperty = require('./fill-property');
import { IStyles, styleNames, styleNamesFn } from './styles';
import { defaultColors, IOptions, SYM_CHALK, SYM_CONSOLE, SYM_DATA } from './val';
import { hasConsoleStream, isForceColor } from './util';
import WriteStream = NodeJS.WriteStream;

export type IConsoleWithStream<T extends object = Console> = T & {
	_stdout?: WriteStream;
	_stderr?: WriteStream;
}

export { InspectOptions } from 'util';

export interface Console2 extends IConsoleWithStream<Console>, IStyles
{
	(...argv): void

	[SYM_CONSOLE]: IConsoleWithStream<Console> | Console2;
	[SYM_CHALK]: Chalk;

	[SYM_DATA]: IOptions

	/**
	 * A simple assertion test that verifies whether `value` is truthy.
	 * If it is not, an `AssertionError` is thrown.
	 * If provided, the error `message` is formatted using `util.format()` and used as the error message.
	 */
	assert(value: any, message?: string, ...optionalParams: any[]): void;
	/**
	 * When `stdout` is a TTY, calling `console.clear()` will attempt to clear the TTY.
	 * When `stdout` is not a TTY, this method does nothing.
	 */
	clear(): void;
	/**
	 * Maintains an internal counter specific to `label` and outputs to `stdout` the number of times `console.count()` has been called with the given `label`.
	 */
	count(label?: string): void;
	/**
	 * Resets the internal counter specific to `label`.
	 */
	countReset(label?: string): void;
	/**
	 * The `console.debug()` function is an alias for {@link console.log()}.
	 */
	debug(message?: any, ...optionalParams: any[]): void;
	/**
	 * Uses {@link util.inspect()} on `obj` and prints the resulting string to `stdout`.
	 * This function bypasses any custom `inspect()` function defined on `obj`.
	 */
	dir(obj: any, options?: NodeJS.InspectOptions): void;
	/**
	 * This method calls {@link console.log()} passing it the arguments received. Please note that this method does not produce any XML formatting
	 */
	dirxml(...data: any[]): void;
	/**
	 * Prints to `stderr` with newline.
	 */
	error(message?: any, ...optionalParams: any[]): void;
	/**
	 * Increases indentation of subsequent lines by two spaces.
	 * If one or more `label`s are provided, those are printed first without the additional indentation.
	 */
	group(...label: any[]): void;
	/**
	 * The `console.groupCollapsed()` function is an alias for {@link console.group()}.
	 */
	groupCollapsed(): void;
	/**
	 * Decreases indentation of subsequent lines by two spaces.
	 */
	groupEnd(): void;
	/**
	 * The {@link console.info()} function is an alias for {@link console.log()}.
	 */
	info(message?: any, ...optionalParams: any[]): void;
	/**
	 * Prints to `stdout` with newline.
	 */
	log(message?: any, ...optionalParams: any[]): void;
	/**
	 * This method does not display anything unless used in the inspector.
	 *  Prints to `stdout` the array `array` formatted as a table.
	 */
	table(tabularData: any, properties?: string[]): void;
	/**
	 * Starts a timer that can be used to compute the duration of an operation. Timers are identified by a unique `label`.
	 */
	time(label?: string): void;
	/**
	 * Stops a timer that was previously started by calling {@link console.time()} and prints the result to `stdout`.
	 */
	timeEnd(label?: string): void;
	/**
	 * Prints to `stderr` the string 'Trace :', followed by the {@link util.format()} formatted message and stack trace to the current position in the code.
	 */
	trace(message?: any, ...optionalParams: any[]): void;
	/**
	 * The {@link console.warn()} function is an alias for {@link console.error()}.
	 */
	warn(message?: any, ...optionalParams: any[]): void;

	// --- Inspector mode only ---
	/**
	 * This method does not display anything unless used in the inspector.
	 *  Starts a JavaScript CPU profile with an optional label.
	 */
	profile(label?: string): void;
	/**
	 * This method does not display anything unless used in the inspector.
	 *  Stops the current JavaScript CPU profiling session if one has been started and prints the report to the Profiles panel of the inspector.
	 */
	profileEnd(): void;
	/**
	 * This method does not display anything unless used in the inspector.
	 *  Adds an event with the label `label` to the Timeline panel of the inspector.
	 */
	timeStamp(label?: string): void;
}

export class Console2
{
	constructor(target: Console2 | IConsoleWithStream<Console> = console, options?: IOptions)
	{
		this[SYM_CONSOLE] = target || console;

		if (options && options.chalkOptions)
		{
			this[SYM_CHALK] = chalk.constructor(options.chalkOptions);
		}
		else
		{
			this[SYM_CHALK] = chalk.constructor();
		}

		// @ts-ignore
		this[SYM_DATA] = Object.create({
			colors: Object.create(defaultColors),
			// @ts-ignore
		});

		// @ts-ignore
		this[SYM_DATA].stream = null;

		if (this[SYM_CONSOLE] instanceof Console2)
		{
			let target = (this[SYM_CONSOLE] as Console2).getStream();

			if (target)
			{
				// @ts-ignore
				this[SYM_DATA].stream = hasConsoleStream(target);
			}
			else
			{
				// @ts-ignore
				this[SYM_DATA].stream = false;
			}
		}
		else
		{
			// @ts-ignore
			this[SYM_DATA].stream = hasConsoleStream(this[SYM_CONSOLE]);
		}

		Object.assign(this[SYM_DATA], options || {});

		this[SYM_DATA].chalkOptions = this[SYM_DATA].chalkOptions || {};

		if (this[SYM_DATA].chalkOptions.enabled)
		{
			this[SYM_CHALK].enabled = true;
		}
		else if (this[SYM_CHALK].enabled && !isNodeJs())
		{
			this[SYM_CHALK].enabled = false;
		}
		else if (!this[SYM_CHALK].enabled && isForceColor())
		{
			this[SYM_CHALK].enabled = true;
		}

		if (this[SYM_DATA].inspectOptions && this[SYM_DATA].inspectOptions.depth < 0)
		{
			this[SYM_DATA].inspectOptions.depth = null;
		}
	}

	get _stdout()
	{
		return this.getStream()._stdout
	}

	get _stderr()
	{
		return this.getStream()._stderr
	}

	getStream(): {
		_stdout: WriteStream;
		_stderr: WriteStream;
	}
	{
		if (this[SYM_DATA].stream)
		{
			let _stdout: WriteStream;
			let _stderr: WriteStream;

			if (this[SYM_CONSOLE] instanceof Console2)
			{
				return (this[SYM_CONSOLE] as Console2).getStream()
			}
			else
			{
				// @ts-ignore
				({ _stdout, _stderr } = this[SYM_CONSOLE]);
			}

			return {
				_stdout,
				_stderr,
			}
		}

		return null;
	}

	get chalk()
	{
		return this[SYM_CHALK]
	}

	set chalk(value)
	{
		this[SYM_CHALK] = value
	}

	get levelColor(): Level
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

	get chalkOptions()
	{
		return this[SYM_DATA].chalkOptions
	}

	set chalkOptions(value)
	{
		this[SYM_DATA].chalkOptions = value
	}

	get inspectOptions()
	{
		return this[SYM_DATA].inspectOptions
	}

	set inspectOptions(value)
	{
		this[SYM_DATA].inspectOptions = value
	}

	setInspectOptions(value: util.InspectOptions)
	{
		this[SYM_DATA].inspectOptions = Object.assign(this[SYM_DATA].inspectOptions || {}, value);
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

	protected _labelFormat(data: Parameters<IOptions["labelFormatFn"]>[0])
	{
		if (this[SYM_DATA].labelFormatFn)
		{
			return this[SYM_DATA].labelFormatFn(data);
		}

		return `[${data.name.toString().toUpperCase()}]`
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
			let ret = this._time({
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
				let ret = this._labelFormat({
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

		if (arr.length && data.colors && data.colors[name])
		{
			let c: any = data.colors[name];

			if (typeof c === 'string')
			{
				c = chalk[c];
			}

			arr = arr.map(v => c(v));
		}

		if (process.platform == 'win32' && this.enabledColor)
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

	protected _time(data?: Parameters<IOptions["labelFormatFn"]>[0])
	{
		if (this[SYM_DATA].timeFormatFn)
		{
			let data2: Parameters<IOptions["timeFormatFn"]>[0] = {
				...data,
				failBackTimeFormat: this[SYM_DATA].timeFormat || '[HH:mm:ss.SSS]',
				date: DateTime.local(),
			};

			return this[SYM_DATA].timeFormatFn(data2);
		}

		return DateTime.local().toFormat(this[SYM_DATA].timeFormat || '[HH:mm:ss.SSS]');
	}
}

util.inherits(Console2, Function);

// @ts-ignore
Console2.prototype.Console = Console2

styleNames.forEach(function (name)
{
	if (styleNamesFn.includes(name as any))
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

FillProperty.methods.forEach(function (name)
{
	if (name == 'dir')
	{
		Console2.prototype[name] = function chalkStyleLogOthers(object, options)
		{
			if (!this.enabled)
			{
				return;
			}

			let enabledColor = this.enabledColor;

			if (!options && this[SYM_DATA].inspectOptions)
			{
				options = this[SYM_DATA].inspectOptions;
			}

			if (options)
			{
				if (enabledColor && options.colors == null)
				{
					options = {
						...options,
						colors: enabledColor
					};
				}

				return this[SYM_CONSOLE][name](object, options);
			}

			return this[SYM_CONSOLE][name](object, {
				colors: enabledColor,
			});
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
	else if (FillProperty.methods_stdout.includes(name as any))
	{
		Console2.prototype[name as any] = function chalkStyleLog(...argv)
		{
			return this._log(name, argv)
		};
	}
	else if (FillProperty.methods_stderr.includes(name as any))
	{
		Console2.prototype[name as any] = function chalkStyleLog(...argv)
		{
			return this._log(name, argv, 'error')
		};
	}
	else
	{
		Console2.prototype[name as any] = function chalkStyleLogOthers(...argv)
		{
			if (!this.enabled)
			{
				return;
			}

			return this[SYM_CONSOLE][name as any](...argv);
		};
	}
});

export default Console2
