
/**
 * 環境檢查模組
 * Environment check module
 *
 * 檢測執行環境是否為 Node.js
 * Check if running environment is Node.js
 *
 * @module debug-color2/lib/chk
 */

/**
 * 檢查是否在 Node.js 環境中執行
 * Check if running in Node.js environment
 *
 * @returns 是否為 Node.js 環境 / Whether is Node.js environment
 */
export function isNodeJs()
{
	try
	{
		require('console');

		// @ts-ignore
		if (console._stdout && console._stderr)
		{
			return true
		}
	}
	catch (e)
	{

	}

	return false
}

export default isNodeJs
