# IOptions 配置選項說明

> Console2 配置選項完整說明文件
> Complete documentation for Console2 configuration options

## 目錄 / Table of Contents

- [概述 / Overview](#概述--overview)
- [選項列表 / Options List](#選項列表--options-list)
- [範例 / Examples](#範例--examples)
- [類型定義 / Type Definition](#類型定義--type-definition)
- [顏色可用值 / Available Color Values](#顏色可用值--available-color-values)

---

## 概述 / Overview

`IOptions` 是 Console2 構造函式的第二個參數，用於配置 Console2 實例的各種選項。

`IOptions` is the second parameter of Console2 constructor, used to configure various options for Console2 instance.

```typescript
import { Console2 } from 'debug-color2';

const console2 = new Console2(console, {
  // 選項配置 / Options configuration
});
```

---

## 選項列表 / Options List

### enabled

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| enabled | `boolean` | `true` | 啟用或停用日誌顯示 |

**Description**: 當設為 `false` 時，所有日誌輸出都會被忽略。
When set to `false`, all log output will be ignored.

```typescript
// 啟用日誌（預設）
const console2 = new Console2(console, { enabled: true });
console2.log('This will be shown');  // ✓ 輸出

// 停用日誌
const console2 = new Console2(console, { enabled: false });
console2.log('This will NOT be shown');  // ✗ 不輸出
```

---

### label

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| label | `boolean \| string[]` | `false` | 顯示標籤字串 |

**Description**: 可設為 `true`（所有方法）、`false`（不顯示）、或字串陣列（指定方法）。
Can be set to `true` (all methods), `false` (not show), or string array (specified methods).

```typescript
// 為所有方法顯示標籤
const console2 = new Console2(console, { label: true });
console2.log('Hello');   // [LOG] Hello
console2.error('Error'); // [ERROR] Error

// 只為特定方法顯示標籤
const console2 = new Console2(console, { label: ['log', 'error'] });
console2.log('Hello');    // [LOG] Hello
console2.error('Error'); // [ERROR] Error
console2.warn('Warning'); // Warning (no label)
```

---

### time

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| time | `boolean` | `false` | 顯示時間標籤 |

**Description**: 是否在輸出前方顯示時間戳。
Whether to display timestamp before output.

```typescript
const console2 = new Console2(console, { time: true });
console2.log('Hello');  // [14:30:25.123] Hello
```

---

### timeFormat

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| timeFormat | `string` | `'[HH:mm:ss.SSS]'` | 自定義時間格式 |

**Description**: 使用 Luxon 的時間格式語法。
Uses Luxon's time format syntax.

```typescript
// 簡單格式
const console2 = new Console2(console, { time: true, timeFormat: '[HH:mm:ss]' });
console2.log('Test');  // [14:30:25] Test

// 完整日期時間格式
const console2 = new Console2(console, { time: true, timeFormat: '[yyyy-MM-dd HH:mm:ss]' });
console2.log('Test');  // [2024-01-15 14:30:25] Test
```

**Luxon 格式語法 / Luxon Format Syntax**:

| 格式 | 範例 | 說明 |
|------|------|------|
| `yyyy` | 2024 | 完整年份 |
| `MM` | 01 | 月份（兩位數） |
| `dd` | 15 | 日期（兩位數） |
| `HH` | 14 | 小時（24小時制） |
| `mm` | 30 | 分鐘 |
| `ss` | 25 | 秒鐘 |
| `SSS` | 123 | 毫秒 |

---

### timeFormatFn

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| timeFormatFn | `(data) => string` | `undefined` | 自定義時間格式函數 |

**Description**: 允許完全自定義時間戳的生成邏輯。
Allows completely custom timestamp generation logic.

```typescript
import { DateTime } from 'luxon';

const console2 = new Console2(console, {
  time: true,
  timeFormatFn: (data) => {
    // data.date = DateTime 實例
    // data.failBackTimeFormat = 預設格式字串
    // data.name = 方法名稱
    return `[${data.date.toFormat('yyyy-MM-dd')}]`;
  },
});
console2.log('Test');  // [2024-01-15] Test
```

**Data 物件結構 / Data Object Structure**:

```typescript
interface ITimeFormatFnData {
  /** 方法名稱 / Method name */
  name: string;
  /** 參數陣列 / Arguments array */
  argv?: unknown[];
  /** 備用方法名稱 / Fallback method name */
  failBack: string;
  /** 預設時間格式 / Default time format */
  failBackTimeFormat: string;
  /** DateTime 實例 / DateTime instance */
  date: DateTime;
}
```

---

### labelFormatFn

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| labelFormatFn | `(data) => string` | `undefined` | 自定義標籤格式函數 |

**Description**: 允許完全自定義標籤的生成邏輯。
Allows completely custom label generation logic.

```typescript
const console2 = new Console2(console, {
  label: true,
  labelFormatFn: (data) => {
    // data.name = 方法名稱（如 'log', 'error'）
    // data.argv = 傳入的參數陣列
    // data.failBack = 備用方法名稱
    return `[${data.name.toUpperCase()}]`;
  },
});
console2.log('Hello');  // [LOG] Hello
```

---

### inspectOptions

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| inspectOptions | `InspectOptions` | `undefined` | 預設的 inspect 選項 |

**Description**: 用於配置 `util.inspect` 的選項。
Used to configure `util.inspect` options.

```typescript
const console2 = new Console2(console, {
  inspectOptions: {
    colors: true,        // 啟用顏色
    depth: 3,           // 顯示深度
    showHidden: true,   // 顯示隱藏屬性
    compact: true,      // 緊湊格式
  },
});
```

**常用選項 / Common Options**:

| 選項 | 類型 | 說明 |
|------|------|------|
| `colors` | `boolean` | 啟用顏色輸出 |
| `depth` | `number` | 物件檢視深度 |
| `showHidden` | `boolean` | 顯示物件的隱藏屬性 |
| `compact` | `boolean` | 緊湊格式輸出 |
| `breakLength` | `number` | 換行寬度 |
| `sorted` | `boolean \| (a, b) => number` | 是否排序屬性 |

---

### chalkOptions

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| chalkOptions | `ChalkOptions` | `undefined` | Chalk 選項 |

**Description**: 用於配置 Chalk 的選項（如是否啟用顏色）。
Used to configure Chalk options (like whether to enable colors).

```typescript
import chalk from 'chalk';

// 啟用所有顏色
const console2 = new Console2(console, {
  chalkOptions: { level: chalk.Level.All },
});

// 停用顏色
const console2 = new Console2(console, {
  chalkOptions: { level: 0 },
});
```

**Chalk 等級 / Chalk Levels**:

| 等級 | 值 | 說明 |
|------|-----|------|
| `Level.None` | 0 | 停用所有顏色 |
| `Level.Basic` | 1 | 僅基本顏色 |
| `Level.Ansi256` | 2 | ANSI 256 色 |
| `Level.All` | 3 | 所有顏色（16 百萬色） |

---

### colors

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| colors | `Record<string, Chalk \| IChalkLike \| string>` | 參見 defaultColors | 設定顏色樣式 |

**Description**: 為不同的日誌方法設定自定義顏色。
Set custom colors for different log methods.

**支援的日誌方法 / Supported Log Methods**:

```typescript
type IOptionsColorsProp =
  | 'debug'    // 調試訊息（灰色）
  | 'error'    // 錯誤訊息（紅色）
  | 'info'     // 資訊訊息（藍色）
  | 'log'      // 一般日誌（預設）
  | 'trace'    // 追蹤訊息（灰色）
  | 'warn'     // 警告訊息（黃色）
  | 'success'  // 成功訊息（綠色）⭐ 自定義
  | 'ok'       // 確認訊息（淺綠）⭐ 自定義
  | 'exception'// 例外訊息（紅色）
  | 'fail'     // 失敗訊息（紅色）⭐ 自定義
```

**基本用法 / Basic Usage**:

```typescript
const console2 = new Console2(console, {
  colors: {
    log: 'cyan',      // 青色
    error: 'red',     // 紅色
    warn: 'yellow',   // 黃色
    info: 'blue',     // 藍色
    debug: 'gray',    // 灰色
    success: 'green', // 綠色
    ok: 'green',      // 綠色
    fail: 'red',      // 紅色
  },
});
```

**使用 Chalk 函式 / Using Chalk Functions**:

```typescript
import chalk from 'chalk';

const console2 = new Console2(console, {
  colors: {
    // RGB 顏色
    log: chalk.rgb(0, 255, 0),
    // HEX 顏色
    error: chalk.hex('#FF0000'),
    // HSL 顏色
    warn: chalk.hsl(60, 100, 50),
  },
});
```

**使用組合樣式 / Using Combined Styles**:

```typescript
const console2 = new Console2(console, {
  colors: {
    log: chalk.bold.green,              // 粗體 + 綠色
    error: chalk.bold.red.bgWhite,      // 粗體 + 紅色 + 白底
    warn: chalk.italic.yellow,           // 斜體 + 黃色
  },
});
```

---

### stream

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| stream | `boolean` | `true` | 檢查是否為 Node.js console |

**Description**: 設定是否使用 Node.js 的串流輸出。
Set whether to use Node.js stream output.

```typescript
// 使用 Node.js 串流（預設）
const console2 = new Console2(console, { stream: true });

// 停用串流模式
const console2 = new Console2(console, { stream: false });
```

---

## 範例 / Examples

### 基本配置 / Basic Configuration

```typescript
import { Console2 } from 'debug-color2';

const console2 = new Console2(console, {
  enabled: true,
  label: true,
  time: true,
  timeFormat: '[HH:mm:ss.SSS]',
});

console2.log('Hello World');
// 輸出: [14:30:25.123] [LOG] Hello World
```

### 完整配置 / Full Configuration

```typescript
import { Console2 } from 'debug-color2';
import chalk from 'chalk';
import { DateTime } from 'luxon';

const console2 = new Console2(console, {
  // 啟用輸出
  enabled: true,

  // 顯示標籤（僅特定方法）
  label: ['log', 'error', 'warn', 'success', 'fail'],

  // 顯示時間
  time: true,

  // 自定義時間格式
  timeFormat: '[yyyy-MM-dd HH:mm:ss]',

  // 自定義時間格式函數
  timeFormatFn: (data) => {
    if (data.name === 'error') {
      return `[${data.date.toFormat('yyyy-MM-dd HH:mm:ss.SSS')}]`;
    }
    return `[${data.date.toFormat('HH:mm:ss')}]`;
  },

  // 自定義標籤格式函數
  labelFormatFn: (data) => {
    const icons: Record<string, string> = {
      log: '📝',
      error: '❌',
      warn: '⚠️',
      success: '✅',
      fail: '❎',
    };
    return `[${icons[data.name] || data.name.toUpperCase()}]`;
  },

  // inspect 選項
  inspectOptions: {
    colors: true,
    depth: 5,
    compact: true,
  },

  // Chalk 選項
  chalkOptions: {
    level: chalk.Level.All,
  },

  // 自定義顏色
  colors: {
    log: 'cyan',
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    debug: 'gray',
    success: chalk.bold.green,
    ok: 'green',
    fail: 'red',
  },

  // 使用 Node.js 串流
  stream: true,
});
```

---

## 類型定義 / Type Definition

```typescript
import { Chalk, ChalkOptions, InspectOptions } from 'chalk';
import { DateTime } from 'luxon';

export interface IOptions {
  /** 啟用或停用日誌顯示 */
  enabled?: boolean;

  /** 顯示標籤字串 */
  label?: boolean | string[];

  /** 顯示時間標籤 */
  time?: boolean;

  /** 允許自定義時間格式 */
  timeFormat?: string;

  /** 自定義時間格式函數 */
  timeFormatFn?<T extends unknown[]>(data: Parameters<IOptions["labelFormatFn"]>[0] & {
    failBackTimeFormat: string;
    date: DateTime;
  }): string;

  /** 允許自定義標籤格式 */
  labelFormatFn?<T extends unknown[]>(data: {
    name: string;
    argv?: T;
    failBack: string;
  }): string;

  /** 設定預設的 inspectOptions */
  inspectOptions?: InspectOptions;

  /** Chalk 選項 */
  chalkOptions?: ChalkOptions;

  /** 設定顏色樣式 */
  colors?: Record<IOptionsColorsProp | string, Chalk | IChalkLike | IStylesColorNames>;

  /** 檢查是否為 Node.js console */
  readonly stream?: boolean;
}
```

---

## 顏色可用值 / Available Color Values

### 預設顏色名稱 / Default Color Names

```
black, red, green, yellow, blue, magenta, cyan, white,
gray, grey,
blackBright, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright
```

### 背景顏色名稱 / Background Color Names

```
bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite,
bgGray, bgGrey,
bgBlackBright, bgRedBright, bgGreenBright, bgYellowBright, bgBlueBright, bgMagentaBright, bgCyanBright, bgWhiteBright
```

### 修飾符 / Modifiers

```
bold, dim, italic, underline, inverse, hidden, strikethrough
```

### Chalk 函式 / Chalk Functions

```typescript
// 需要參數的樣式 / Styles that need parameters
chalk.rgb(r, g, b)           // RGB 顏色
chalk.hex(hex)               // HEX 顏色
chalk.hsl(h, s, l)           // HSL 顏色
chalk.hsv(h, s, v)           // HSV 顏色
chalk.hwb(h, w, b)           // HWB 顏色
chalk.keyword(keyword)       // CSS 顏色關鍵字
```

---

## 相關連結 / Related Links

- [Console2 API](./functions-api.md) - 函數 API 說明
- [Implementation](./implementation.md) - 實作說明
- [Chalk 官網](https://github.com/chalk/chalk) - 顏色庫
- [Luxon 日期時間](https://moment.github.io/luxon/) - 時間格式庫