import Console2, { IOptions } from '../node';
/**
 * 格式化時間戳
 * Format timestamp
 *
 * 根據自訂時間格式化函式產生時間戳，若無自訂函式則產生預設格式
 * Generate timestamp from custom time format function, or produce default format if none
 *
 * 處理流程：
 * 1. 檢查是否存在自訂時間格式化函式 (timeFormatFn)
 * 2. 若有自訂函式，則傳遞相關資料並呼叫該函式
 * 3. 若無自訂函式，則使用 Luxon 產生預設格式的時間戳
 *
 * Processing flow:
 * 1. Check if custom time formatting function (timeFormatFn) exists
 * 2. If custom function exists, pass relevant data and call the function
 * 3. If no custom function, use Luxon to generate timestamp with default format
 *
 * @param this - Console2 實例 / Console2 instance
 * @param data - 時間資料 / Time data
 * @returns 格式化後的時間字串 / Formatted time string
 *
 * @example
 * // 預設格式（timeFormat: '[HH:mm:ss.SSS]'）
 * // Default format (timeFormat: '[HH:mm:ss.SSS]')
 *
 * const console2 = new Console2({ time: true });
 * console2.log('test');
 * // Output: [14:30:25.123] test
 *
 * @example
 * // 自訂時間格式
 * // Custom time format
 *
 * const console2 = new Console2({
 *   time: true,
 *   timeFormat: '[yyyy-MM-dd HH:mm:ss]',
 * });
 * console2.log('test');
 * // Output: [2024-01-15 14:30:25] test
 *
 * @example
 * // 自訂時間格式化函式
 * // Custom time formatting function
 *
 * const console2 = new Console2({
 *   time: true,
 *   timeFormatFn: (data) => {
 *     // data.date = DateTime 實例
 *     // data.failBackTimeFormat = 預設格式字串
 *     // data.name = 方法名稱（如 'log'）
 *     return `[${data.date.toFormat('yyyy-MM-dd')}]`;
 *   },
 * });
 * console2.log('test');
 * // Output: [2024-01-15] test
 */
export declare function _time(this: Console2, data?: Parameters<IOptions["labelFormatFn"]>[0]): string;
