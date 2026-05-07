# Ink Playground

Ink TUI 框架完整演示，覆盖所有核心 API。

[Ink](https://github.com/vadimdemedes/ink) 是「React for CLIs」—— 用 React 组件模型构建命令行界面。

## 运行

```bash
npx tsx src/index.tsx
```

## 演示章节 (20个)

| 章节 | 功能 | Hook/组件 |
|------|------|----------|
| 1 | Text 样式 | color, backgroundColor, bold, italic, underline, strikethrough, inverse |
| 2 | Text Wrap | wrap: truncate / truncate-middle / truncate-start |
| 3 | Box 尺寸 | width, height, padding, margin, gap |
| 4 | Flex 布局 | justifyContent, alignItems |
| 5 | 边框样式 | borderStyle: single, double, round, bold, singleDouble, doubleSingle, classic, dots |
| 6 | Spacer/Newline | Spacer, Newline |
| 7 | 键盘监听 | useInput |
| 8 | 粘贴事件 | usePaste |
| 9 | 终端尺寸 | useWindowSize |
| 10 | 焦点管理 | useFocus, useFocusManager |
| 11 | 动画 | useAnimation |
| 12 | 应用生命周期 | useApp (exit, waitUntilRenderFlush) |
| 13 | 元素测量 | useBoxMetrics |
| 14 | 静态输出 | Static |
| 15 | 输出转换 | Transform |
| 16 | 光标控制 | useCursor |
| 17 | Raw 模式 | useStdin |
| 18 | Stdout 写入 | useStdout |
| 19 | 复杂布局 | 表格示例 |
| 20 | 可访问性 | aria-label, aria-hidden, aria-role, aria-state |

## 操作

- `↑` `↓` - 切换章节
- `Tab` - 焦点切换（章节 10）
- `Enter` / `Space` - 确认选择
- `Ctrl+C` - 退出

## 项目结构

```
ink-playground/
├── src/
│   └── index.tsx      # TypeScript 版本
├── package.json
└── tsconfig.json
```

## 谁在用 Ink？

- [Claude Code](https://github.com/anthropics/claude-code) - Anthropic
- [Gemini CLI](https://github.com/google-gemini/gemini-cli) - Google
- [GitHub Copilot CLI](https://github.com/features/copilot/cli)
- [Cloudflare Wrangler](https://github.com/cloudflare/wrangler2)
- [Prisma](https://www.prisma.io/)
- [Shopify CLI](https://github.com/Shopify/cli)

## 相关资源

- [Ink 官方仓库](https://github.com/vadimdemedes/ink)
- [ink-text-input](https://github.com/vadimdemedes/ink-text-input)
- [ink-spinner](https://github.com/vadimdemedes/ink-spinner)
