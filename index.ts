/**
 * debug-color2 - 彩色化 Console 輸出的模組
 * Colorize console.log output with customizable styles
 *
 * @module debug-color2
 * @version 1.3.2
 * @author bluelovers
 * @license ISC
 */

// 匯入用於創建 Chalk 回調函數的工具函數
// Import utility function for creating Chalk callback
import { createFnChalkByConsole } from './lib/util';

// 匯出 InspectOptions 類型
// Export InspectOptions type from Node.js util
export { InspectOptions } from 'util';

// 匯入 Console2 主類
// Import Console2 main class
import { Console2 } from './lib/auto';

// 匯出所有類型定義
// Export all type definitions
export * from './lib/types';

// 匯出工具函數
// Export utility functions
export { createChalkStyleLog, hasConsoleStream, isForceColor, isSupportsColor, createFnChalkByConsole, chalkByConsoleMaybe } from './lib/util';

// 匯出 Console2 類別（主類）與別名
// Export Console2 class and alias
export { Console2, Console2 as Console }

/**
 * 預設的彩色 Console 實例
 * Default colorized console instance
 */
export const console = new Console2();

/**
 * 使用 Chalk 搭配 Console 的便捷函數
 * Convenience function to use Chalk with Console
 */
export const chalkByConsole = createFnChalkByConsole(console);

// 預設匯出
// Default export
export default console as Console2;
