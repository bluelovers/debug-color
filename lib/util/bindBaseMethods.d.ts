/**
 * Console2 方法綁定工具
 * Console2 method binding utility
 *
 * 用於將 Console2 的方法綁定到正確的 this 上下文
 * Used to bind Console2 methods to the correct this context
 *
 * @module debug-color2/lib/util/bindBaseMethods
 * @created 2021/7/10
 */
/**
 * 設定綁定的 this 上下文
 * Set bound this context
 *
 * @param target - 目標函式 / Target function
 * @param me - Console2 實例 / Console2 instance
 * @returns 設定後的函式 / Configured function
 */
export declare function setBindThis(target: any, me: any): any;
/**
 * 綁定所有基礎方法到目標物件
 * Bind all base methods to target object
 *
 * 將 Console2 的所有方法綁定到目標物件，確保 this 上下文正確
 * Bind all Console2 methods to target object to ensure correct this context
 *
 * @param target - 目標 Console2 實例 / Target Console2 instance
 * @returns 綁定後的目標物件 / Bound target object
 */
export declare function bindBaseMethods(target: any): any;
