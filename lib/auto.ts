
import isNodeJs from './chk';
export * from './node';

let self;

if (isNodeJs())
{
	self = require('./node');
}
else
{
	self = require('./browser');
}

// @ts-ignore
export = self as any as typeof import('./node');
