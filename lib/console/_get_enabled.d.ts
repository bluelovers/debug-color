/**
 * 檢查 debug 是否啟用
 * Check if debug is enabled
 *
 * 透過嚴格不等於 false 來判斷是否啟用 debug
 * Determine if debug is enabled by strict not equal to false
 *
 * @param enabled - 啟用狀態 / Enabled status
 * @returns 是否啟用 / Whether enabled
 *
 * @example
 * // _get_enabled 使用嚴格不等於 ( !== ) 判斷
 * // _get_enabled uses strict not equal ( !== ) to check
 *
 * // enabled 為 true 時：true !== false → true（啟用）
 * // enabled 为 true 时: true !== false → true（启用）
 * _get_enabled(true);  // → true
 *
 * // enabled 為 undefined 時：undefined !== false → true（啟用）
 * // enabled 为 undefined 时: undefined !== false → true（启用）
 * _get_enabled(undefined);  // → true
 *
 * // enabled 為 false 時：false !== false → false（未啟用）
 * // enabled 为 false 时: false !== false → false（未启用）
 * _get_enabled(false);  // → false
 *
 * @example
 * // 這是 TypeScript 型別守卫 (type guard)
 * // This is a TypeScript type guard
 *
 * // 回傳 true 時，TypeScript 會 narrow type 為 true
 * // When returns true, TypeScript narrows type to true
 *
 * if (_get_enabled(console2.enabled)) {
 *   // 在這裡 console2.enabled 被 narrow 為 true
 *   // Here console2.enabled is narrowed to true
 *   console2.log('Debug is enabled!');
 * }
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
 *
 * @example
 * // _set_enabled 使用空值合併 (??) 確保預設為 false
 * // _set_enabled uses nullish coalescing (??) to ensure default is false
 *
 * // enabled 為 true 時：true ?? false → true
 * _set_enabled(true);  // → true
 *
 * // enabled 為 undefined 時：undefined ?? false → false
 * _set_enabled(undefined);  // → false
 *
 * // enabled 為 null 時：null ?? false → false
 * _set_enabled(null);  // → false
 *
 * // enabled 為 false 時：false ?? false → false
 * _set_enabled(false);  // → false
 *
 * @example
 * // 與 _get_enabled 的主要區別：
 * // Main difference from _get_enabled:
 *
 * // _get_enabled: 嚴格不等於 false（undefined 和 null 都視為啟用）
 * // _get_enabled: strict not equal to false (undefined and null are both treated as enabled)
 * _get_enabled(undefined); // → true
 *
 * // _set_enabled: 空值合併運算子（undefined 和 null 都視為未啟用）
 * // _set_enabled: nullish coalescing (undefined and null are both treated as not enabled)
 * _set_enabled(undefined); // → false
 */
export declare function _set_enabled(enabled: boolean): enabled is true;
