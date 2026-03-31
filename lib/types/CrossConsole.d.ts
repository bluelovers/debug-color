/**
 * 跨平台 Console 類型定義
 * Cross-platform Console type definitions
 *
 * 定義跨平台 Console 所需的類型
 * Define types required for cross-platform Console
 *
 * @module debug-color2/lib/types/CrossConsole
 */
import { ITSExtractKeyof, ITSMemberMethods } from 'ts-type/lib/helper/filter';
/**
 * 跨平台 Console 介面
 * Cross-platform Console interface
 *
 * 擴展原生 Console 介面以支援跨平台方法
 * Extends native Console interface to support cross-platform methods
 */
export interface ICrossConsole extends Console {
    /**
     * 輸出例外訊息
     * Output exception message
     *
     * @param message - 例外訊息 / Exception message
     * @param optionalParams - 其他參數 / Additional parameters
     */
    exception(message?: string, ...optionalParams: any[]): void;
    /**
     * 標記時間軸起點
     * Mark timeline start
     *
     * @param label - 標籤 / Label
     */
    markTimeline(label?: string): void;
    /**
     * 建立時間軸
     * Create timeline
     *
     * @param label - 標籤 / Label
     */
    timeline(label?: string): void;
    /**
     * 結束時間軸
     * End timeline
     */
    timelineEnd(): void;
}
/**
 * Console 方法名稱類型
 * Console method name type
 *
 * 從 ICrossConsole 提取的方法名稱集合
 * Collection of method names extracted from ICrossConsole
 */
export type IMethods = Exclude<ITSExtractKeyof<ITSMemberMethods<ICrossConsole>, string>, 'constructor' | 'new' | 'prototype' | 'Console' | 'length'>;
