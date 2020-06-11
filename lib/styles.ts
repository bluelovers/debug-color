/**
 * Created by user on 2018/6/26/026.
 */

import chalk from 'chalk';
import { IStyles, IStylesFnNames, IStylesNamesWithoutFn } from './types';

export * from './types';

export function getStyleNamesByChalk(chalk): (keyof IStyles)[]
{
	const prototype = chalk.constructor.prototype;

	return Object
		.getOwnPropertyNames(prototype)
		.filter(v => v != 'constructor') as (keyof IStyles)[]
		;
}

export const styleNames = getStyleNamesByChalk(chalk);

export const styleNamesFn: IStylesFnNames[] = [
	'rgb',
	'hsl',
	'hsv',
	'hwb',
	'bgHex',
	'bgKeyword',
	'bgRgb',
	'bgHsl',
	'bgHsv',
	'bgHwb',
	'hex',
	'keyword',
];

export const styleNamesWithoutFn = styleNames.filter(name => !styleNamesFn.includes(name as any)) as IStylesNamesWithoutFn

export default exports as typeof import('./styles')
