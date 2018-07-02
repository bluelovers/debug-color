
import isNodeJs from './chk';
import * as CM from './node';
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

exports = self;
