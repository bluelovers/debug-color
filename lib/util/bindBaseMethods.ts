/**
 * Created by user on 2021/7/10.
 */
import Console2 from '../node';
import { methods } from '../fill-property';
import { SYM_THIS } from '../val';
import { IMethods } from '../types/CrossConsole';

function _get<P extends IMethods>(target: Console2, name: P): Console2[P]
{
	let oldFn: Console2[P] = target[name];

	let fn: Console2[P] = function (this: Console2, ...argv: any[])
	{
		let self: Console2 = this;

		if (this instanceof Console2)
		{
			self = this
		}
		else if (typeof this !== 'undefined')
		{
			self = this
		}
		else if (fn[SYM_THIS])
		{
			self = fn[SYM_THIS]
		}

		// @ts-ignore
		return oldFn.apply(self, argv)
	}

	setBindThis(fn, target);

	Object.defineProperty(fn, 'name', {
		value: name,
		enumerable: false,
	})

	return fn
}

export function setBindThis(target, me)
{
	Object.defineProperty(target, SYM_THIS, {
		get()
		{
			return me
		},
		enumerable: false,
	})

	return target
}

export function bindBaseMethods(target)
{
	methods.forEach(m => {
		target[m] = _get(target, m)
	})

	return target
}
