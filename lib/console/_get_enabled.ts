import Console2 from '../node';

/**
 * 檢查 debug 是否啟用
 * Check if debug is enabled
 *
 * @param enabled - 啟用狀態 / Enabled status
 * @returns 是否啟用 / Whether enabled
 */
export function _get_enabled(enabled: boolean): enabled is true
{
	return enabled !== false
}

/**
 * 設定 debug 啟用狀態
 * Set debug enabled status
 *
 * @param enabled - 啟用狀態 / Enabled status
 * @returns 啟用狀態 / Enabled status
 */
export function _set_enabled(enabled: boolean): enabled is true
{
	return (enabled ?? false) !== false
}
