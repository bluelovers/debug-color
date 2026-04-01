import Console2 from '../node';
/**
 * 執行日誌輸出
 * Execute log output
 *
 * 根據 debug 啟用狀態，決定是否執行日誌輸出
 * 若啟用，則呼叫 _logArgv 處理參數並透過原始 Console 輸出
 * Decide whether to execute log output based on debug enabled status
 * If enabled, call _logArgv to process arguments and output via original Console
 *
 * @param this - Console2 實例 / Console2 instance
 * @param name - 日誌類型名稱 / Log type name
 * @param argv - 參數陣列 / Arguments array
 * @param failBack - 備用方法名稱 / Fallback method name
 * @returns 日誌輸出結果 / Log output result
 *
 * @example
 * // _log 由 Console2 內部自動調用，不需要手動調用
 * // _log is automatically called internally by Console2, no manual invocation needed
 *
 * // 內部流程說明：
 * // Internal flow description:
 * // 1. 檢查 this.enabled 是否 !== false
 * // 2. 調用 _logArgv 處理參數（格式化、色彩、標籤等）
 * // 3. 透過原始 console[name](...args) 輸出
 *
 * @example
 * // 備用方法邏輯說明：
 * // Fallback method logic description:
 * // 如果指定的方法（如 'debug'）不存在於原始 console，
 * // 則會使用 failBack（預設為 'log'）作為替代
 * // If specified method (like 'debug') doesn't exist in original console,
 * // failBack (defaults to 'log') will be used as alternative
 */
export declare function _log(this: Console2, name: string, argv: any[], failBack?: string): any;
