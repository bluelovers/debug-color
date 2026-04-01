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
 * 透過 Object.defineProperty 為目標函式設定一個非可列舉的屬性，用於儲存綁定的 Console2 實例
 * Use Object.defineProperty to set a non-enumerable property on target function for storing bound Console2 instance
 *
 * @param target - 目標函式 / Target function
 * @param me - Console2 實例 / Console2 instance
 * @returns 設定後的函式 / Configured function
 *
 * @example
 * // setBindThis 使用 Object.defineProperty 設定 SYM_THIS 屬性
 * // setBindThis uses Object.defineProperty to set SYM_THIS property
 *
 * // 這是一個 getter 函式，每次存取都會返回綁定的 Console2 實例
 * // This is a getter function, every access returns the bound Console2 instance
 *
 * // 在 _get 中，包裝函式會檢查 fn[SYM_THIS] 來取得正確的 this
 * // In _get, the wrapper function checks fn[SYM_THIS] to get correct this
 *
 * @example
 * // 內部實現原理：
 * // Internal implementation principle:
 *
 * Object.defineProperty(fn, SYM_THIS, {
 *   get() { return me },  // 存取時返回綁定的實例
 *   enumerable: false,   // 屬性不可列舉，避免被 for...in 遍歷
 * });
 *
 * // 這樣即使函式被當作回調函式傳遞，this 仍然是正確的
 * // This way even if the function is passed as callback, this is still correct
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
 *
 * @example
 * // bindBaseMethods 會為 Console2 的所有方法建立 this 綁定
 * // bindBaseMethods creates this binding for all Console2 methods
 *
 * // 這保證了即使將方法當作回調傳遞，this 仍然正確
 * // This ensures that even when passing methods as callbacks, this is still correct
 *
 * // 使用場景：
 * // Usage scenarios:
 * // 1. 將 console2.log 傳遞給其他函式
 * // 1. Passing console2.log to other functions
 * setTimeout(console2.log, 1000, 'delayed message');
 * // 沒有綁定的話，this 會是 timeout，輸出會失敗
 * // Without binding, this would be timeout and output would fail
 *
 * // 2. 作為事件處理器
 * // 2. As event handler
 * element.addEventListener('click', console2.log);
 * // 沒有綁定的話，this 會是 element
 * // Without binding, this would be element
 *
 * @example
 * // 自動調用流程：
 * // Automatic call flow:
 * // Console2 構造函式會自動調用 bindBaseMethods(this)
 * // Console2 constructor automatically calls bindBaseMethods(this)
 *
 * // 這確保了每個 Console2 實例的所有方法都有正確的 this 綁定
 * // This ensures every Console2 instance's methods have correct this binding
 */
export declare function bindBaseMethods(target: any): any;
