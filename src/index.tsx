#!/usr/bin/env node
/**
 * Ink 完整功能展示 Demo (TypeScript 版本)
 * 覆盖 Ink 所有核心 API：组件、Hooks、布局、交互
 * 
 * 运行: npx tsx src/index.tsx
 */
import React, { useState, useEffect, FC } from 'react';
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
  usePaste,
} from 'ink';

// ============================================================
// 代码说明组件
// ============================================================
const CodeBlock: FC<{ code: string }> = ({ code }) => (
  <Box flexDirection="column" marginTop={1}>
    <Text dimColor>代码:</Text>
    <Box backgroundColor="black" padding={1} marginTop={1} borderStyle="round" borderColor="gray">
      {code.split('\n').slice(0, 5).map((line, i) => (
        <Text key={i} dimColor>{line}</Text>
      ))}
    </Box>
  </Box>
);

// ============================================================
// 演示1: Text 组件 - 颜色和样式
// ============================================================
const TextStylesDemo: FC = () => (
  <Box flexDirection="column" marginY={1}>
    <Text bold color="cyan">1. Text 组件 - 颜色和样式</Text>
    <Text dimColor marginTop={1}>Text 是 Ink 最基本的组件，用于显示文字。支持的样式属性：</Text>
    
    <Box flexDirection="column" marginTop={1} gap={1}>
      <Box gap={2}><Text color="red">■</Text><Text>color="red" - 文字颜色</Text></Box>
      <Box gap={2}><Text backgroundColor="blue" color="white">■</Text><Text>backgroundColor - 背景色</Text></Box>
      <Box gap={2}><Text bold>■</Text><Text>bold - 粗体</Text></Box>
      <Box gap={2}><Text italic>■</Text><Text>italic - 斜体</Text></Box>
      <Box gap={2}><Text underline>■</Text><Text>underline - 下划线</Text></Box>
      <Box gap={2}><Text strikethrough>■</Text><Text>strikethrough - 删除线</Text></Box>
      <Box gap={2}><Text inverse>■</Text><Text>inverse - 反色</Text></Box>
      <Box gap={2}><Text dimColor>■</Text><Text>dimColor - 暗淡</Text></Box>
    </Box>
    
    <CodeBlock code={`<Text color="red" bold underline>
  带样式的文字
</Text>`} />
  </Box>
);

// ============================================================
// 演示2: Text wrap 模式
// ============================================================
const TextWrapDemo: FC = () => (
  <Box flexDirection="column" marginY={1}>
    <Text bold color="cyan">2. Text wrap - 文本截断模式</Text>
    <Text dimColor marginTop={1}>当文字超出容器宽度时，wrap 属性决定如何处理：</Text>
    
    <Box marginTop={1} gap={1}>
      <Box gap={2}>
        <Text bold>truncate:</Text>
        <Box width={20} borderStyle="round" padding={1}>
          <Text wrap="truncate">Hello World Truncate</Text>
        </Box>
      </Box>
      <Box gap={2}>
        <Text bold>truncate-middle:</Text>
        <Box width={20} borderStyle="round" padding={1}>
          <Text wrap="truncate-middle">Hello World</Text>
        </Box>
      </Box>
      <Box gap={2}>
        <Text bold>truncate-start:</Text>
        <Box width={20} borderStyle="round" padding={1}>
          <Text wrap="truncate-start">Hello World</Text>
        </Box>
      </Box>
      <Box gap={2}>
        <Text bold>wrap (默认):</Text>
        <Box width={20} borderStyle="round" padding={1}>
          <Text wrap="wrap">Hello World</Text>
        </Box>
      </Box>
    </Box>
    
    <CodeBlock code={`<Box width={20}>
  <Text wrap="truncate">Hello World</Text>
</Box>`} />
  </Box>
);

// ============================================================
// 演示3: Box 布局 - 尺寸
// ============================================================
const BoxLayoutDemo: FC = () => (
  <Box flexDirection="column" marginY={1}>
    <Text bold color="cyan">3. Box 组件 - 尺寸与布局</Text>
    <Text dimColor marginTop={1}>Box 是 Ink 的核心布局组件，类似 CSS 的 flex 容器。</Text>
    
    <Box marginTop={1} gap={1}>
      <Text bold>width / height:</Text>
      <Box gap={2} flexDirection="row">
        <Box width={10} height={3} borderStyle="round" justifyContent="center" alignItems="center">
          <Text>10x3</Text>
        </Box>
        <Box width={15} height={3} borderStyle="single" justifyContent="center" alignItems="center">
          <Text>15x3</Text>
        </Box>
        <Box width={20} height={3} borderStyle="double" justifyContent="center" alignItems="center">
          <Text>20x3</Text>
        </Box>
      </Box>
    </Box>
    
    <Box marginTop={1} gap={1}>
      <Text bold>padding / margin / gap:</Text>
      <Box borderStyle="round" padding={2} margin={1} gap={1}>
        <Text>内边距 padding=2</Text>
        <Text>外边距 margin=1</Text>
        <Text>元素间距 gap=1</Text>
      </Box>
    </Box>
    
    <CodeBlock code={`<Box 
  width={20} 
  height={5}
  padding={2}
  margin={1}
  gap={2}
  borderStyle="round"
  justifyContent="center"
  alignItems="center"
>
  <Text>内容</Text>
</Box>`} />
  </Box>
);

// ============================================================
// 演示4: Flex 布局
// ============================================================
const FlexLayoutDemo: FC = () => (
  <Box flexDirection="column" marginY={1}>
    <Text bold color="cyan">4. Flexbox 布局</Text>
    <Text dimColor marginTop={1}>justifyContent 和 alignItems 控制主轴和交叉轴对齐：</Text>
    
    <Box marginTop={1} flexDirection="column" gap={1}>
      <Text bold color="yellow">justifyContent (水平对齐):</Text>
      <Box flexDirection="row" justifyContent="space-between" borderStyle="round" padding={1}>
        <Text>左</Text>
        <Text>中</Text>
        <Text>右</Text>
      </Box>
    </Box>
    
    <Box marginTop={1} flexDirection="column" gap={1}>
      <Text bold color="yellow">alignItems (垂直对齐):</Text>
      <Box height={5} borderStyle="round" alignItems="center">
        <Text>居中</Text>
      </Box>
    </Box>
    
    <CodeBlock code={`// 水平居中，垂直居中
<Box 
  justifyContent="center" 
  alignItems="center"
>
  <Text>居中内容</Text>
</Box>

// 两端对齐
<Box justifyContent="space-between">
  <Text>左</Text>
  <Text>右</Text>
</Box>`} />
  </Box>
);

// ============================================================
// 演示5: 边框样式
// ============================================================
const BorderStylesDemo: FC = () => (
  <Box flexDirection="column" marginY={1}>
    <Text bold color="cyan">5. Box 边框样式</Text>
    <Text dimColor marginTop={1}>borderStyle 属性支持 8 种样式：</Text>
    
    <Box marginTop={1} gap={2} flexDirection="row" flexWrap="wrap">
      {['single', 'double', 'round', 'bold', 'singleDouble', 'doubleSingle', 'classic', 'dots'].map(style => (
        <Box key={style} width={15} height={3} borderStyle={style as any} justifyContent="center" alignItems="center">
          <Text>{style}</Text>
        </Box>
      ))}
    </Box>
    
    <CodeBlock code={`<Box borderStyle="round">圆角边框</Box>
<Box borderStyle="double">双线边框</Box>
<Box borderStyle="bold">粗边框</Box>`} />
  </Box>
);

// ============================================================
// 演示6: Spacer 和 Newline
// ============================================================
const SpacerNewlineDemo: FC = () => (
  <Box flexDirection="column" marginY={1}>
    <Text bold color="cyan">6. Spacer 和 Newline</Text>
    <Text dimColor marginTop={1}>Spacer 占据flex剩余空间，Newline 换行：</Text>
    
    <Box marginTop={1}>
      <Box flexDirection="row">
        <Box width={8} borderStyle="round" justifyContent="center" alignItems="center">
          <Text>左边</Text>
        </Box>
        <Spacer />
        <Box width={8} borderStyle="round" justifyContent="center" alignItems="center">
          <Text>右边</Text>
        </Box>
      </Box>
      <Text dimColor marginTop={1}>← Spacer 自动填充中间空间 →</Text>
    </Box>
    
    <Newline count={2} />
    
    <Box borderStyle="round" padding={1}>
      <Text>换行后</Text>
    </Box>
    
    <CodeBlock code={`// Spacer 填充中间空间
<Box flexDirection="row">
  <Text>左</Text>
  <Spacer />
  <Text>右</Text>
</Box>

// Newline 换行
<Newline count={2} />`} />
  </Box>
);

// ============================================================
// 演示7: useInput 键盘输入
// ============================================================
const UseInputDemo: FC = () => {
  const [key, setKey] = useState('等待按键...');
  
  useInput((input, keyInfo) => {
    const parts: string[] = [];
    if (input) parts.push(`"${input}"`);
    if (keyInfo.upArrow) parts.push('↑');
    if (keyInfo.downArrow) parts.push('↓');
    if (keyInfo.leftArrow) parts.push('←');
    if (keyInfo.rightArrow) parts.push('→');
    if (keyInfo.return) parts.push('Enter');
    if (keyInfo.escape) parts.push('Esc');
    if (keyInfo.backspace) parts.push('Backspace');
    if (keyInfo.tab) parts.push('Tab');
    if (keyInfo.ctrl) parts.push('Ctrl');
    if (parts.length > 0) setKey(parts.join(' + '));
  });
  
  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color="cyan">7. useInput - 键盘监听</Text>
      <Text dimColor marginTop={1}>监听用户按键事件，按下任意键试试：</Text>
      <Box marginTop={1} borderStyle="round" padding={1}>
        <Text color="cyan">按键: </Text>
        <Text color="yellow" bold>{key}</Text>
      </Box>
      
      <CodeBlock code={`useInput((input, key) => {
  if (input === 'q') process.exit(0);
  if (key.upArrow) console.log('上');
  if (key.return) console.log('回车');
});`} />
    </Box>
  );
};

// ============================================================
// 演示8: usePaste 粘贴事件
// ============================================================
const UsePasteDemo: FC = () => {
  const [pasted, setPasted] = useState('');
  
  usePaste((text: string) => {
    setPasted(text.substring(0, 80));
  });
  
  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color="cyan">8. usePaste - 粘贴事件</Text>
      <Text dimColor marginTop={1}>在终端中粘贴文本（Ctrl+Shift+V）：</Text>
      {pasted ? (
        <Box marginTop={1} borderStyle="round" padding={1}>
          <Text color="green">粘贴内容: </Text>
          <Text>{pasted}</Text>
        </Box>
      ) : (
        <Text marginTop={1} dimColor>等待粘贴...</Text>
      )}
      
      <CodeBlock code={`usePaste((text: string) => {
  console.log('粘贴了:', text);
});`} />
    </Box>
  );
};

// ============================================================
// 演示9: useWindowSize 响应式
// ============================================================
const UseWindowSizeDemo: FC = () => {
  const { columns, rows } = useWindowSize();
  
  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color="cyan">9. useWindowSize - 响应式</Text>
      <Text dimColor marginTop={1}>获取终端尺寸，实现响应式布局：</Text>
      <Box marginTop={1} borderStyle="round" padding={1}>
        <Text>终端: </Text>
        <Text color="cyan" bold>{columns}</Text>
        <Text> 列 x </Text>
        <Text color="cyan" bold>{rows}</Text>
        <Text> 行</Text>
      </Box>
      <Text marginTop={1} dimColor>当前宽度 {columns}px，{columns > 80 ? '显示双列布局' : '显示单列布局'}</Text>
      
      <CodeBlock code={`const { columns, rows } = useWindowSize();

if (columns > 80) {
  // 宽屏布局
} else {
  // 窄屏布局
}`} />
    </Box>
  );
};

// ============================================================
// 演示10: useFocus 焦点管理
// ============================================================
const FocusableButton: FC<{ label: string; onPress: () => void }> = ({ label, onPress }) => {
  const { isFocused } = useFocus();
  
  useInput((input, keyInfo) => {
    if ((keyInfo.return || input === ' ') && isFocused) onPress();
  });
  
  return (
    <Box 
      borderStyle={isFocused ? 'bold' : 'round'} 
      borderColor={isFocused ? 'green' : 'gray'}
      paddingLeft={2}
      paddingRight={2}
    >
      <Text color={isFocused ? 'green' : 'white'} bold={isFocused}>
        {(isFocused ? '▶ ' : '  ') + label}
      </Text>
    </Box>
  );
};

const UseFocusDemo: FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const { focusNext, focusPrevious } = useFocusManager();
  
  useInput((_, keyInfo) => {
    if (keyInfo.tab && !keyInfo.shift) focusNext();
    else if (keyInfo.tab && keyInfo.shift) focusPrevious();
  });
  
  const options = ['选项 A', '选项 B', '选项 C'];
  
  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color="cyan">10. useFocus - 焦点管理</Text>
      <Text dimColor marginTop={1}>Tab 切换焦点，Enter 或 空格 确认：</Text>
      <Box marginTop={1} gap={1} flexDirection="row">
        {options.map((label, i) => (
          <FocusableButton key={i} label={label} onPress={() => setSelected(i)} />
        ))}
      </Box>
      {selected !== null && (
        <Text marginTop={1} color="green">✓ 已选择: {options[selected]}</Text>
      )}
      
      <CodeBlock code={`const { isFocused } = useFocus();

useInput((input, key) => {
  if (key.return && isFocused) {
    // 确认选择
  }
});

// Tab 切换
const { focusNext, focusPrevious } = useFocusManager();
useInput((_, key) => {
  if (key.tab) focusNext();
});`} />
    </Box>
  );
};

// ============================================================
// 演示11: useAnimation 动画
// ============================================================
const UseAnimationDemo: FC = () => {
  const [progress, setProgress] = useState(0);
  const [frame, setFrame] = useState(0);
  const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  
  useAnimation((deltaTime: number) => {
    setProgress(p => (p + deltaTime * 0.05) % 100);
    setFrame(f => (f + 1) % spinnerFrames.length);
  }, 60);
  
  const barWidth = 25;
  const filled = Math.round((progress / 100) * barWidth);
  
  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color="cyan">11. useAnimation - 动画</Text>
      <Box marginTop={1} gap={2}>
        <Box gap={1} flexDirection="row" alignItems="center">
          <Text>{spinnerFrames[frame]}</Text>
          <Text>加载动画</Text>
        </Box>
        <Box width={barWidth}>
          <Text color="cyan">{'█'.repeat(filled)}{'░'.repeat(barWidth - filled)}</Text>
        </Box>
        <Text color="yellow">{Math.round(progress)}%</Text>
      </Box>
      
      <CodeBlock code={`useAnimation((deltaTime) => {
  setProgress(p => (p + deltaTime * 0.1) % 100);
}, 60); // 60 FPS`} />
    </Box>
  );
};

// ============================================================
// 演示12: useApp 退出
// ============================================================
const UseAppDemo: FC = () => {
  const { exit, waitUntilRenderFlush } = useApp();
  const [status, setStatus] = useState('idle');
  
  const handleExit = async () => {
    setStatus('flushing...');
    await waitUntilRenderFlush();
    setStatus('exiting...');
    setTimeout(() => exit({ message: 'Bye!' }), 300);
  };
  
  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color="cyan">12. useApp - 应用生命周期</Text>
      <Text dimColor marginTop={1}>exit() 退出应用，waitUntilRenderFlush() 等待渲染完成：</Text>
      <Box marginTop={1} gap={1}>
        <Text>状态: <Text color="green">{status}</Text></Text>
        <Box borderStyle="round" padding={1} onClick={handleExit}>
          <Text color="yellow">点击此处演示 exit() → </Text>
        </Box>
      </Box>
      
      <CodeBlock code={`const { exit, waitUntilRenderFlush } = useApp();

// 等待渲染完成后再退出
await waitUntilRenderFlush();
exit({ message: 'done' });`} />
    </Box>
  );
};

// ============================================================
// 演示13: useBoxMetrics 元素测量
// ============================================================
const UseBoxMetricsDemo: FC = () => {
  const { ref, width, height, hasMeasured } = useBoxMetrics();
  
  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color="cyan">13. useBoxMetrics - 元素测量</Text>
      <Text dimColor marginTop={1}>测量元素实际渲染尺寸：</Text>
      <Box ref={ref} marginTop={1} borderStyle="round" padding={1} width={30}>
        <Text>测量这个盒子</Text>
      </Box>
      <Box marginTop={1}>
        <Text>测量结果: </Text>
        <Text color={hasMeasured ? 'green' : 'yellow'}>
          {hasMeasured ? `${width} x ${height}` : '测量中...'}
        </Text>
      </Box>
      
      <CodeBlock code={`const { ref, width, height, hasMeasured } = useBoxMetrics();

<Box ref={ref} width={30}>
  <Text>内容</Text>
</Box>

if (hasMeasured) {
  console.log(\`尺寸: \${width}x\${height}\`);
}`} />
    </Box>
  );
};

// ============================================================
// 演示14: Static 静态输出
// ============================================================
const StaticOutputDemo: FC = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color="cyan">14. Static - 静态输出</Text>
      <Text dimColor marginTop={1}>Static 包裹的内容不参与重新渲染，不会闪烁：</Text>
      <Box marginTop={1} gap={1}>
        <Static items={[1, 2, 3]}>
          {(item: number) => <Text key={item} color="cyan">静态行 {item}</Text>}
        </Static>
        <Text color="yellow">动态计数: {count} (每秒更新)</Text>
      </Box>
      
      <CodeBlock code={`// Static 内容不闪烁
<Static items={[1, 2, 3]}>
  {(item) => <Text>静态 {item}</Text>}
</Static>

// 普通内容会闪烁
<Text>动态: {count}</Text>`} />
    </Box>
  );
};

// ============================================================
// 演示15: Transform 输出转换
// ============================================================
const TransformDemo: FC = () => (
  <Box flexDirection="column" marginY={1}>
    <Text bold color="cyan">15. Transform - 输出转换</Text>
    <Text dimColor marginTop={1}>在输出到终端前转换内容：</Text>
    <Box marginTop={1}>
      <Transform transform={(line: string) => `→ ${line}`}>
        <Box borderStyle="round" padding={1}>
          <Text color="cyan">这行会被添加前缀</Text>
        </Box>
      </Transform>
    </Box>
    
    <CodeBlock code={`// 为所有输出添加前缀
<Transform transform={(line) => \`→ \${line}\`}>
  <Box>
    <Text>内容</Text>
  </Box>
</Transform>`} />
  </Box>
);

// ============================================================
// 演示16: useCursor 光标控制
// ============================================================
const UseCursorDemo: FC = () => {
  const [step, setStep] = useState(0);
  
  useInput((_, keyInfo) => {
    if (keyInfo.rightArrow) setStep(s => Math.min(4, s + 1));
    if (keyInfo.leftArrow) setStep(s => Math.max(0, s - 1));
  });
  
  const steps = ['①', '②', '③', '④', '⑤'];
  
  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color="cyan">16. useCursor - 光标控制</Text>
      <Text dimColor marginTop={1}>左右箭头移动（演示用文字模拟）：</Text>
      <Box marginTop={1} flexDirection="row">
        {steps.map((step, i) => (
          <Text key={i} color={i === step ? 'green' : 'gray'} bold={i === step}>
            {step}{i < 4 ? ' → ' : ''}
          </Text>
        ))}
      </Box>
      
      <CodeBlock code={`const { setCursorPosition } = useCursor();

// 将光标移到指定位置
setCursorPosition({ left: 5, top: 10 });`} />
    </Box>
  );
};

// ============================================================
// 演示17: useStdin Raw 模式
// ============================================================
const UseStdinDemo: FC = () => {
  const { isRawModeSupported, setRawMode } = useStdin();
  const [mode, setMode] = useState('cooked');
  
  useInput((input) => {
    if (input === 'r') {
      const newMode = mode === 'cooked' ? 'raw' : 'cooked';
      setRawMode(newMode === 'raw');
      setMode(newMode);
    }
  });
  
  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color="cyan">17. useStdin - Raw 模式</Text>
      <Text dimColor marginTop={1}>Raw 模式绕过终端缓冲，直接读取按键：</Text>
      <Box marginTop={1} borderStyle="round" padding={1}>
        <Text>Raw 模式支持: </Text>
        <Text color={isRawModeSupported ? 'green' : 'red'}>{isRawModeSupported ? '是' : '否'}</Text>
      </Box>
      <Text marginTop={1}>当前: <Text color="cyan">{mode}</Text> | 按 R 切换</Text>
      
      <CodeBlock code={`const { isRawModeSupported, setRawMode } = useStdin();

// 启用 Raw 模式
setRawMode(true);

// Raw 模式下每个字符立即可用
// 不需要等待回车`} />
    </Box>
  );
};

// ============================================================
// 演示18: useStdout 写入
// ============================================================
const UseStdoutDemo: FC = () => {
  const stdout = useStdout();
  
  useEffect(() => {
    if (stdout) {
      stdout.write('[边缘写入] 这行直接写到 stdout\n');
    }
  }, [stdout]);
  
  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color="cyan">18. useStdout - 直接写入</Text>
      <Text dimColor marginTop={1}>绕过 Ink 渲染直接写入 stdout：</Text>
      <Text marginTop={1} dimColor>上面的 "[边缘写入]" 是通过 stdout.write 直接输出的</Text>
      
      <CodeBlock code={`const stdout = useStdout();

stdout.write('直接写入 stdout\\n');`} />
    </Box>
  );
};

// ============================================================
// 演示19: 复杂布局 - 表格
// ============================================================
const ComplexLayoutDemo: FC = () => (
  <Box flexDirection="column" marginY={1}>
    <Text bold color="cyan">19. 复杂布局 - 表格</Text>
    <Text dimColor marginTop={1}>用 Box 嵌套实现表格：</Text>
    
    <Box marginTop={1} flexDirection="column" borderStyle="double" padding={1}>
      <Box gap={2}>
        <Box width={10}><Text bold>姓名</Text></Box>
        <Box width={8}><Text bold>年龄</Text></Box>
        <Box width={12}><Text bold>城市</Text></Box>
      </Box>
      <Text dimColor>{'─'.repeat(35)}</Text>
      {[
        ['张三', '28', '北京'],
        ['李四', '34', '上海'],
        ['王五', '25', '深圳'],
      ].map(([name, age, city], i) => (
        <Box key={i} gap={2}>
          <Box width={10}><Text color="cyan">{name}</Text></Box>
          <Box width={8}><Text>{age}</Text></Box>
          <Box width={12}><Text>{city}</Text></Box>
        </Box>
      ))}
    </Box>
    
    <CodeBlock code={`<Box flexDirection="column" borderStyle="double">
  <Box gap={2}>
    <Box width={10}><Text bold>姓名</Text></Box>
    <Box width={8}><Text bold>年龄</Text></Box>
  </Box>
  <Text dimColor>──────────</Text>
  <Box gap={2}>
    <Box width={10}><Text>张三</Text></Box>
    <Box width={8}><Text>28</Text></Box>
  </Box>
</Box>`} />
  </Box>
);

// ============================================================
// 演示20: 可访问性属性
// ============================================================
const AccessibilityDemo: FC = () => (
  <Box flexDirection="column" marginY={1}>
    <Text bold color="cyan">20. 可访问性属性</Text>
    <Text dimColor marginTop={1}>INK 支持 ARIA 属性，方便屏幕阅读器：</Text>
    
    <Box marginTop={1} gap={1} flexDirection="column">
      <Text><Text bold>aria-label:</Text> 元素的文字描述</Text>
      <Text><Text bold>aria-hidden:</Text> 从辅助技术隐藏</Text>
      <Text><Text bold>aria-role:</Text>元素的角色（如 button）</Text>
      <Text><Text bold>aria-state:</Text> 元素状态（如选中）</Text>
    </Box>
    
    <CodeBlock code={`<Box 
  aria-label="关闭按钮"
  aria-role="button"
  aria-state="pressed"
>
  <Text>×</Text>
</Box>`} />
  </Box>
);

// ============================================================
// 主应用
// ============================================================
const InkFullDemo: FC = () => {
  const [activeSection, setActiveSection] = useState(1);
  const { columns, rows } = useWindowSize();
  
  useInput((input, keyInfo) => {
    if (keyInfo.upArrow) setActiveSection(s => Math.max(1, s - 1));
    if (keyInfo.downArrow) setActiveSection(s => Math.min(20, s + 1));
    if (keyInfo.ctrl && input === 'c') process.exit(0);
  });
  
  const demos = [
    <TextStylesDemo key="1" />,
    <TextWrapDemo key="2" />,
    <BoxLayoutDemo key="3" />,
    <FlexLayoutDemo key="4" />,
    <BorderStylesDemo key="5" />,
    <SpacerNewlineDemo key="6" />,
    <UseInputDemo key="7" />,
    <UsePasteDemo key="8" />,
    <UseWindowSizeDemo key="9" />,
    <UseFocusDemo key="10" />,
    <UseAnimationDemo key="11" />,
    <UseAppDemo key="12" />,
    <UseBoxMetricsDemo key="13" />,
    <StaticOutputDemo key="14" />,
    <TransformDemo key="15" />,
    <UseCursorDemo key="16" />,
    <UseStdinDemo key="17" />,
    <UseStdoutDemo key="18" />,
    <ComplexLayoutDemo key="19" />,
    <AccessibilityDemo key="20" />,
  ];
  
  return (
    <Box flexDirection="column" padding={1}>
      <Box justifyContent="center">
        <Text bold color="cyan" fontSize="large">✨ Ink 完整 API 演示</Text>
      </Box>
      <Box justifyContent="center" gap={2}>
        <Text dim>终端: {columns}x{rows}</Text>
        <Text dim>|</Text>
        <Text dim>↑↓ 切换</Text>
        <Text dim>|</Text>
        <Text dim>Ctrl+C 退出</Text>
      </Box>
      <Text dimColor>{'─'.repeat(Math.min(columns, 80))}</Text>
      
      <Box marginY={1}>
        <Text color="yellow">章节 {activeSection}/20</Text>
      </Box>
      
      <Box flexDirection="column" flexGrow={1}>
        {demos[activeSection - 1]}
      </Box>
      
      <Text dimColor>{'─'.repeat(Math.min(columns, 80))}</Text>
      <Text dim>ink v7 | React for CLIs</Text>
    </Box>
  );
};

render(<InkFullDemo />);
