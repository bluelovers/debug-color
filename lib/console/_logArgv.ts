import Console2 from '../node';
import { SYM_CHALK, SYM_CONSOLE, SYM_DATA } from '../val';
import chalk from 'chalk';
import { _time } from './_time';
import { _logFormat } from './_logFormat';
import { _labelFormat } from './_labelFormat';
import { processPlatform } from '../util/processPlatform';

/**
 * 格式化錯誤參數
 * Format error arguments
 *
 * 錯誤專用的參數處理，實際處理邏輯委託給 _logArgv
 * Error-specific argument processing, actual logic delegated to _logArgv
 *
 * @param this - Console2 實例 / Console2 instance
 * @param argv - 參數陣列 / Arguments array
 * @param name - 方法名稱 / Method name
 * @param failBack - 備用方法名稱 / Fallback method name
 * @returns 處理後的參數 / Processed arguments
 *
 * @example
 * // _logErrorArgv 是錯誤專用的包裝函式
 * // _logErrorArgv is error-specific wrapper function
 *
 * // 實際上只是呼叫 _logArgv，但參數預設為 error
 * // Actually just calls _logArgv, but with default parameter 'error'
 * const result = _logErrorArgv.call(console2, [errorObj, message], 'error', 'error');
 * // 等同於 / Equivalent to:
 * const result = _logArgv.call(console2, [errorObj, message], 'error', 'error');
 */
export function _logErrorArgv(this: Console2,argv: any[], name: string = 'error', failBack = 'error')
{
	return (this._logArgv ?? _logArgv).call(this, argv, name, failBack)
}

/**
 * 格式化日誌參數
 * Format log arguments
 *
 * 處理時間戳、標籤、色彩等格式化
 * Handle timestamp, label, color and other formatting
 *
 * 處理流程：
 * 1. 使用 util.format 格式化輸入參數
 * 2. 套用 Chalk 樣式
 * 3. 根據設定加入時間戳和標籤
 * 4. 套用自定義顏色（若有的話）
 * 5. Windows 平台的特殊修復
 * 6. 回傳處理後的參數和目標方法名稱
 *
 * Processing flow:
 * 1. Format input arguments using util.format
 * 2. Apply Chalk styles
 * 3. Add timestamp and label according to settings
 * 4. Apply custom colors (if any)
 * 5. Special fix for Windows platform
 * 6. Return processed arguments and target method name
 *
 * @param this - Console2 實例 / Console2 instance
 * @param argv - 參數陣列 / Arguments array
 * @param name - 方法名稱 / Method name
 * @param failBack - 備用方法名稱 / Fallback method name
 * @returns 處理後的參數物件 / Processed arguments object
 *
 * @example
 * // 輸入：console2.log('Hello', { name: 'World' })
 * // Input: console2.log('Hello', { name: 'World' })
 *
 * // 處理流程：
 * // Processing flow:
 * // 1. util.format('Hello', { name: 'World' }) → 'Hello { name: \'World\' }'
 * // 2. Apply chalk styles → colored text
 * // 3. Add timestamp if data.time enabled → [14:30:25.123]
 * // 4. Add label if data.label enabled → [MY_APP]
 * // 5. Apply custom colors if data.colors[log] exists
 * // 6. Windows fix if needed
 *
 * // 輸出：{ name: 'log', arr: ['[14:30:25.123]', '[MY_APP]', 'Hello {...}'] }
 * // Output: { name: 'log', arr: ['[14:30:25.123]', '[MY_APP]', 'Hello {...}'] }
 *
 * @example
 * // 自定義顏色範例：
 * // Custom colors example:
 * const console2 = new Console2({
 *   colors: {
 *     log: 'blue',
 *     error: 'red',
 *     warn: 'yellow',
 *   }
 * });
 *
 * // 當調用 console2.log('msg') 時，所有輸出元素都會套用藍色
 * // When calling console2.log('msg'), all output elements will be colored blue
 */
export function _logArgv(this: Console2, argv: any[], name: string = 'log', failBack = 'log')
{
	/**
	 * 使用 util.format 格式化所有傳入的參數
	 * Format all incoming arguments using util.format
	 */
	let s = (this._logFormat ?? _logFormat).call(this, ...argv);

	/**
	 * 套用 Chalk 樣式到格式化後的字串
	 * Apply Chalk styles to the formatted string
	 */
	let o = (this[SYM_CHALK] ?? chalk)(s);

	let arr = [];

	let data = this[SYM_DATA] ?? {} as null;

	/**
	 * 如果啟用時間戳功能，則格式化時間並加入輸出
	 * If timestamp feature is enabled, format time and add to output
	 */
	if (data.time)
	{
		let ret = (this._time ?? _time).call(this,{
			name,
			argv,
			failBack,
		});

		if (ret != null)
		{
			arr.push(ret);
		}
	}

	/**
	 * 如果啟用標籤功能，檢查標籤是否適用於此日誌類型
	 * If label feature is enabled, check if label applies to this log type
	 */
	if (data.label)
	{
		let _ok = true;

		/**
		 * 如果標籤是陣列格式且不包含當前日誌方法名稱，則跳過
		 * If label is an array format and doesn't include current log method name, skip
		 */
		if (Array.isArray(data.label) && !data.label.includes(name))
		{
			_ok = false;
		}

		if (_ok)
		{
			let ret = (this._labelFormat ?? _labelFormat)({
				name,
				argv,
				failBack,
			});

			if (ret != null)
			{
				arr.push(ret);
			}
		}
	}

	arr.push(o);

	/**
	 * 如果有為特定日誌方法設定自定義顏色，則套用該顏色到所有輸出元素
	 * If custom colors are set for specific log methods, apply that color to all output elements
	 */
	if (arr.length && data.colors?.[name])
	{
		let c: any = data.colors[name];

		if (typeof c === 'string')
		{
			c = chalk[c];
		}

		arr = arr.map(v => c(v));
	}

	/**
	 * Windows 平台的特殊修復：確保在粗體文字後正確重置樣式
	 * Special fix for Windows platform: ensure style is properly reset after bold text
	 *
	 * @FIXME fix bug on windows when after bold
	 * https://github.com/chalk/chalk/issues/145#issuecomment-288985903
	 */
	if (processPlatform() == 'win32' && this.enabledColor)
	{
		arr = arr.map(v => '\u001B[0m' + v + '\u001B[0m');
	}

	/**
	 * 如果目標方法不存在於原始 Console 中，則使用 failBack 方法
	 * If target method doesn't exist in original Console, use failBack method
	 */
	if (!(name in this[SYM_CONSOLE]))
	{
		name = failBack;
	}

	return {
		name,
		arr,
	}
}
