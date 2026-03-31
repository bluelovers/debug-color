import Console2 from '../node';
import { SYM_CONSOLE } from '../val';
import { _logArgv } from './_logArgv';
import { _get_enabled } from './_get_enabled';

/**
 * 執行日誌輸出
 * Execute log output
 *
 * @param this - Console2 實例 / Console2 instance
 * @param name - 日誌類型名稱 / Log type name
 * @param argv - 參數陣列 / Arguments array
 * @param failBack - 備用方法名稱 / Fallback method name
 * @returns 日誌輸出結果 / Log output result
 */
export function _log(this: Console2, name: string, argv: any[], failBack = 'log')
{
	if (_get_enabled(this.enabled))
	{
		let data = (this._logArgv ?? _logArgv).call(this, argv, name, failBack);

		return this[SYM_CONSOLE][data.name](...data.arr);
	}
}
