/**
 * Created by user on 2018/7/2/002.
 */

import ConsoleNode from './node';
import { IOptions } from './types';

export * from './node';

export class Console2 extends ConsoleNode
{

	constructor(target = console, options?: IOptions)
	{
		super(target, options);

		this.enabledColor = false;
	}

}

export default Console2
