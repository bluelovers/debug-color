# 链式调用与核心逻辑

> Console2 核心实现原理

## 目录

- [链式调用原理](#链式调用原理)
- [核心类实现](#核心类实现)
- [属性填充机制](#属性填充机制)

---

## 链式调用原理

Console2 实现了类似 jQuery 的链式调用模式，允许以下操作：

```typescript
console.red.bold('错误訊息');
console.rgb(255, 0, 0)('红色文字');
console.success('操作成功');
```

### 实现方式

通过 `Object.defineProperty` 在原型上定义 **getter**，动态创建样式方法：

```typescript
// lib/node.ts 第 676-696 行

styleNames.forEach(function (name) {
    if (styleNamesFn.includes(name as any)) {
        // 函数型样式：需要参数 (rgb, hex, keyword 等)
        Object.defineProperty(Console2.prototype, name, {
            get() {
                return this._chalkStyleMethod(name);
            },
        });
    } else {
        // 非函数型样式：直接获取属性 (red, bold 等)
        Object.defineProperty(Console2.prototype, name, {
            get() {
                return this._chalkStyleProp(name);
            },
        });
    }
});
```

### 两种样式类型

| 类型 | 示例 | 特点 |
|------|------|------|
| **函数型** | `rgb()`, `hex()`, `keyword()` | 需要传入参数，返回包装后的函数 |
| **属性型** | `red`, `bold`, `italic` | 直接获取，返回样式对象 |

### 样式方法包装

当调用函数型样式时（如 `.rgb(255, 0, 0)`），会：

1. 调用 `_chalkStyleMethod(name)` 创建包装函数
2. 包装函数内部调用 `this._clone()` 创建新实例
3. 将 Chalk 实例切换为对应的样式方法
4. 返回新的 Console2 实例供继续链式调用

```typescript
// lib/node.ts 第 631-641 行

protected _chalkStyleMethod(name) {
    return function chalkStyleMethod(this: Console2, ...argv) {
        let o = this._clone();
        // 切换 Chalk 实例为对应的样式方法
        o[SYM_CHALK] = this[SYM_CHALK][name](...argv);
        return o;
    };
}
```

### 非函数型样式

对于属性型样式（如 `.red`），使用 `_chalkStyleProp` 直接获取：

```typescript
// lib/node.ts 第 503-508 行

protected _chalkStyleProp(name) {
    let o = this._clone();
    o[SYM_CHALK] = this[SYM_CHALK][name];
    return o;
}
```

---

## 核心类实现

### Console2 类结构

Console2 是核心类，继承自 `Function` 以支持可调用：

```typescript
// lib/node.ts 第 179-654 行

export class Console2 {
    // Symbol 存储
    [SYM_CONSOLE]: IConsoleWithStream<Console> | Console2;  // 原始 Console
    [SYM_CHALK]: IChalk;                                    // Chalk 实例
    [SYM_DATA]: IOptions;                                    // 选项数据

    constructor(target?, options?) { ... }
    getStream(): { _stdout, _stderr } { ... }
    get chalk() { ... }
    set chalk(value) { ... }
    get enabledColor() { ... }
    set enabledColor(value) { ... }
    setOptions(options) { ... }
    withOptions(options) { ... }
}
```

### Symbol 存储设计

使用 Symbol 存储私有数据，避免与原生 Console 属性冲突：

| Symbol | 用途 |
|--------|------|
| `SYM_CONSOLE` | 存储原始 Console 实例 |
| `SYM_CHALK` | 存储 Chalk 实例 |
| `SYM_DATA` | 存储配置选项 |
| `SYM_DEBUG_CONSOLE` | debug 模块相关 |
| `SYM_EVENT` | 事件数据 |
| `SYM_THIS` | this 上下文 |

### 继承 Function

```typescript
// lib/node.ts 第 660 行

utilInherits(Console2, Function);
```

允许 `Console2` 可以被直接调用：

```typescript
const console2 = new Console2();
console2('直接调用输出');
```

---

## 属性填充机制

### fill-property.ts

当 Console2 实例需要使用标准 Console 方法时，通过 `fill-property.ts` 填充缺失的方法：

```typescript
// 方法分类
methods_stdout: ['debug', 'info', 'log']
methods_stderr: ['assert', 'error', 'trace', 'warn', 'exception']
methods_output: ['table', 'dir', 'dirxml']
methods_other: ['clear', 'group', 'groupCollapsed', 'groupEnd', 'time', 'timeEnd', 'count']
methods_inspector: ['profile', 'profileEnd', 'timeStamp', 'markTimeline', 'timeline', 'timelineEnd']
```

### 方法包装

为每个标准 Console 方法创建包装函数：

```typescript
// lib/node.ts 第 705-792 行

methods.forEach(function (name: IMethods) {
    if (arrayIncludes(methods_stdout, name)) {
        // stdout 方法：应用颜色样式
        Console2.prototype[name] = function chalkStyleLogStdout(...argv) {
            return this._log(name, argv);
        };
    } else if (arrayIncludes(methods_stderr, name)) {
        // stderr 方法：使用错误颜色
        Console2.prototype[name] = function chalkStyleLogStderr(...argv) {
            return this._logError(name, argv, 'error');
        };
    } else {
        // 其他方法：直接转发
        Console2.prototype[name] = function chalkStyleLogOthers(...argv) { ... };
    }
});
```

---

## 日志输出流程

### 调用链

```
console.log('message')
    │
    ▼
chalkStyleLogStdout(...argv)  [方法包装]
    │
    ▼
this._log(name, argv)         [核心输出方法]
    │
    ▼
_log()                        [lib/console/_log.ts]
    │
    ├──▶ _get_enabled()       [检查是否启用]
    │
    ├──▶ _logArgv()           [格式化参数]
    │       │
    │       ├──▶ _labelFormat() [格式化标签]
    │       ├──▶ _logFormat()   [格式化消息]
    │       └──▶ _time()        [时间戳]
    │
    ▼
[SYM_CONSOLE].log(...)        [原生 Console 输出]
```

### 关键模块

| 模块 | 职责 |
|------|------|
| `_get_enabled` | 检查日志是否启用 |
| `_logArgv` | 格式化日志参数 |
| `_labelFormat` | 格式化标签（模块名等） |
| `_logFormat` | 格式化消息文本 |
| `_time` | 格式化时间戳 |

---

## 配置选项

### IOptions 接口

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

### 使用示例

```typescript
import { Console2, IOptions } from 'debug-color2';

const options: IOptions = {
    enabled: true,           // 启用日志输出
    label: true,             // 显示 [app] 标签
    time: true,              // 显示时间戳
    timeFormat: 'HH:mm:ss',  // 24小时制时间格式
    timeFormatFn: (date) => `【${date.toISOString()}】`, // 自定义时间格式
    labelFormatFn: (label) => `[${label.toUpperCase()}]`, // 标签转大写
    inspectOptions: { colors: true, depth: 3 }, // util.inspect 选项
    chalkOptions: { level: 2 }, // Chalk 颜色级别 (0-3)
    colors: {                // 自定义颜色样式
        log: 'cyan',
        success: 'green',
        warn: 'yellow',
        error: 'red',
    },
    stream: process.stdout,  // 输出流
};

const logger = new Console2(options);
```

---

## 自定义日志方法

Console2 扩展了三个自定义日志方法：

| 方法 | 默认颜色 | 输出目标 |
|------|---------|----------|
| `success()` | 绿色 | stdout |
| `ok()` | 浅绿色 | stdout |
| `fail()` | 红色 | stderr |
