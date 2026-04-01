# debug-color2 模组文档

> 彩色化 Console 输出类库

## 目录

- [核心类 (Core)](#核心类-core)
- [控制台 (Console)](#控制台-console)
- [样式 (Styles)](#样式-styles)
- [类型定义 (Types)](#类型定义-types)
- [工具 (Utils)](#工具-utils)
- [其他模块](#其他模块)
- [函数 API 参考](./functions-api.md)
- [内部属性与方法](./console2-internal.md)
- [IOptions 配置选项](./ioptions.md)

---

## 核心类 (Core)

### lib/node.ts - Console2 核心类

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `Console2` | 类 | 彩色化 Console 输出的主要类 |
| `Console2` | 接口 | 扩展原生 Console 并包含 Chalk 样式的接口 |

**功能说明**: Console2 核心模组，提供 Node.js 环境下的彩色化 Console 输出功能。

#### 主要方法

| 方法 | 说明 |
|------|------|
| `getStream()` | 取得 stdout/stderr 流信息 |
| `get chalk` | 取得 Chalk 实例 |
| `get enabledColor` | 取得色彩启用状态 |
| `set enabledColor` | 设定色彩启用状态 |
| `setOptions(options)` | 设定选项 |
| `withOptions(options)` | 建立具有新选项的复制品 |

#### 自订日志方法

| 方法 | 说明 |
|------|------|
| `success(...argv)` | 输出成功訊息（绿色） |
| `ok(...argv)` | 输出确定訊息（浅绿色） |
| `fail(...argv)` | 输出失败訊息（红色） |

#### 样式属性

Console2 实例可直接存取 Chalk 样式属性：

```typescript
// 非函数型样式
console.bold('Bold text');
console.italic('Italic text');
console.red('Red text');

// 函数型样式
console.rgb(255, 0, 0)('Red text');
console.hex('#ff0000')('Red text');
```

---

### lib/browser.ts - 浏览器版本

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `Console2` | 类 | 浏览器专用的 Console2 子类 |

**功能说明**: 浏览器 Console2 实作，专为浏览器环境设计。

#### 与 node.ts 的差异

| 特性 | node.ts | browser.ts |
|------|---------|------------|
| 默认色彩启用 | 取决于环境 | 强制停用 |
| 继承 | 无（根类别） | 继承自 ConsoleNode |
| 适用环境 | Node.js | 浏览器 |

---

## 控制台 (Console)

### lib/console/_log.ts

- **主要导出**: `_log`
- **功能说明**: 执行日志输出的核心函数。根据启用状态判断是否输出日志，调用 `_logArgv` 格式化参数后，通过 Console2 实例的原生 console 方法输出。

```typescript
_log.call(consoleInstance, 'log', ['message', data], 'log')
```

---

### lib/console/_get_enabled.ts

- **主要导出**: `_get_enabled`
- **功能说明**: 判断是否启用日志输出的核心函数。

---

### lib/console/_logArgv.ts

- **主要导出**: `_logArgv`
- **功能说明**: 格式化日志参数的主函数。

---

### lib/console/_labelFormat.ts

- **主要导出**: `_labelFormat`
- **功能说明**: 格式化标签的核心函数，支持自定义标签格式。

---

### lib/console/_logFormat.ts

- **主要导出**: `_logFormat`
- **功能说明**: 格式化日志訊息的核心函数。

---

### lib/console/_time.ts

- **主要导出**: `_time`
- **功能说明**: 格式化时间标签的核心函数。

---

## 样式 (Styles)

### lib/styles.ts

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `getStyleNamesByChalk` | 函数 | 从 Chalk 实例取得样式名称列表 |
| `styleNames` | 常数 | 所有样式名称数组 |
| `styleNamesFn` | 常数 | 函数型样式名称（需传入参数） |
| `styleNamesWithoutFn` | 常数 | 非函数型样式名称（不需参数） |

#### 函数型样式 (需参数)
- `rgb`, `hsl`, `hsv`, `hwb`
- `hex`, `keyword`
- `bgRgb`, `bgHsl`, `bgHsv`, `bgHwb`, `bgHex`, `bgKeyword`

#### 非函数型样式 (不需参数)
- 文字样式: `bold`, `dim`, `italic`, `underline`, `inverse`, `hidden`, `strikethrough`
- 前景颜色: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`
- 背景颜色: `bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`

---

## 类型定义 (Types)

### lib/types.ts

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `InspectOptions` | 类型 | 从 `util` 导出的检视选项类型 |
| `Chalk`, `Level`, `ChalkOptions` | 类型 | Chalk 库的类型定义 |
| `IStyles` | 接口 | Chalk 样式方法接口 |
| `IOptions` | 接口 | Console2 配置选项接口 |
| `IChalkLike` | 接口 | 类似 Chalk 的函数接口 |
| `IConsoleWithStream` | 类型 | 具有流的 Console 接口 |

#### IOptions 选项接口

更多详细的 IOptions 配置选项说明，请参考 [IOptions 配置选项说明](./ioptions.md)。

```typescript
interface IOptions {
    /** 是否启用日志输出 / Whether to enable log output */
    enabled?: boolean;
    /** 是否显示标签 / Whether to show label */
    label?: boolean;
    /** 是否显示时间戳 / Whether to show timestamp */
    time?: boolean;
    /** 时间戳格式字符串 / Timestamp format string (使用 dayjs 格式) */
    timeFormat?: string;
    /** 自定义时间格式函数 / Custom timestamp format function */
    timeFormatFn?: (date: Date) => string;
    /** 自定义标签格式函数 / Custom label format function */
    labelFormatFn?: (label: string) => string;
    /** util.inspect 选项 / util.inspect options */
    inspectOptions?: InspectOptions;
    /** Chalk 选项 / Chalk options */
    chalkOptions?: ChalkOptions;
    /** 自定义颜色样式 / Custom color styles */
    colors?: Record<string, ChalkStyle>;
    /** 输出流 / Output stream (默认: process.stdout) */
    stream?: NodeJS.WritableStream;
}
```

**使用示例**:

```typescript
import { Console2, IOptions } from 'debug-color2';

const options: IOptions = {
    enabled: true,           // 启用日志输出
    label: true,             // 显示 [app] 标签
    time: true,              // 显示时间戳
    timeFormat: 'HH:mm:ss',  // 24小时制时间格式
    labelFormatFn: (label) => `[${label.toUpperCase()}]`, // 标签转大写
    inspectOptions: { colors: true, depth: 3 }, // util.inspect 选项
    chalkOptions: { level: 2 }, // Chalk 颜色级别 (0-3)
    colors: {                // 自定义颜色样式
        info: 'cyan',
        success: 'green',
    },
    stream: process.stdout,  // 输出流
};

const logger = new Console2(options);
```

---

## 工具 (Utils)

### lib/util/bindBaseMethods.ts

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `setBindThis(target, me)` | 函数 | 设置绑定的 this 上下文 |
| `bindBaseMethods(target)` | 函数 | 将所有基础方法绑定到目标对象 |

**功能说明**: 用于将 Console2 的方法绑定到正确的 this 上下文，确保在调用时 `this` 指向正确的 Console2 实例。

---

### lib/util/processPlatform.ts

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `processPlatform()` | 函数 | 获取当前执行平台 |

**功能说明**: 取得目前执行环境的平台资讯（如 'win32', 'linux', 'darwin'）。

---

## 其他模块

### lib/chk.ts

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `isNodeJs` | 函数 | 检查是否运行在 Node.js 环境中 |

**功能说明**: 通过检查 `console._stdout` 和 `console._stderr` 属性来判断当前是否运行在 Node.js 环境中。

---

### lib/val.ts

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `SYM_DEBUG_CONSOLE` | Symbol | 私密 Symbol |
| `SYM_CHALK` | Symbol | Chalk Symbol |
| `SYM_CONSOLE` | Symbol | Console Symbol |
| `SYM_EVENT` | Symbol | 事件 Symbol |
| `SYM_DATA` | Symbol | 数据 Symbol |
| `SYM_THIS` | Symbol | this Symbol |
| `defaultColors` | 常数 | 各日志类型的默认颜色配置 |

**功能说明**: 数值与常数模块，定义全局 Symbols 用于存储私密资料，以及各日志类型（error, warn, info, success 等）的默认颜色配置。

---

### lib/fill-property.ts

- **功能说明**: 填充属性模块，用于将 Chalk 样式方法挂载到 Console2 实例上。

---

## 内部属性与方法

更多关于 Console2 内部 Symbol 属性、属性存取器和方法的详细说明，请参考 [内部属性与方法详解](./console2-internal.md)。

包括：
- `SYM_CONSOLE`, `SYM_CHALK`, `SYM_DATA` Symbol 属性
- `chalk`, `levelColor`, `chalkOptions`, `inspectOptions`, `enabled` 存取器
- `setOptions()`, `withOptions()`, `_clone()` 方法
