# Debug-Color 函數 API 說明

> Debug-Color 函數功能分類說明文件
> Function classification documentation for Debug-Color

## 目錄 / Table of Contents

- [樣式管理 / Style Management](#樣式管理--style-management)
- [屬性填充 / Property Filling](#屬性填充--property-filling)
- [日誌處理 / Log Processing](#日誌處理--log-processing)
- [時間格式化 / Time Formatting](#時間格式化--time-formatting)
- [方法綁定 / Method Binding](#方法綁定--method-binding)
- [啟用控制 / Enable Control](#啟用控制--enable-control)

---

## 樣式管理 / Style Management

### getStyleNamesByChalk

```typescript
import { getStyleNamesByChalk, styleNames, styleNamesFn, styleNamesWithoutFn } from 'debug-color2/lib/styles';
```

**描述 / Description**

從 Chalk 實例取得所有可用的樣式名稱列表。透過取得 Chalk 建構函式的 prototype，並過濾出所有可用的樣式方法名稱。

Obtain all available style names from Chalk instance. Get all available style method names by accessing Chalk constructor's prototype.

**使用方式 / Usage**

```typescript
import chalk from 'chalk';
import { getStyleNamesByChalk } from 'debug-color2/lib/styles';

// 取得 Chalk 的所有樣式名稱
const names = getStyleNamesByChalk(chalk);
// ['bold', 'italic', 'underline', 'inverse', 'white', 'grey', 'black', ...]

// 也可以直接使用預先定義的常數
import { styleNames, styleNamesFn, styleNamesWithoutFn } from 'debug-color2/lib/styles';

console.log(styleNames);        // 所有樣式名稱陣列
console.log(styleNamesFn);       // 需要參數的樣式 ['rgb', 'hsl', 'hex', ...]
console.log(styleNamesWithoutFn); // 不需要參數的樣式 ['bold', 'italic', ...]
```

**範例 / Example**

```typescript
// 取得樣式名稱並過濾
import chalk from 'chalk';
import { getStyleNamesByChalk, styleNamesFn, styleNamesWithoutFn } from 'debug-color2/lib/styles';

const allStyles = getStyleNamesByChalk(chalk);

// 只取得非函式型樣式（可直接使用）
console.log(styleNamesWithoutFn); // ['bold', 'italic', 'underline', 'inverse', 'hidden', 'visible', 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'grey', 'blackBright', 'redBright', 'greenBright', 'yellowBright', 'blueBright', 'magentaBright', 'cyanBright', 'whiteBright']

// 只取得函式型樣式（需要傳入參數）
console.log(styleNamesFn); // ['rgb', 'hsl', 'hsv', 'hwb', 'bgHex', 'bgKeyword', 'bgRgb', 'bgHsl', 'bgHsv', 'bgHwb', 'hex', 'keyword']
```

**類型定義 / Type Definition**

```typescript
export function getStyleNamesByChalk(chalk): (keyof IStyles)[]
```

**相關常數 / Related Constants**

| 常數 | 說明 | 類型 |
|------|------|------|
| `styleNames` | 所有樣式名稱陣列 | `string[]` |
| `styleNamesFn` | 需要參數的樣式（如 rgb, hex, hsl） | `IStylesFnNames[]` |
| `styleNamesWithoutFn` | 不需要參數的樣式（如 bold, italic） | `IStylesNamesWithoutFn[]` |

---

### chalkByConsoleMaybe

```typescript
import { chalkByConsoleMaybe } from 'debug-color2/lib/util';
```

**描述 / Description**

取得 Chalk 實例的安全函數，若傳入的 Console2 實例不存在 Chalk，則自動回退到預設的 chalk。

Get Chalk instance safely, fallback to default chalk if the passed Console2 doesn't have one.

**使用方式 / Usage**

```typescript
import { chalkByConsoleMaybe } from 'debug-color2/lib/util';
import { Console2 } from 'debug-color2/lib/node';

// 有 Console2 實例的情況
const console2 = new Console2();
const chalk1 = chalkByConsoleMaybe(console2); // 使用 console2.chalk

// 沒有 Console2 實例的情況
const chalk2 = chalkByConsoleMaybe(); // 使用預設的 chalk

// 明確傳入 undefined
const chalk3 = chalkByConsoleMaybe(undefined); // 使用預設的 chalk
```

**範例 / Example**

```typescript
import { chalkByConsoleMaybe } from 'debug-color2/lib/util';
import { Console2 } from 'debug-color2/lib/node';

// 情況 1: 使用 Console2 實例
const console2 = new Console2();
const chalk = chalkByConsoleMaybe(console2);
console.log(chalk.red('紅色文字')); // 輸出帶顏色的文字

// 情況 2: 無 Console2 時回退
const fallbackChalk = chalkByConsoleMaybe();
console.log(fallbackChalk.blue('藍色文字'));

// 情況 3: 在函式參數中使用
function logWithColor(console2Instance, message) {
    const chalk = chalkByConsoleMaybe(console2Instance);
    console.log(chalk.green(message));
}

logWithColor(new Console2(), 'Hello'); // 有顏色
logWithColor(null, 'Hello');           // 無 Console2，使用預設 chalk
```

**類型定義 / Type Definition**

```typescript
export function chalkByConsoleMaybe<CI extends Console2>(console?: CI): IChalk
```

**備註 / Note**

此函式使用可選串聯（optional chaining）與空值合併運算子（nullish coalescing）：
```typescript
return console?.chalk ?? chalk
```
若 `console` 為 `undefined` 或 `console.chalk` 為 `undefined`，則回退到預設的 `chalk`。

---

### createFnChalkByConsole

```typescript
import { createFnChalkByConsole } from 'debug-color2/lib/util';
```

**描述 / Description**

建立一個高階函數，用於在回調中存取 Console2 實例的 Chalk 實例。此函數返回一个闭包，包含對 Console2 實例的引用。

Create a higher-order function to access the Chalk instance of Console2 in a callback. This function returns a closure containing reference to Console2 instance.

**使用方式 / Usage**

```typescript
import { createFnChalkByConsole } from 'debug-color2/lib/util';
import { Console2 } from 'debug-color2/lib/node';

const console2 = new Console2();
const chalkFn = createFnChalkByConsole(console2);

// 在回調中存取 chalk 和 console2
const result = chalkFn((chalk, _console) => {
    return chalk.red('Hello World');
});
```

**範例 / Example**

```typescript
import { createFnChalkByConsole } from 'debug-color2/lib/util';
import { Console2 } from 'debug-color2/lib/node';

const console2 = new Console2();

// 建立存取函式
const chalkFn = createFnChalkByConsole(console2);

// 使用回調函式處理輸出
const styledMessage = chalkFn((chalk, _console) => {
    // 在這裡可以同時存取 chalk 和 _console
    return chalk.bold.yellow('警告：') + ' ' + chalk.red('發生錯誤');
});
console.log(styledMessage);

// 另一個範例：多次輸出
chalkFn((chalk, _console) => {
    _console.log(chalk.blue('資訊訊息'));
    _console.error(chalk.red('錯誤訊息'));
});

// 可覆寫第二個參數使用其他 Console2 實例
const anotherConsole2 = new Console2();
chalkFn((chalk, _console) => {
    console.log(chalk.green('使用另一個實例'));
}, anotherConsole2);
```

**類型定義 / Type Definition**

```typescript
export function createFnChalkByConsole<CI extends Console2>(console: CI)
    : <R, C extends Console2 = CI>(cb: (chalk: C["chalk"], _console: C) => R, _console?: C) => R
```

**回調函式類型 / Callback Function Type**

```typescript
(chalk: C["chalk"], _console: C) => R
```

| 參數 | 類型 | 說明 |
|------|------|------|
| `chalk` | `C["chalk"]` | Console2 實例的 Chalk 實例 |
| `_console` | `C` | Console2 本身 |

**應用場景 / Use Cases**

1. **包裝現有函式**：將需要 Chalk 的函式包裝，使其可接受 Console2
2. **延遲執行**：建立一個延遲存取 Chalk 的函式
3. **測試模擬**：在測試中模擬 Console2 的 Chalk 存取

---

## 屬性填充 / Property Filling

### fillProperty

```typescript
import { fillProperty, methods, methods_stdout, methods_stderr, methods_output, methods_other, methods_inspector } from 'debug-color2/lib/fill-property';
```

**描述 / Description**

為目標物件填入缺失的 Console 方法。根據方法分類列表，將預設函式填充到目標物件中缺失的方法。

Fill missing Console methods to target object. Fill default function into missing methods according to method classification list.

**使用方式 / Usage**

```typescript
import { fillProperty } from 'debug-color2/lib/fill-property';

// 使用預設值（填入 console 所有缺失的方法）
const filledConsole = fillProperty();

// 指定目標物件
const myConsole = {};
fillProperty(myConsole);

// 指定方法列表和自定義函式
fillProperty(myConsole, ['log', 'error'], (msg) => console.log('[CUSTOM]', msg));
```

**範例 / Example**

```typescript
import { fillProperty, methods_stdout, methods_stderr, methods_output, methods_other, methods_inspector } from 'debug-color2/lib/fill-property';

// 範例 1: 使用預設值填充全域 console
const enhancedConsole = fillProperty();
// 現在 enhancedConsole 包含所有標準 Console 方法

// 範例 2: 指定目標物件
const myLogger = { name: 'MyLogger' };
fillProperty(myLogger);
console.log(myLogger.log);    // [Function]
console.log(myLogger.error);  // [Function]
console.log(myLogger.debug);  // [Function]

// 範例 3: 指定特定方法列表
const customLogger = {};
fillProperty(customLogger, methods_stdout, (...args) => {
    console.log('[LOG]', ...args);
});
customLogger.log('Hello');    // 輸出: [LOG] Hello
customLogger.debug('Debug');  // undefined (未填充)

// 範例 4: 分別填充不同類別的方法
const categoryLogger = {};
fillProperty(categoryLogger, methods_stderr, (...args) => {
    console.error('[ERROR]', ...args);
});
fillProperty(categoryLogger, methods_output, (...args) => {
    console.log('[OUTPUT]', ...args);
});

// 範例 5: 自定義空函式行為
const silentLogger = {};
fillProperty(silentLogger, methods, () => {
    // 完全靜默，不輸出任何內容
});
silentLogger.log('這不會輸出任何東西');
```

**方法分類 / Method Classification**

| 分類 | 方法列表 | 說明 |
|------|----------|------|
| `methods_stdout` | `debug`, `info`, `log` | 輸出到標準輸出串流的方法 |
| `methods_stderr` | `assert`, `error`, `trace`, `warn`, `exception` | 輸出到標準錯誤串流的方法 |
| `methods_output` | `table`, `dir`, `dirxml` | 格式化輸出方法 |
| `methods_other` | `clear`, `group`, `groupCollapsed`, `groupEnd`, `time`, `timeEnd`, `count` | 輔助功能方法 |
| `methods_inspector` | `profile`, `profileEnd`, `timeStamp`, `markTimeline`, `timeline`, `timelineEnd` | 僅在檢視器中可用的方法 |
| `methods` | 所有方法的合併 | 所有 Console 方法的完整列表 |

**類型定義 / Type Definition**

```typescript
export function fillProperty<T extends object = Console, P extends string[] = IMethods[], U extends (...argv: any) => any = (...argv: any) => void>(
    target?: T,
    ls?: P,
    fn?: U
): T & IFillProperty<T, IValueOfArray<P>, U>
```

| 泛型參數 | 預設值 | 說明 |
|----------|--------|------|
| `T` | `Console` | 目標物件的類型 |
| `P` | `IMethods[]` | 方法名稱列表的類型 |
| `U` | `(...argv: any) => void` | 預設函式的類型 |

**行為說明 / Behavior**

1. 若 `target` 未提供，預設使用全域 `console`
2. 若 `ls`（方法列表）未提供，預設使用所有 `methods`
3. 若 `fn`（預設函式）未提供，預設使用空函式 `noop`
4. 只會填充目標物件中**不存在**的方法，不會覆寫既有方法

---

## 日誌處理 / Log Processing

### _log

```typescript
import { _log } from 'debug-color2/lib/console/_log';
```

**描述 / Description**

執行日誌輸出的核心函數。根據 debug 啟用狀態，決定是否執行日誌輸出。若啟用，則呼叫 `_logArgv` 處理參數並透過原始 Console 輸出。

Execute log output core function. Decide whether to execute log output based on debug enabled status. If enabled, call `_logArgv` to process arguments and output via original Console.

**使用方式 / Usage**

```typescript
import { _log } from 'debug-color2/lib/console/_log';
import { Console2 } from 'debug-color2/lib/node';

const console2 = new Console2();

// 呼叫 _log 輸出日誌
console2._log('log', ['Hello World']);
console2._log('error', ['Error message'], 'error');
```

**範例 / Example**

```typescript
import { Console2 } from 'debug-color2/lib/node';

const console2 = new Console2();

// 基本的日誌輸出
console2._log('log', ['This is a log message']);
console2._log('info', ['This is an info message']);
console2._log('debug', ['This is a debug message']);

// 錯誤日誌輸出
console2._log('error', ['An error occurred']);
console2._log('warn', ['A warning message']);

// 使用自定義 failBack
console2._log('customMethod', ['Custom output'], 'log');

// 當 debug 禁用時，不會輸出任何內容
const disabledConsole = new Console2({ enabled: false });
disabledConsole._log('log', ['This will not be printed']);
```

**處理流程 / Processing Flow**

1. 檢查 `enabled` 狀態（使用 `_get_enabled`）
2. 若啟用，呼叫 `_logArgv` 處理參數
3. 使用處理後的資料呼叫原始 Console 的對應方法
4. 若未啟用，直接返回 `undefined`

**類型定義 / Type Definition**

```typescript
export function _log(this: Console2, name: string, argv: any[], failBack = 'log')
```

| 參數 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `this` | `Console2` | - | Console2 實例 |
| `name` | `string` | - | 日誌方法名稱（如 'log', 'error', 'info'） |
| `argv` | `any[]` | - | 傳遞給日誌方法的參數陣列 |
| `failBack` | `string` | `'log'` | 當指定的方法不存在時使用的備用方法 |

**回傳值 / Return Value**

- 若已啟用：回傳原始 Console 方法的執行結果
- 若未啟用：回傳 `undefined`

---

### _logArgv

```typescript
import { _logArgv } from 'debug-color2/lib/console/_logArgv';
```

**描述 / Description**

格式化日誌參數的核心函數。處理時間戳、標籤、色彩等格式化。

Format log arguments core function. Handle timestamp, label, color and other formatting.

**處理流程 / Processing Flow**

1. **格式化管理**: 使用 `util.format` 格式化所有傳入的參數
2. **樣式應用**: 套用 Chalk 樣式到格式化後的字串
3. **時間戳處理**: 根據設定加入時間戳（若啟用）
4. **標籤處理**: 根據設定加入標籤（若啟用，且標籤適用於此日誌類型）
5. **顏色處理**: 為特定日誌方法套用自定義顏色（若有設定）
6. **平台修復**: Windows 平台的特殊修復（確保樣式正確重置）
7. **方法回退**: 若目標方法不存在，則使用 failBack 方法

**使用方式 / Usage**

```typescript
import { _logArgv } from 'debug-color2/lib/console/_logArgv';
import { Console2 } from 'debug-color2/lib/node';

const console2 = new Console2();

// 格式化日誌參數
const result = console2._logArgv(['Hello World'], 'log', 'log');
// result: { name: 'log', arr: ['[格式化後的字串]'] }
```

**範例 / Example**

```typescript
import { Console2 } from 'debug-color2/lib/node';

const console2 = new Console2({
    time: true,     // 啟用時間戳
    label: 'APP',   // 啟用標籤
});

// 基本格式化
const result1 = console2._logArgv(['Hello World'], 'log', 'log');
console.log(result1);
// { name: 'log', arr: ['[14:30:25.123]', '[APP]', 'Hello World'] }

// 多參數格式化
const result2 = console2._logArgv(['User:', { name: 'John', age: 30 }], 'info', 'info');
console.log(result2);
// { name: 'info', arr: ['[14:30:25.123]', '[APP]', 'User: { name: \'John\', age: 30 }'] }

// 錯誤日誌格式化（預設使用 error 方法）
const result3 = console2._logErrorArgv(['Error: something went wrong']);
console.log(result3);
// { name: 'error', arr: ['[14:30:25.123]', '[APP]', 'Error: something went wrong'] }

// 自定義顏色配置
const coloredConsole = new Console2({
    colors: {
        error: 'red',
        warn: 'yellow',
    }
});
const result4 = coloredConsole._logArgv(['Warning message'], 'warn', 'warn');
console.log(result4);
// { name: 'warn', arr: ['[黃色文字]Warning message'] }

// 方法不存在時的回退
const result5 = console2._logArgv(['test'], 'nonExistentMethod', 'log');
console.log(result5);
// { name: 'log', arr: ['[...]'] } - 回退到 log 方法
```

**類型定義 / Type Definition**

```typescript
export function _logArgv(this: Console2, argv: any[], name: string = 'log', failBack = 'log'): {
    name: string;
    arr: any[];
}
```

| 回傳屬性 | 類型 | 說明 |
|----------|------|------|
| `name` | `string` | 實際使用的方法名稱（可能因回退而改變） |
| `arr` | `any[]` | 處理後的參數陣列（包含時間戳、標籤、格式化後的訊息） |

**Windows 平台修復 / Windows Platform Fix**

當執行在 Windows 平台時，會在每個輸出元素前後加入 `\u001B[0m`（重置 ANSI escape code），以確保樣式正確重置：

```typescript
if (processPlatform() == 'win32' && this.enabledColor)
{
    arr = arr.map(v => '\u001B[0m' + v + '\u001B[0m');
}
```

---

### _logErrorArgv

```typescript
import { _logErrorArgv } from 'debug-color2/lib/console/_logArgv';
```

**描述 / Description**

錯誤專用的參數處理函數。實際處理邏輯委託給 `_logArgv`，預設使用 'error' 作為方法名稱。

Error-specific argument processing function. Actual logic delegated to `_logArgv`, using 'error' as default method name.

**使用方式 / Usage**

```typescript
import { _logErrorArgv } from 'debug-color2/lib/console/_logArgv';
import { Console2 } from 'debug-color2/lib/node';

const console2 = new Console2();

// 格式化錯誤日誌參數
const result = console2._logErrorArgv(['Error message']);
// 等同於 _logArgv(['Error message'], 'error', 'error')
```

**範例 / Example**

```typescript
import { Console2 } from 'debug-color2/lib/node';

const console2 = new Console2({
    time: true,
    label: 'ERROR',
});

// 基本錯誤訊息格式化
const result1 = console2._logErrorArgv(['Something went wrong']);
console.log(result1);
// { name: 'error', arr: ['[14:30:25.123]', '[ERROR]', 'Something went wrong'] }

// 包含物件的錯誤訊息
const result2 = console2._logErrorArgv(['Validation failed', { field: 'email', reason: 'invalid' }]);
console.log(result2);
// { name: 'error', arr: ['[14:30:25.123]', '[ERROR]', 'Validation failed', { field: 'email', reason: 'invalid' }] }

// 自訂方法名稱
const result3 = console2._logErrorArgv(['Critical error'], 'exception', 'error');
console.log(result3);
// { name: 'exception', arr: ['[14:30:25.123]', '[ERROR]', 'Critical error'] }

// 等同於直接呼叫 _logArgv
const manualResult = console2._logArgv(['Error message'], 'error', 'error');
const errorResult = console2._logErrorArgv(['Error message']);
// 兩者結果相同
```

**類型定義 / Type Definition**

```typescript
export function _logErrorArgv(this: Console2, argv: any[], name: string = 'error', failBack = 'error')
```

| 參數 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `this` | `Console2` | - | Console2 實例 |
| `argv` | `any[]` | - | 錯誤訊息參數陣列 |
| `name` | `string` | `'error'` | 方法名稱（預設為 'error'） |
| `failBack` | `string` | `'error'` | 備用方法名稱 |

**與 _logArgv 的差異 / Difference from _logArgv**

| 特性 | `_logArgv` | `_logErrorArgv` |
|------|-----------|-----------------|
| 預設 `name` | `'log'` | `'error'` |
| 預設 `failBack` | `'log'` | `'error'` |
| 主要用途 | 一般日誌 | 錯誤日誌 |

---

### _logFormat

```typescript
import { _logFormat } from 'debug-color2/lib/console/_logFormat';
```

**描述 / Description**

日誌格式化工具，使用 Node.js 內建的 `util.format` 進行格式化。

Log format utility, use Node.js built-in `util.format` for formatting.

**使用方式 / Usage**

```typescript
import { _logFormat } from 'debug-color2/lib/console/_logFormat';

// 使用方式與 util.format 相同
const formatted = _logFormat('%s: %j', 'key', { value: 123 });
// 'key: {"value":123}'
```

**範例 / Example**

```typescript
import { _logFormat } from 'debug-color2/lib/console/_logFormat';

// 基本字串格式化
_logFormat('Hello %s', 'World');
// 'Hello World'

// 多個佔位符
_logFormat('%s has %d points', 'Alice', 100);
// 'Alice has 100 points'

// 數字格式化
_logFormat('Count: %d, Price: %f', 42, 19.99);
// 'Count: 42, Price: 19.990000'

// JSON 格式化
_logFormat('Data: %j', { name: 'John', age: 30 });
// 'Data: {"name":"John","age":30}'

// 百分比符號
_logFormat('Progress: 50%%');
// 'Progress: 50%'

// 混合使用
_logFormat('%s: %j (error code: %d)', 'API Error', { status: 500 }, 500);
// 'API Error: {"status":500} (error code: 500)'

// 沒有格式化參數時，直接返回字串
_logFormat('Plain text');
// 'Plain text'

// 多餘的參數會被串聯
_logFormat('Hello %s', 'World', 'extra');
// 'Hello World extra'
```

**類型定義 / Type Definition**

```typescript
export const _logFormat: (format: string, ...args: any[]) => string
```

**格式化語法 / Format Syntax**

| 格式符 | 說明 | 範例 |
|--------|------|------|
| `%s` | 字串格式化 | `%s` → `'Hello'` |
| `%d` | 數字格式化（整數） | `%d` → `42` |
| `%f` | 浮點數格式化 | `%f` → `3.14` |
| `%j` | JSON 格式化 | `%j` → `'{"key":"value"}'` |
| `%%` | 百分比符號 | `50%%` → `50%` |
| `%o` | 物件簡短描述 | `%o` → `'Object'` |
| `%O` | 物件詳細描述 | `%O` → `'{...}'` |

**實際用途 / Practical Use**

在 `_logArgv` 中用於將多個參數格式化為單一字串：

```typescript
// 實際在 _logArgv 中的使用
let s = (this._logFormat ?? _logFormat).call(this, ...argv);

// 輸入: ['User:', { name: 'John' }]
// 輸出: 'User: { name: \'John\' }'
```

---

## 時間格式化 / Time Formatting

### _time

```typescript
import { _time } from 'debug-color2/lib/console/_time';
```

**描述 / Description**

格式化時間戳的函數。根據自訂時間格式化函式產生時間戳，若無自訂函式則產生預設格式。

Format timestamp function. Generate timestamp from custom time format function, or produce default format if none.

**使用方式 / Usage**

```typescript
import { _time } from 'debug-color2/lib/console/_time';
import { Console2 } from 'debug-color2/lib/node';

const console2 = new Console2();

// 使用預設格式
const time1 = console2._time(); // '14:30:25.123'

// 傳遞自訂資料（包含時間格式化函式）
const time2 = console2._time({
    name: 'log',
    argv: ['test'],
    failBack: 'log'
});
```

**範例 / Example**

```typescript
import { Console2 } from 'debug-color2/lib/node';

// 預設時間格式
const console1 = new Console2({ time: true });
console.log(console1._time());
// 輸出: '[14:30:25.123]'

// 自訂時間格式
const console2 = new Console2({
    time: true,
    timeFormat: '[YYYY-MM-DD HH:mm:ss]'  // 使用 Luxon 格式
});
console.log(console2._time());
// 輸出: '[2024-01-15 14:30:25]'

// 傳遞上下文資料
const console3 = new Console3({
    time: true,
    timeFormatFn: ({ date, failBackTimeFormat, name, argv }) => {
        // 自訂格式化邏輯
        return `[${date.toFormat(failBackTimeFormat)}] [${name.toUpperCase()}]`;
    }
});
console.log(console3._time({ name: 'info', argv: ['test'], failBack: 'log' }));
// 輸出: '[14:30:25.123] [INFO]'

// 帶毫秒的精細時間格式
const console4 = new Console4({
    time: true,
    timeFormat: '[HH:mm:ss.SSS]'  // 時:分:秒.毫秒
});
console.log(console4._time());
// 輸出: '14:30:25.123'

// 僅在有資料時返回
const console5 = new Console5();  // time 未啟用
console.log(console5._time({ name: 'log', argv: [], failBack: 'log' }));
// 輸出: undefined (因為 time 選項未啟用)
```

**自訂時間格式 / Custom Time Format**

可在建立 Console2 時傳入 `timeFormatFn` 選項：

```typescript
import { Console2 } from 'debug-color2/lib/node';

const console2 = new Console2({
    time: true,
    timeFormatFn: ({ date, failBackTimeFormat }) => {
        return date.toFormat(failBackTimeFormat);
    }
});
```

**預設格式 / Default Format**

```
[HH:mm:ss.SSS]  // 例如: 14:30:25.123
```

| 格式符 | 說明 | 範例 |
|--------|------|------|
| `HH` | 24 小時制（小時，補零） | `14` |
| `mm` | 分鐘（補零） | `30` |
| `ss` | 秒（補零） | `25` |
| `SSS` | 毫秒（3 位數） | `123` |

**類型定義 / Type Definition**

```typescript
export function _time(this: Console2, data?: {
    name: string;
    argv: any[];
    failBack: string;
}): string
```

| 參數 | 類型 | 說明 |
|------|------|------|
| `this` | `Console2` | Console2 實例 |
| `data.name` | `string` | 日誌方法名稱 |
| `data.argv` | `any[]` | 日誌參數陣列 |
| `data.failBack` | `string` | 備用方法名稱 |

**回傳值 / Return Value**

- 若 `time` 選項啟用：回傳格式化後的時間字串
- 若 `time` 選項未啟用：回傳 `undefined`

---

## 方法綁定 / Method Binding

### _get

```typescript
import { _get } from 'debug-color2/lib/util/bindBaseMethods';
```

**描述 / Description**

將原始的 Console 方法包裝成一个新的函式，確保 this 上下文正確。透過建立包裝函式，自動處理不同呼叫情境下的 this 綁定。

Wrap original Console method into a new function to ensure correct this context. Create wrapper function to automatically handle this binding in different call scenarios.

**使用方式 / Usage**

```typescript
import { _get } from 'debug-color2/lib/util/bindBaseMethods';
import { Console2 } from 'debug-color2/lib/node';

const console2 = new Console2();

// 取得綁定後的 log 方法
const boundLog = _get(console2, 'log');

// 直接呼叫（this 會自動綁定到 console2）
boundLog('Hello World');
```

**範例 / Example**

```typescript
import { _get } from 'debug-color2/lib/util/bindBaseMethods';
import { Console2 } from 'debug-color2/lib/node';

const console2 = new Console2();

// 取得綁定後的方法
const boundLog = _get(console2, 'log');
const boundError = _get(console2, 'error');
const boundWarn = _get(console2, 'warn');

// 直接呼叫
boundLog('This is log');
boundError('This is error');
boundWarn('This is warning');

// 作為回調傳遞
function processLog(fn, message) {
    fn(message);
}

processLog(boundLog, 'Passed through bound function');

// this 綁定邏輯測試
const obj = { customMethod: boundLog };
obj.customMethod('Called via another object'); // this 會被忽略，仍使用 console2

// 測試不同呼叫方式
const arr = [boundLog];
arr[0]('Called from array'); // this 會被忽略，仍使用 console2
```

**this 綁定邏輯 / this Binding Logic**

1. 若 `this` 是 Console2 實例：使用該實例
2. 若 `this` 有值（其他物件）：使用該物件
3. 若未傳遞 `this`：使用預設綁定的 console2 實例

```typescript
// 內部實現邏輯
if (this instanceof Console2)
{
    self = this
}
else if (typeof this !== 'undefined')
{
    self = this
}
else if (fn[SYM_THIS])  // 預設綁定的 this
{
    self = fn[SYM_THIS]
}
```

**類型定義 / Type Definition**

```typescript
function _get<P extends IMethods>(target: Console2, name: P): Console2[P]
```

| 參數 | 類型 | 說明 |
|------|------|------|
| `target` | `Console2` | Console2 實例 |
| `name` | `P` | 方法名稱（IMethods 的鍵） |

**使用場景 / Use Cases**

1. **方法傳遞**：將 Console2 方法作為回調傳遞時保持正確的 this
2. **陣列操作**：在陣列方法中使用 Console2 方法
3. **事件處理**：在事件監聽器中使用 Console2 方法

---

### setBindThis

```typescript
import { setBindThis } from 'debug-color2/lib/util/bindBaseMethods';
```

**描述 / Description**

透過 Object.defineProperty 為目標函式設定一個非可列舉的屬性，用於儲存綁定的 Console2 實例。

Use Object.defineProperty to set a non-enumerable property on target function for storing bound Console2 instance.

**使用方式 / Usage**

```typescript
import { setBindThis } from 'debug-color2/lib/util/bindBaseMethods';

function myFunction() {
    return this.console;
}

const console2 = new Console2();
setBindThis(myFunction, console2);

// 現在 myFunction 會自動使用 console2 作為 this
myFunction(); // 返回 console2
```

**範例 / Example**

```typescript
import { setBindThis } from 'debug-color2/lib/util/bindBaseMethods';
import { Console2 } from 'debug-color2/lib/node';

const console2 = new Console2();

// 基本使用
function getConsole() {
    return this.console2Instance;
}
setBindThis(getConsole, console2);

console.log(getConsole() === console2); // true

// 在包裝函式中使用
function createLogger(prefix) {
    return function log(message) {
        console.log(`[${prefix}]`, message, this.console2Instance?.enabled);
    };
}
setBindThis(createLogger('INFO'), console2);

const logger = createLogger('DEBUG');
logger('Test message'); // [DEBUG] Test message true

// 檢查屬性是否存在
function checkBind() {
    console.log('Has SYM_THIS:', !!this[SYM_THIS]);
    return this[SYM_THIS];
}
setBindThis(checkBind, console2);
checkBind(); // Has SYM_THIS: true
```

**類型定義 / Type Definition**

```typescript
export function setBindThis(target: Function, me: any): Function
```

| 參數 | 類型 | 說明 |
|------|------|------|
| `target` | `Function` | 要設定屬性的目標函式 |
| `me` | `any` | 要儲存的 Console2 實例 |

**實現細節 / Implementation Details**

使用 `Object.defineProperty` 設定一個 getter：
```typescript
Object.defineProperty(target, SYM_THIS, {
    get() {
        return me
    },
    enumerable: false,  // 非可列舉
})
```

這確保了：
1. 屬性不會出現在 `Object.keys()` 或 `for...in` 迴圈中
2. 透過 getter 存取，永遠返回同一個實例
3. 無法直接修改綁定的 this 值

---

### bindBaseMethods

```typescript
import { bindBaseMethods } from 'debug-color2/lib/util/bindBaseMethods';
```

**描述 / Description**

將 Console2 的所有方法綁定到目標物件，確保 this 上下文正確。這是初始化 Console2 時的關鍵步驟。

Bind all Console2 methods to target object to ensure correct this context. This is a key step when initializing Console2.

**使用方式 / Usage**

```typescript
import { bindBaseMethods } from 'debug-color2/lib/util/bindBaseMethods';
import { Console2 } from 'debug-color2/lib/node';

const console2 = new Console2();

// 綁定所有基礎方法
bindBaseMethods(console2);
```

**範例 / Example**

```typescript
import { bindBaseMethods } from 'debug-color2/lib/util/bindBaseMethods';
import { Console2 } from 'debug-color2/lib/node';

// 創建 Console2 實例
const console2 = new Console2();

// 綁定所有方法
bindBaseMethods(console2);

// 現在所有方法都正確綁定
console2.log('Log message');
console2.info('Info message');
console2.warn('Warning message');
console2.error('Error message');
console2.debug('Debug message');

// 將方法傳遞給其他函式
function processLogMethod(fn) {
    fn('Processing log');
}
processLogMethod(console2.log); // this 仍然正確綁定

// 在陣列中使用
const methods = [console2.log, console2.info, console2.error];
methods.forEach(m => m('Called from array'));

// 驗證綁定
console.log(console2.log[SYM_THIS] === console2); // true
```

**類型定義 / Type Definition**

```typescript
export function bindBaseMethods(target: Console2): Console2
```

| 參數 | 類型 | 回傳值 |
|------|------|--------|
| `target` | `Console2` | 綁定後的 Console2 實例 |

**內部流程 / Internal Flow**

```typescript
export function bindBaseMethods(target)
{
    // 遍历所有方法
    methods.forEach(m => {
        // 為每個方法建立包裝函式
        target[m] = _get(target, m)
    })

    return target
}
```

**方法列表 / Methods List**

會綁定以下所有方法：
- `methods_stdout`: debug, info, log
- `methods_stderr`: assert, error, trace, warn, exception
- `methods_output`: table, dir, dirxml
- `methods_other`: clear, group, groupCollapsed, groupEnd, time, timeEnd, count
- `methods_inspector`: profile, profileEnd, timeStamp, markTimeline, timeline, timelineEnd

---

## 啟用控制 / Enable Control

### _get_enabled

```typescript
import { _get_enabled, _set_enabled } from 'debug-color2/lib/console/_get_enabled';
```

**描述 / Description**

檢查 debug 是否啟用的函數。透過嚴格不等於 false 來判斷，這表示任何非 false 值（包括 undefined、null）都會被視為啟用。

Check if debug is enabled function. Determine by strict not equal to false, meaning any non-false value (including undefined, null) will be treated as enabled.

**使用方式 / Usage**

```typescript
import { _get_enabled, _set_enabled } from 'debug-color2/lib/console/_get_enabled';

// 檢查啟用狀態
const isEnabled = _get_enabled(true);   // true
const isEnabled2 = _get_enabled(false); // false

// 設定啟用狀態（預設 false）
const setResult = _set_enabled(true);    // true
const setResult2 = _set_enabled(null);  // false
```

**範例 / Example**

```typescript
import { _get_enabled, _set_enabled } from 'debug-color2/lib/console/_get_enabled';

// 測試各種輸入值
console.log(_get_enabled(true));     // true
console.log(_get_enabled(false));    // false
console.log(_get_enabled(undefined)); // true (非 false 值視為啟用)
console.log(_get_enabled(null));      // true (非 false 值視為啟用)
console.log(_get_enabled(1));         // true
console.log(_get_enabled('enabled')); // true

// _set_enabled 的行為
console.log(_set_enabled(true));      // true
console.log(_set_enabled(false));     // false
console.log(_set_enabled(undefined)); // false
console.log(_set_enabled(null));      // false

// 在 Console2 中使用
import { Console2 } from 'debug-color2/lib/node';

const console1 = new Console2({ enabled: true });
console.log(_get_enabled(console1.enabled)); // true

const console2 = new Console2({ enabled: false });
console.log(_get_enabled(console2.enabled)); // false

const console3 = new Console2(); // 預設 enabled 為 undefined
console.log(_get_enabled(console3.enabled)); // true (視為啟用)

// 實際應用
if (_get_enabled(console1.enabled)) {
    console1.log('Debug is enabled, logging...');
}
```

**邏輯說明 / Logic Description**

| 輸入值 | `_get_enabled` 結果 | `_set_enabled` 結果 | 說明 |
|--------|---------------------|---------------------|------|
| `true` | true | true | 明確啟用 |
| `false` | false | false | 明確停用 |
| `undefined` | true | false | 未設定，視為啟用 |
| `null` | true | false | 空值，視為停用 |
| `1` | true | true | Truthy 值視為啟用 |
| `0` | false | false | Falsy 值視為停用 |

**實現原理 / Implementation**

```typescript
// _get_enabled
export function _get_enabled(enabled: boolean): enabled is true
{
    return enabled !== false  // 只有明確為 false 時才回傳 false
}

// _set_enabled
export function _set_enabled(enabled: boolean): enabled is true
{
    return (enabled ?? false) !== false  // null/undefined 視為 false
}
```

**類型定義 / Type Definition**

```typescript
export function _get_enabled(enabled: boolean): enabled is true
export function _set_enabled(enabled: boolean): enabled is true
```

**類型衛士 / Type Guard**

這兩個函式都使用了 TypeScript 的類型衛士（Type Guard）：
- 回傳 `enabled is true` 表示回傳 `true` 時，參數類型會被縮小為 `true`
- 可用於條件分支中自動縮小類型

```typescript
const enabled = console.enabled;
if (_get_enabled(enabled)) {
    // 在這裡 enabled 的類型被縮小為 true
    console.log(enabled); // TypeScript 知道 enabled 為 true
}
```

---

## 功能分類總結 / Function Classification Summary

| 分類 | 函數 | 說明 |
|------|------|------|
| **樣式管理** | `getStyleNamesByChalk` | 從 Chalk 取得樣式名稱列表 |
| | `chalkByConsoleMaybe` | 安全取得 Chalk，無則回退預設 |
| | `createFnChalkByConsole` | 建立高階函式存取 Chalk |
| **屬性填充** | `fillProperty` | 填充缺失的 Console 方法 |
| | `methods*` | 各類別方法常數 |
| **日誌處理** | `_log` | 執行日誌輸出核心函數 |
| | `_logArgv` | 格式化日誌參數 |
| | `_logErrorArgv` | 錯誤專用參數處理 |
| | `_logFormat` | 日誌格式化工具 |
| **時間格式化** | `_time` | 格式化時間戳 |
| **方法綁定** | `_get` | 取得綁定後的函式 |
| | `setBindThis` | 設定綁定的 this 上下文 |
| | `bindBaseMethods` | 綁定所有基礎方法 |
| **啟用控制** | `_get_enabled` | 檢查 debug 是否啟用 |
| | `_set_enabled` | 設定 debug 啟用狀態 |
