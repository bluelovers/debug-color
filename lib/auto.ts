
import isNodeJs from './chk';
import * as CM from './node';
export * from './node';

let self;

if (isNodeJs())
{
	self = require('./node').Console2;
}
else
{
	self = require('./browser').Console2;
}

exports = self;
