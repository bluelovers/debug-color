/**
 * Logger 預設實例
 * Logger default instance
 *
 * 預設配置的 Console2 實例，適用於一般日誌輸出
 * Pre-configured Console2 instance for general log output
 *
 * @module debug-color2/logger
 * @created 2020/1/18
 */
import { Console2 } from './lib/auto';
/**
 * 預設 Logger 實例
 * Default Logger instance
 *
 * 配置包含：
 * - label: 顯示標籤
 * - time: 顯示時間戳
 * - colors: 啟用顏色輸出
 *
 * Configuration includes:
 * - label: Show label
 * - time: Show timestamp
 * - colors: Enable color output
 */
export declare const consoleLogger: Console2;
export default consoleLogger;
