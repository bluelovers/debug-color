/**
 * 檢查 debug 是否啟用
 * Check if debug is enabled
 *
 * 透過嚴格不等於 false 來判斷是否啟用 debug
 * Determine if debug is enabled by strict not equal to false
 *
 * @param enabled - 啟用狀態 / Enabled status
 * @returns 是否啟用 / Whether enabled
 */
export declare function _get_enabled(enabled: boolean): enabled is true;
/**
 * 設定 debug 啟用狀態
 * Set debug enabled status
 *
 * 使用空值合併運算子確保預設為 false
 * Use nullish coalescing operator to ensure default is false
 *
 * @param enabled - 啟用狀態 / Enabled status
 * @returns 啟用狀態 / Enabled status
 */
export declare function _set_enabled(enabled: boolean): enabled is true;
