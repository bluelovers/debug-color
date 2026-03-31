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
 */
export declare function _log(this: Console2, name: string, argv: any[], failBack?: string): any;
