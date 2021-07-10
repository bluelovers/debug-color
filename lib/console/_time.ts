import Console2, { IOptions } from '../node';
import { SYM_DATA } from '../val';
import { DateTime } from 'luxon';

export function _time(this: Console2, data?: Parameters<IOptions["labelFormatFn"]>[0])
{
	if (this?.[SYM_DATA]?.timeFormatFn)
	{
		let data2: Parameters<IOptions["timeFormatFn"]>[0] = {
			...data,
			failBackTimeFormat: this[SYM_DATA].timeFormat || '[HH:mm:ss.SSS]',
			date: DateTime.local(),
		};

		return this[SYM_DATA].timeFormatFn(data2);
	}

	return DateTime.local().toFormat(this?.[SYM_DATA]?.timeFormat || '[HH:mm:ss.SSS]');
}
