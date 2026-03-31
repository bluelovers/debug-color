import Console2, { IOptions } from '../node';
import { SYM_DATA } from '../val';
import { DateTime } from 'luxon';

/**
 * 格式化時間戳
 * Format timestamp
 *
 * 根據自訂時間格式化函式產生時間戳，若無自訂函式則產生預設格式
 * Generate timestamp from custom time format function, or produce default format if none
 *
 * @param this - Console2 實例 / Console2 instance
 * @param data - 時間資料 / Time data
 * @returns 格式化後的時間字串 / Formatted time string
 */
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
