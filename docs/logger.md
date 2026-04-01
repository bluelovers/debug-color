# Logger 模块

> 预配置的 Console2 实例

## 概述

`logger` 模块提供一个预设配置的 `Console2` 实例，专门适用于一般日志输出场景。

## 导入方式

```typescript
import { consoleLogger } from 'debug-color2';
// 或
import consoleLogger from 'debug-color2/logger';
```

## 默认配置

| 选项 | 值 | 说明 |
|------|-----|------|
| `label` | `true` | 显示标签 |
| `time` | `true` | 显示时间戳 |
| `inspectOptions.colors` | `true` | 启用颜色输出 |

## 使用示例

```typescript
import { consoleLogger } from 'debug-color2';

// 使用预设配置输出日志
consoleLogger.log('一般訊息');
consoleLogger.info('资讯訊息');
consoleLogger.warn('警告訊息');
consoleLogger.error('错误訊息');

// 自定义日志方法
consoleLogger.success('成功訊息');
consoleLogger.ok('确定訊息');
consoleLogger.fail('失败訊息');

// 使用样式
consoleLogger.red.bold('红色的粗体文字');
consoleLogger.rgb(255, 0, 0)('RGB 红色文字');
```

## 与默认 console 的差异

| 特性 | 默认 console | consoleLogger |
|------|-------------|---------------|
| 标签显示 | ❌ | ✅ |
| 时间戳 | ❌ | ✅ |
| 颜色输出 | ❌ | ✅ |
| 自定义方法 | ❌ | success/ok/fail |

## 源码

```typescript
// logger.ts

export const consoleLogger = new Console2(null, {
    label: true,
    time: true,
    inspectOptions: {
        colors: true,
    }
}) as Console2;
```

## 适用场景

- **日常日志记录** - 适合开发调试输出
- **服务日志** - 需要时间戳追踪
- **CLI 应用** - 需要彩色输出增强可读性
