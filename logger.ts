/**
 * Created by user on 2020/1/18.
 */

import { Console2 } from './lib/auto';

export const consoleLogger = new Console2(null, {
	label: true,
	time: true,
	inspectOptions: {
		colors: true,
	}
}) as Console2;

export default consoleLogger
