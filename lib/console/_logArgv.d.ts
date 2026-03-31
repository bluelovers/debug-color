import Console2 from '../node';
/**
 * 格式化錯誤參數
 * Format error arguments
 *
 * @param this - Console2 實例 / Console2 instance
 * @param argv - 參數陣列 / Arguments array
 * @param name - 方法名稱 / Method name
 * @param failBack - 備用方法名稱 / Fallback method name
 * @returns 處理後的參數 / Processed arguments
 */
export declare function _logErrorArgv(this: Console2, argv: any[], name?: string, failBack?: string): {
    name: string;
    arr: any[];
};
/**
 * 格式化日誌參數
 * Format log arguments
 *
 * 處理時間戳、標籤、色彩等格式化
 * Handle timestamp, label, color and other formatting
 *
 * @param this - Console2 實例 / Console2 instance
 * @param argv - 參數陣列 / Arguments array
 * @param name - 方法名稱 / Method name
 * @param failBack - 備用方法名稱 / Fallback method name
 * @returns 處理後的參數物件 / Processed arguments object
 */
export declare function _logArgv(this: Console2, argv: any[], name?: string, failBack?: string): {
    name: string;
    arr: any[];
};
