/**
 * Created by user on 2018/7/2/002.
 */

import { createFnChalkByConsole } from './lib/util';

export { InspectOptions } from 'util';
export { ChalkOptions } from 'chalk';

import { Console2 } from './lib/auto';
export { IOptions } from './lib/val';

export { createChalkStyleLog, hasConsoleStream, isForceColor, isSupportsColor } from './lib/util';

export { Console2, Console2 as Console }
export const console = new Console2();

export const chalkByConsole = createFnChalkByConsole(console);

export default console;
