import Console2 from '../node';
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
 */
export declare function _logArgv(this: Console2, argv: any[], name?: string, failBack?: string): {
    name: string;
    arr: any[];
};
