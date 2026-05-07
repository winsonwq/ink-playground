#!/usr/bin/env node
/**
 * Ink 完整功能展示 Demo
 * 覆盖 Ink 所有核心 API：组件、Hooks、布局、交互
 * 
 * 运行: node index.mjs
 */
import React, { useState, useEffect, useRef } from 'react';
import { 
  render, 
  Text, 
  Box, 
  Newline, 
  Spacer,
  Static,
  Transform,
  useInput,
  useApp,
  useStdin,
  useStdout,
  useWindowSize,
  useFocus,
  useFocusManager,
  useCursor,
  useBoxMetrics,
  useAnimation,
  usePaste
} from 'ink';

// ============================================================
// 辅助函数：创建元素
// ============================================================
const h = (Component, props, ...children) => {
  if (typeof Component === 'string') {
    return React.createElement(Component, props, ...children);
  }
  return React.createElement(Component, props, ...children);
};
const h2 = (str) => React.createElement(Text, { children: str });

// ============================================================
// 演示1: Text 组件 - 颜色和样式
// ============================================================
const TextStylesDemo = () =>
  h(Box, { flexDirection: 'column', marginY: 1 },
    h(Box, { gap: 2 },
      h(Text, { bold: true, color: 'cyan' }, '1. Text 样式演示'),
    ),
    h(Box, { gap: 2 },
      h(Text, { color: 'red' }, '红色'),
      h(Text, { color: 'green' }, '绿色'),
      h(Text, { color: 'blue' }, '蓝色'),
      h(Text, { color: 'yellow' }, '黄色'),
      h(Text, { color: 'magenta' }, '品红'),
      h(Text, { color: 'cyan' }, '青色'),
    ),
    h(Box, { gap: 2 },
      h(Text, { backgroundColor: 'red', color: 'white' }, '白底红字'),
      h(Text, { dimColor: true }, '暗淡文字'),
      h(Text, { bold: true }, '粗体'),
      h(Text, { italic: true }, '斜体'),
      h(Text, { underline: true }, '下划线'),
      h(Text, { strikethrough: true }, '删除线'),
      h(Text, { inverse: true }, '反色'),
    ),
  );

// ============================================================
// 演示2: Text wrap 模式
// ============================================================
const TextWrapDemo = () =>
  h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '2. Text Wrap 模式 (容器 width=25)'),
    h(Box, { width: 25, borderStyle: 'round', padding: 1 },
      h(Text, { wrap: 'truncate' }, 'Hello World Truncate'),
    ),
    h(Box, { width: 25, borderStyle: 'round', padding: 1, marginTop: 1 },
      h(Text, { wrap: 'truncate-middle' }, 'Hello World Middle'),
    ),
    h(Box, { width: 25, borderStyle: 'round', padding: 1, marginTop: 1 },
      h(Text, { wrap: 'truncate-start' }, 'Hello World Start'),
    ),
  );

// ============================================================
// 演示3: Box 布局 - 尺寸
// ============================================================
const BoxLayoutDemo = () =>
  h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '3. Box 布局尺寸'),
    h(Box, { gap: 2 },
      h(Box, { width: 8, height: 3, borderStyle: 'round', justifyContent: 'center', alignItems: 'center' },
        h(Text, {}, '8x3'),
      ),
      h(Box, { width: 12, height: 3, borderStyle: 'single', justifyContent: 'center', alignItems: 'center' },
        h(Text, {}, '12x3'),
      ),
      h(Box, { width: 16, height: 3, borderStyle: 'double', justifyContent: 'center', alignItems: 'center' },
        h(Text, {}, '16x3'),
      ),
    ),
    h(Text, { dimColor: true, marginTop: 1 }, 'padding / margin / gap'),
  );

// ============================================================
// 演示4: Flex 布局
// ============================================================
const FlexLayoutDemo = () =>
  h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '4. Flex 布局'),
    h(Box, { gap: 2 },
      h(Box, { width: 20, gap: 1 },
        h(Text, { bold: true, color: 'yellow' }, 'justifyContent:'),
        h(Box, { borderStyle: 'round', padding: 1 },
          h(Text, { dimColor: true }, 'flex-start|center|flex-end'),
        ),
      ),
      h(Box, { width: 20, gap: 1 },
        h(Text, { bold: true, color: 'yellow' }, 'alignItems:'),
        h(Box, { borderStyle: 'round', padding: 1, height: 3, alignItems: 'center' },
          h(Text, { dimColor: true }, 'flex-start|center|flex-end'),
        ),
      ),
    ),
  );

// ============================================================
// 演示5: 边框样式
// ============================================================
const BorderStylesDemo = () =>
  h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '5. 边框样式'),
    h(Box, { gap: 2, flexDirection: 'row' },
      h(Box, { width: 12, height: 3, borderStyle: 'single', justifyContent: 'center', alignItems: 'center' }, h(Text, {}, 'single')),
      h(Box, { width: 12, height: 3, borderStyle: 'double', justifyContent: 'center', alignItems: 'center' }, h(Text, {}, 'double')),
      h(Box, { width: 12, height: 3, borderStyle: 'round', justifyContent: 'center', alignItems: 'center' }, h(Text, {}, 'round')),
      h(Box, { width: 12, height: 3, borderStyle: 'bold', justifyContent: 'center', alignItems: 'center' }, h(Text, {}, 'bold')),
    ),
    h(Box, { gap: 2, flexDirection: 'row', marginTop: 1 },
      h(Box, { width: 12, height: 3, borderStyle: 'singleDouble', justifyContent: 'center', alignItems: 'center' }, h(Text, {}, 's-d')),
      h(Box, { width: 12, height: 3, borderStyle: 'doubleSingle', justifyContent: 'center', alignItems: 'center' }, h(Text, {}, 'd-s')),
      h(Box, { width: 12, height: 3, borderStyle: 'classic', justifyContent: 'center', alignItems: 'center' }, h(Text, {}, 'classic')),
      h(Box, { width: 12, height: 3, borderStyle: 'dots', justifyContent: 'center', alignItems: 'center' }, h(Text, {}, 'dots')),
    ),
  );

// ============================================================
// 演示6: Spacer 和 Newline
// ============================================================
const SpacerNewlineDemo = () =>
  h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '6. Spacer 和 Newline'),
    h(Box, { flexDirection: 'row' },
      h(Box, { width: 10, borderStyle: 'round', justifyContent: 'center', alignItems: 'center' }, h(Text, {}, '左边')),
      h(Spacer, {}),
      h(Box, { width: 10, borderStyle: 'round', justifyContent: 'center', alignItems: 'center' }, h(Text, {}, '右边')),
    ),
    h(Newline, { count: 2 }),
    h(Box, { borderStyle: 'round', padding: 1 }, h(Text, {}, '换行后')),
  );

// ============================================================
// 演示7: useInput 键盘输入
// ============================================================
const UseInputDemo = () => {
  const [key, setKey] = useState('等待按键...');
  
  useInput((input, keyInfo) => {
    const parts = [];
    if (input) parts.push(`字符: "${input}"`);
    if (keyInfo.upArrow) parts.push('↑');
    if (keyInfo.downArrow) parts.push('↓');
    if (keyInfo.leftArrow) parts.push('←');
    if (keyInfo.rightArrow) parts.push('→');
    if (keyInfo.return) parts.push('Enter');
    if (keyInfo.escape) parts.push('Esc');
    if (keyInfo.backspace) parts.push('Backspace');
    if (keyInfo.tab) parts.push('Tab');
    if (keyInfo.ctrl) parts.push('Ctrl');
    if (keyInfo.shift) parts.push('Shift');
    if (keyInfo.alt) parts.push('Alt');
    if (parts.length > 0) {
      setKey(parts.join(' | '));
    }
  });
  
  return h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '7. useInput 键盘监听'),
    h(Box, { borderStyle: 'round', padding: 1, minWidth: 40 },
      h(Text, { color: 'cyan' }, '按键: '),
      h(Text, { color: 'yellow' }, key),
    ),
  );
};

// ============================================================
// 演示8: usePaste 粘贴事件
// ============================================================
const UsePasteDemo = () => {
  const [pasted, setPasted] = useState('');
  
  usePaste((text) => {
    setPasted(text.substring(0, 50) + (text.length > 50 ? '...' : ''));
  });
  
  return h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '8. usePaste 粘贴事件'),
    h(Text, { dimColor: true }, '在终端中粘贴文本试试'),
    pasted ? h(Box, { borderStyle: 'round', padding: 1, marginTop: 1 },
      h(Text, { color: 'green' }, '粘贴: '),
      h(Text, {}, pasted),
    ) : null,
  );
};

// ============================================================
// 演示9: useWindowSize 响应式
// ============================================================
const UseWindowSizeDemo = () => {
  const { columns, rows } = useWindowSize();
  
  return h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '9. useWindowSize 响应式'),
    h(Box, { borderStyle: 'round', padding: 1 },
      h(Text, {}, '终端尺寸: '),
      h(Text, { color: 'cyan' }, String(columns)),
      h(Text, {}, ' 列 x '),
      h(Text, { color: 'cyan' }, String(rows)),
      h(Text, {}, ' 行'),
    ),
  );
};

// ============================================================
// 演示10: useFocus 焦点管理
// ============================================================
const FocusableButton = ({ id, label, onPress }) => {
  const { isFocused } = useFocus();
  
  useInput((input, keyInfo) => {
    if ((keyInfo.return || input === ' ') && isFocused) {
      onPress();
    }
  });
  
  return h(Box, { 
    borderStyle: isFocused ? 'bold' : 'round',
    borderColor: isFocused ? 'green' : 'gray',
    paddingLeft: 2,
    paddingRight: 2,
  }, 
    h(Text, { color: isFocused ? 'green' : 'white', bold: isFocused },
      (isFocused ? '▶ ' : '  ') + label
    )
  );
};

const UseFocusDemo = () => {
  const [selected, setSelected] = useState(null);
  const { focusNext, focusPrevious } = useFocusManager();
  
  useInput((input, keyInfo) => {
    if (keyInfo.tab && !keyInfo.shift) {
      focusNext();
    } else if (keyInfo.tab && keyInfo.shift) {
      focusPrevious();
    }
  });
  
  const buttons = ['选项 A', '选项 B', '选项 C'];
  
  return h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '10. useFocus 焦点管理'),
    h(Text, { dimColor: true }, 'Tab 切换焦点，Enter/空格 确认'),
    h(Box, { marginTop: 1, gap: 1 },
      ...buttons.map((label, i) =>
        h(FocusableButton, { key: i, id: `btn-${i}`, label, onPress: () => setSelected(i) })
      )
    ),
    selected !== null ? h(Text, { color: 'green', marginTop: 1 }, `已选择: ${buttons[selected]}`) : null,
  );
};

// ============================================================
// 演示11: useAnimation 动画
// ============================================================
const UseAnimationDemo = () => {
  const [progress, setProgress] = useState(0);
  const [frame, setFrame] = useState(0);
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  
  useAnimation((deltaTime) => {
    setProgress(p => (p + deltaTime * 0.05) % 100);
    setFrame(f => (f + 1) % frames.length);
  }, 60);
  
  const barWidth = 30;
  const filled = Math.round((progress / 100) * barWidth);
  
  return h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '11. useAnimation 动画'),
    h(Box, { gap: 2 },
      h(Text, {}, frames[frame] + ' 加载动画'),
      h(Box, { width: barWidth },
        h(Text, {}, '█'.repeat(filled) + '░'.repeat(barWidth - filled)),
      ),
      h(Text, { color: 'cyan' }, Math.round(progress) + '%'),
    ),
  );
};

// ============================================================
// 演示12: useApp 退出
// ============================================================
const UseAppDemo = () => {
  const { exit, waitUntilRenderFlush } = useApp();
  const [status, setStatus] = useState('idle');
  
  const handleExit = async () => {
    setStatus('waiting flush...');
    await waitUntilRenderFlush();
    setStatus('done! exiting...');
    setTimeout(() => exit({ message: 'Bye!' }), 500);
  };
  
  return h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '12. useApp 生命周期'),
    h(Box, { gap: 1 },
      h(Text, {}, '状态: '),
      h(Text, { color: 'green' }, status),
    ),
    h(Box, { borderStyle: 'round', padding: 1, onClick: handleExit },
      h(Text, { color: 'yellow' }, '点击此处演示 exit() → '),
    ),
  );
};

// ============================================================
// 演示13: useBoxMetrics 元素测量
// ============================================================
const UseBoxMetricsDemo = () => {
  const { ref, width, height, hasMeasured } = useBoxMetrics();
  
  return h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '13. useBoxMetrics 元素测量'),
    h(Box, { ref, borderStyle: 'round', padding: 1, width: 30 },
      h(Text, {}, '测量这个盒子'),
    ),
    h(Box, { marginTop: 1 },
      h(Text, {}, '测量结果: '),
      h(Text, { color: hasMeasured ? 'green' : 'yellow' },
        hasMeasured ? `${width}x${height}` : '等待测量...'
      ),
    ),
  );
};

// ============================================================
// 演示14: Static 静态输出
// ============================================================
const StaticOutputDemo = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  
  return h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '14. Static 静态输出'),
    h(Box, { gap: 1 },
      h(Static, { items: [1, 2, 3] },
        (item) => h(Text, { key: item, color: 'cyan' }, `静态行 ${item} (不闪烁)`)
      ),
      h(Text, { color: 'yellow' }, `动态计数: ${count} (每秒更新)`),
    ),
  );
};

// ============================================================
// 演示15: Transform 输出转换
// ============================================================
const TransformDemo = () =>
  h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '15. Transform 输出转换'),
    h(Transform, { transform: (outputLine) => `>> ${outputLine}` },
      h(Box, { borderStyle: 'round', padding: 1 },
        h(Text, { color: 'cyan' }, '这行会被 Transform 添加前缀'),
      ),
    ),
  );

// ============================================================
// 演示16: useCursor 光标控制
// ============================================================
const UseCursorDemo = () => {
  const [step, setStep] = useState(0);
  
  useInput((input, keyInfo) => {
    if (keyInfo.rightArrow) setStep(s => Math.min(4, s + 1));
    if (keyInfo.leftArrow) setStep(s => Math.max(0, s - 1));
  });
  
  const positions = ['①', '②', '③', '④', '⑤'];
  
  return h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '16. useCursor 光标控制'),
    h(Text, { dimColor: true }, '左右箭头移动光标位置'),
    h(Box, { marginTop: 1 },
      ...positions.map((pos, i) =>
        h(Text, { key: i, color: i === step ? 'green' : 'gray' },
          pos + (i < 4 ? ' → ' : '')
        )
      )
    ),
  );
};

// ============================================================
// 演示17: useStdin Raw 模式
// ============================================================
const UseStdinDemo = () => {
  const { isRawModeSupported, setRawMode } = useStdin();
  const [mode, setMode] = useState('cooked');
  
  useInput((input) => {
    if (input === 'r') {
      const newMode = mode === 'cooked' ? 'raw' : 'cooked';
      setRawMode(newMode === 'raw');
      setMode(newMode);
    }
  });
  
  return h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '17. useStdin Raw 模式'),
    h(Box, { borderStyle: 'round', padding: 1 },
      h(Text, {}, 'Raw 模式支持: '),
      h(Text, { color: isRawModeSupported ? 'green' : 'red' }, isRawModeSupported ? '是' : '否'),
    ),
    h(Box, { marginTop: 1 },
      h(Text, {}, '当前模式: '),
      h(Text, { color: 'cyan' }, mode),
      h(Text, { dimColor: true }, ' | 按 R 切换模式'),
    ),
  );
};

// ============================================================
// 演示18: useStdout 写入
// ============================================================
const UseStdoutDemo = () =>
  h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '18. useStdout 写入'),
    h(Text, { dimColor: true }, 'stdout.write() 可直接写入标准输出'),
  );

// ============================================================
// 演示19: 复杂布局 - 表格
// ============================================================
const ComplexLayoutDemo = () =>
  h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '19. 复杂布局 - 表格'),
    h(Box, { flexDirection: 'column', borderStyle: 'double', padding: 1 },
      h(Box, { gap: 2 },
        h(Box, { width: 15 }, h(Text, { bold: true }, '姓名')),
        h(Box, { width: 10 }, h(Text, { bold: true }, '年龄')),
        h(Box, { width: 15 }, h(Text, { bold: true }, '城市')),
      ),
      h(Text, { dimColor: true }, '─────────────────────────────────────────────'),
      h(Box, { gap: 2 },
        h(Box, { width: 15 }, h(Text, { color: 'cyan' }, '张三')),
        h(Box, { width: 10 }, h(Text, {}, '28')),
        h(Box, { width: 15 }, h(Text, {}, '北京')),
      ),
      h(Box, { gap: 2 },
        h(Box, { width: 15 }, h(Text, { color: 'cyan' }, '李四')),
        h(Box, { width: 10 }, h(Text, {}, '34')),
        h(Box, { width: 15 }, h(Text, {}, '上海')),
      ),
      h(Box, { gap: 2 },
        h(Box, { width: 15 }, h(Text, { color: 'cyan' }, '王五')),
        h(Box, { width: 10 }, h(Text, {}, '25')),
        h(Box, { width: 15 }, h(Text, {}, '深圳')),
      ),
    ),
  );

// ============================================================
// 演示20: 可访问性属性
// ============================================================
const AccessibilityDemo = () =>
  h(Box, { flexDirection: 'column', marginY: 1 },
    h(Text, { bold: true, color: 'cyan' }, '20. 可访问性属性'),
    h(Box, { gap: 1 },
      h(Text, {}, h(Text, { bold: true }, 'aria-label:'), ' 屏幕阅读器标签'),
      h(Text, {}, h(Text, { bold: true }, 'aria-hidden:'), ' 从辅助技术隐藏'),
      h(Text, {}, h(Text, { bold: true }, 'aria-role:'), ' 角色定义'),
      h(Text, {}, h(Text, { bold: true }, 'aria-state:'), ' 状态信息'),
    ),
  );

// ============================================================
// 主应用 - 整合所有演示
// ============================================================
const InkFullDemo = () => {
  const [activeSection, setActiveSection] = useState(1);
  const { columns, rows } = useWindowSize();
  
  // 方向键切换章节
  useInput((input, keyInfo) => {
    if (keyInfo.upArrow) setActiveSection(s => Math.max(1, s - 1));
    if (keyInfo.downArrow) setActiveSection(s => Math.min(20, s + 1));
    if (keyInfo.ctrl && input === 'c') process.exit(0);
  });
  
  const demos = [
    h(TextStylesDemo, { key: '1' }),
    h(TextWrapDemo, { key: '2' }),
    h(BoxLayoutDemo, { key: '3' }),
    h(FlexLayoutDemo, { key: '4' }),
    h(BorderStylesDemo, { key: '5' }),
    h(SpacerNewlineDemo, { key: '6' }),
    h(UseInputDemo, { key: '7' }),
    h(UsePasteDemo, { key: '8' }),
    h(UseWindowSizeDemo, { key: '9' }),
    h(UseFocusDemo, { key: '10' }),
    h(UseAnimationDemo, { key: '11' }),
    h(UseAppDemo, { key: '12' }),
    h(UseBoxMetricsDemo, { key: '13' }),
    h(StaticOutputDemo, { key: '14' }),
    h(TransformDemo, { key: '15' }),
    h(UseCursorDemo, { key: '16' }),
    h(UseStdinDemo, { key: '17' }),
    h(UseStdoutDemo, { key: '18' }),
    h(ComplexLayoutDemo, { key: '19' }),
    h(AccessibilityDemo, { key: '20' }),
  ];
  
  return h(Box, { flexDirection: 'column', padding: 1 },
    // 标题
    h(Box, { justifyContent: 'center' },
      h(Text, { bold: true, color: 'cyan', fontSize: 'large' }, '✨ Ink 完整 API 演示'),
    ),
    h(Box, { justifyContent: 'center', gap: 2 },
      h(Text, { dimColor: true }, `终端: ${columns}x${rows}`),
      h(Text, { dimColor: true }, '|'),
      h(Text, { dimColor: true }, '↑↓ 切换章节'),
      h(Text, { dimColor: true }, '|'),
      h(Text, { dimColor: true }, 'Ctrl+C 退出'),
    ),
    h(Text, { dimColor: true }, '─'.repeat(Math.min(columns, 80))),
    
    // 当前章节
    h(Box, { marginY: 1 },
      h(Text, { color: 'yellow' }, `章节 ${activeSection}/20:`),
    ),
    
    // 内容区域
    h(Box, { flexDirection: 'column', flexGrow: 1 },
      demos[activeSection - 1]
    ),
    
    h(Text, { dimColor: true }, '─'.repeat(Math.min(columns, 80))),
    h(Text, { dimColor: true }, ' Ink v7 | React for CLIs | 38.2k ⭐'),
  );
};

// 渲染应用
render(h(InkFullDemo));
