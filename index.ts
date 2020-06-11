/**
 * Created by user on 2018/7/2/002.
 */

import { createFnChalkByConsole } from './lib/util';

export { InspectOptions } from 'util';

import { Console2 } from './lib/auto';

export * from './lib/types';

export { createChalkStyleLog, hasConsoleStream, isForceColor, isSupportsColor, createFnChalkByConsole } from './lib/util';

export { Console2, Console2 as Console }

export const console = new Console2();

export const chalkByConsole = createFnChalkByConsole(console);

export default console as Console2;
