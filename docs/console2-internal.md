# Console2 內部屬性與方法詳解
# Console2 Internal Properties and Methods Guide

## 概述 / Overview

本文檔詳細說明 Console2 類別的內部 Symbol 屬性和核心方法，提供深入的分析和使用範例。

This document provides detailed explanation of Console2 class's internal Symbol properties and core methods, with analysis and usage examples.

---

## Symbol 屬性 / Symbol Properties

### SYM_CONSOLE

```typescript
export const SYM_CONSOLE = Symbol.for('console');
```

| 屬性 | 說明 |
|------|------|
| **類型** | `Symbol.for('console')` |
| **用途** | 儲存原始 Console 實例 |
| **位置** | `lib/node.ts` - 建構時初始化 |

**功能說明**:
- 儲存傳入的目標 Console 實例（或預設的全域 `console`）
- 用於代理執行原始 Console 的方法
- 確保色彩處理後的輸出可以正確委派

**程式碼分析** (`lib/node.ts:190`):
```typescript
this[SYM_CONSOLE] = target || console;
```

**使用範例**:
```typescript
import { Console2, SYM_CONSOLE } from 'debug-color2';

// 使用自訂 Console
const customConsole = new Console(console);
const logger = new Console2(customConsole);

// 驗證 Symbol 存取
console.log(logger[SYM_CONSOLE] === customConsole); // true
console.log(logger[SYM_CONSOLE] === console);       // false (因為傳入自訂實例)

// 存取原始方法
const originalLog = logger[SYM_CONSOLE].log;
originalLog.call(console, '原始輸出');
```

---

### SYM_CHALK

```typescript
export const SYM_CHALK = Symbol.for('chalk');
```

| 屬性 | 說明 |
|------|------|
| **類型** | `Symbol.for('chalk')` |
| **用途** | 儲存 Chalk 實例 |
| **位置** | `lib/node.ts` - 建構時初始化 |

**功能說明**:
- 儲存 Chalk 色彩處理庫的實例
- 根據 `chalkOptions` 配置初始化
- 用於所有色彩樣式的處理

**程式碼分析** (`lib/node.ts:192-199`):
```typescript
if (options?.chalkOptions)
{
    this[SYM_CHALK] = chalk.constructor(options.chalkOptions);
}
else
{
    this[SYM_CHALK] = chalk.constructor();
}
```

**使用範例**:
```typescript
import { Console2, SYM_CHALK } from 'debug-color2';

const logger = new Console2();

// 直接使用 Chalk 實例
const chalk = logger[SYM_CHALK];
chalk.red('紅色文字');
chalk.bold.cyan('粗體青色');

// 鏈式調用
chalk.green.bold.underline('粗體綠色底線');
```

---

### SYM_DATA

```typescript
export const SYM_DATA = Symbol.for('data');
```

| 屬性 | 說明 |
|------|------|
| **類型** | `Symbol.for('data')` |
| **用途** | 儲存選項配置資料 (IOptions) |
| **位置** | `lib/node.ts` - 建構時初始化 |

**功能說明**:
- 儲存所有 IOptions 配置選項
- 包含 `enabled`, `label`, `time`, `colors` 等設定
- 使用 Object.create 建立具有預設顏色的物件

**程式碼分析** (`lib/node.ts:202-231`):
```typescript
this[SYM_DATA] = Object.create({
    colors: Object.create(defaultColors),
});

this[SYM_DATA].stream = null;
// ... 更多初始化邏輯 ...
Object.assign(this[SYM_DATA], options || {});
```

**使用範例**:
```typescript
import { Console2, SYM_DATA, IOptions } from 'debug-color2';

const options: IOptions = {
    enabled: true,
    label: true,
    time: true,
    timeFormat: 'HH:mm:ss',
    colors: {
        success: 'green',
        error: 'red',
    },
};

const logger = new Console2(console, options);

// 存取選項資料
console.log(logger[SYM_DATA].enabled);      // true
console.log(logger[SYM_DATA].label);        // true
console.log(logger[SYM_DATA].time);          // true
console.log(logger[SYM_DATA].colors.success);// 'green'
```

---

## 屬性存取器 / Property Accessors

### chalk

用於存取和設定 Chalk 實例。

**取得 Chalk 實例**:
```typescript
const logger = new Console2();
const chalk = logger.chalk;
chalk.red('紅色');
```

**設定 Chalk 實例**:
```typescript
import chalk from 'chalk';

const customChalk = chalk.constructor({ level: 2 });
const logger = new Console2();
logger.chalk = customChalk;
```

---

### levelColor

色彩等級控制 (0-3)。

| 等級 | 說明 | 色彩數 |
|------|------|--------|
| 0 | 關閉 | 無 |
| 1 | 基本 | 8 種 |
| 2 | 256 色 | 256 種 |
| 3 | 真彩色 | 1677 萬種 |

```typescript
const logger = new Console2();

// 取得當前色彩等級
console.log(logger.levelColor); // 取決於終端機

// 設定色彩等級
logger.levelColor = 0; // 關閉色彩
logger.levelColor = 1; // 基本色彩
logger.levelColor = 2; // 256 色
logger.levelColor = 3; // 真彩色
```

---

### chalkOptions

存取 Chalk 配置選項。

```typescript
const logger = new Console2(console, {
    chalkOptions: { level: 2 }
});

// 取得選項
console.log(logger.chalkOptions); // { level: 2 }

// 設定選項
logger.chalkOptions = { level: 3, enabled: true };
```

---

### inspectOptions

存取 `util.inspect` 配置選項。

```typescript
const logger = new Console2(console, {
    inspectOptions: { colors: true, depth: 4 }
});

// 取得選項
console.log(logger.inspectOptions);

// 設定選項
logger.inspectOptions = { depth: null, showHidden: true };
```

---

### enabled

控制日誌輸出是否啟用。

```typescript
const logger = new Console2(console, { enabled: true });

// 取得狀態
console.log(logger.enabled); // true

// 設定狀態
logger.enabled = false; // 停用
logger.log('這不會輸出');

logger.enabled = true;  // 啟用
logger.log('這會輸出');
```

---

## 方法 / Methods

### setOptions(options: IOptions)

合併新選項到現有配置。

```typescript
const logger = new Console2(console, { enabled: true });

// 新增選項
logger.setOptions({ label: true, time: true });

// 驗證
console.log(logger.label); // true
console.log(logger.time);  // true
```

**特點**:
- 直接修改現有實例
- 回傳 `this` 供鏈式調用

---

### withOptions(options: IOptions)

建立具有新選項的複製品。

```typescript
const parent = new Console2(console, { enabled: true });
const child = parent.withOptions({ label: true, time: true });

// parent 保持不變
console.log(parent.enabled); // true
console.log(parent.label);  // undefined

// child 有新選項
console.log(child.enabled); // true (繼承)
console.log(child.label);    // true (新設定)
```

**特點**:
- 建立新的 Console2 實例
- 複製現有配置並合併新選項
- 原始實例不受影響

---

### _clone()

內部方法，建立 Console2 的淺層複製品。

```typescript
const logger = new Console2(console, { enabled: true });
const clone = logger._clone();

// clone 是可呼叫的函式
clone('Hello World');

// clone 共享相同的 Chalk 和 Console 實例
```

**特點**:
- 內部使用，建立樣式方法時調用
- 共享 `SYM_CHALK` 和 `SYM_CONSOLE` 實例
- 新建 `SYM_DATA` 物件

---

## 完整使用範例 / Complete Usage Example

```typescript
import { Console2, SYM_CONSOLE, SYM_CHALK, SYM_DATA } from 'debug-color2';

// 建立具有完整配置的 Console2 實例
const logger = new Console2(console, {
    enabled: true,
    label: true,
    time: true,
    timeFormat: 'HH:mm:ss',
    labelFormatFn: (label) => `[${label.toUpperCase()}]`,
    inspectOptions: { colors: true, depth: 3 },
    chalkOptions: { level: 2 },
    colors: {
        success: 'green',
        ok: 'lightgreen',
        fail: 'red',
    },
    stream: process.stdout,
});

// 1. 存取 Symbol 屬性
console.log('原始 Console:', logger[SYM_CONSOLE] === console);
console.log('Chalk 實例:', typeof logger[SYM_CHALK]);
console.log('選項資料:', logger[SYM_DATA].enabled);

// 2. 存取屬性存取器
console.log('色彩等級:', logger.levelColor);
console.log('Chalk 選項:', logger.chalkOptions);
console.log('Inspect 選項:', logger.inspectOptions);
console.log('啟用狀態:', logger.enabled);

// 3. 設定屬性
logger.levelColor = 3;
logger.enabled = true;

// 4. 使用方法
logger.setOptions({ label: false });

const childLogger = logger.withOptions({
    label: true,
    colors: { info: 'cyan' }
});

// 5. 使用自訂方法
logger.success('操作成功');
logger.ok('確認完成');
logger.fail('發生錯誤');

logger.info('資訊訊息');
logger.debug('除錯訊息');
logger.warn('警告訊息');
logger.error('錯誤訊息');
```

---

## 參考 / References

| 檔案 | 說明 |
|------|------|
| `lib/val.ts` | Symbol 定義 |
| `lib/node.ts` | Console2 類別實現 |
| `lib/types.ts` | IOptions 類型定義 |
| `docs/ioptions.md` | IOptions 選項詳解 |