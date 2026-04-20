
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
		if (
			typeof process !== 'undefined' && 
			process.release.name.search(/node|io.js/) !== -1
		) {
			return true;
      }
		return false;
	}
	catch (e)
	{

	}
}

export default isNodeJs
