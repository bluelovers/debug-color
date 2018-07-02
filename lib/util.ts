/**
 * Created by user on 2018/6/29/029.
 */

import chalk from 'chalk';
import envBool from 'env-bool';

export function isForceColor(env?): boolean | number
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

import * as util from './util';
export default util;
