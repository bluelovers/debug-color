import { IOptions } from '../types';
import Console2 from '../node';
import { SYM_DATA } from '../val';

/**
 * 格式化日誌標籤
 * Format log label
 *
 * 根據自訂標籤格式化函式產生標籤，若無自訂函式則產生預設格式
 * Generate label from custom label format function, or produce default format if none
 *
 * @param this - Console2 實例 / Console2 instance
 * @param data - 標籤資料 / Label data
 * @returns 格式化後的標籤字串 / Formatted label string
 */
export function _labelFormat(this: Console2, data: Parameters<IOptions["labelFormatFn"]>[0])
{
	if (this?.[SYM_DATA]?.labelFormatFn)
	{
		return this[SYM_DATA].labelFormatFn(data);
	}

	return `[${data.name.toString().toUpperCase()}]`
}
