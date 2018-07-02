/**
 * Created by user on 2018/6/29/029.
 */
import * as Console from 'console';

const noop = function () {};
export const methods_stdout = [

	"debug",

	"info",
	"log",

];

export const methods_output = [

	"table",

	"dir",
	"dirxml",

];

export const methods_other = [

	"clear",

	"group",
	"groupCollapsed",
	"groupEnd",

	"time",
	"timeEnd",

	"count",

];

export const methods_inspector = [
	"profile",
	"profileEnd",
	"timeStamp",
	"markTimeline",

	"timeline",
	"timelineEnd",
];

export const methods_stderr = [
	"assert",
	"error",
	"trace",
	"warn",

	"exception",
];

export const methods = [].concat(methods_stdout, methods_stderr, methods_inspector, methods_other, methods_output);

export function fillProperty<T = Console>(target: Console = console, ls = methods, fn = noop)
{
	ls.forEach(function (method)
	{
		if (!(method in target))
		{
			target[method] = noop;
		}
	});

	return target
}

export default fillProperty;
