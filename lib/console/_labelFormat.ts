import { IOptions } from '../types';
import Console2 from '../node';
import { SYM_DATA } from '../val';

export function _labelFormat(this: Console2, data: Parameters<IOptions["labelFormatFn"]>[0])
{
	if (this?.[SYM_DATA]?.labelFormatFn)
	{
		return this[SYM_DATA].labelFormatFn(data);
	}

	return `[${data.name.toString().toUpperCase()}]`
}
