/**
 * Console2 方法綁定工具
 * Console2 method binding utility
 *
 * 用於將 Console2 的方法綁定到正確的 this 上下文
 * Used to bind Console2 methods to the correct this context
 *
 * @module debug-color2/lib/util/bindBaseMethods
 * @created 2021/7/10
 */

import Console2 from '../node';
import { methods } from '../fill-property';
import { SYM_THIS } from '../val';
import { IMethods } from '../types/CrossConsole';

/**
 * 取得綁定後的函式
 * Get bound function
 *
 * @param target - Console2 實例 / Console2 instance
 * @param name - 方法名稱 / Method name
 * @returns 綁定後的函式 / Bound function
 */
// @ts-ignore
function _get<P extends IMethods>(target: Console2, name: P): Console2[P]
{
	// @ts-ignore
	let oldFn: Console2[P] = target[name];

	// @ts-ignore
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

/**
 * 設定綁定的 this 上下文
 * Set bound this context
 *
 * @param target - 目標函式 / Target function
 * @param me - Console2 實例 / Console2 instance
 * @returns 設定後的函式 / Configured function
 */
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

/**
 * 綁定所有基礎方法到目標物件
 * Bind all base methods to target object
 *
 * 將 Console2 的所有方法綁定到目標物件，確保 this 上下文正確
 * Bind all Console2 methods to target object to ensure correct this context
 *
 * @param target - 目標 Console2 實例 / Target Console2 instance
 * @returns 綁定後的目標物件 / Bound target object
 */
export function bindBaseMethods(target)
{
	methods.forEach(m => {
		target[m] = _get(target, m)
	})

	return target
}
