#!/usr/bin/env node
/**
 * Ink 完整功能展示 Demo (TypeScript 版本)
 * 运行: npx tsx src/index.tsx
 */
import React, { useState, useEffect, FC } from 'react';
import { 
  render, Text, Box, Newline, Spacer,
  Static, Transform,
  useInput, useApp, useStdin, useWindowSize,
  useFocus, useFocusManager,
  useAnimation, usePaste,
} from 'ink';

// 代码示例组件 - 简洁版本
const Code: FC<{ lines: string[] }> = ({ lines }) => (
  <Box flexDirection="column" marginTop={1}>
    <Text dimColor>代码示例:</Text>
    <Box backgroundColor="black" padding={1}>
      {lines.map((line, i) => (
        <Text key={i} dimColor>{line}</Text>
      ))}
    </Box>
  </Box>
);

const Demo: FC<{ title: string; children: React.ReactNode; code?: string[] }> = ({ title, children, code }) => (
  <Box flexDirection="column" marginY={1}>
    <Text bold color="cyan">{title}</Text>
    {children}
    {code && <Code lines={code} />}
  </Box>
);

// ============================================================
// 1. Text 样式
// ============================================================
const TextStyles = () => (
  <Demo 
    title="1. Text 组件 - 颜色和样式"
    code={[
      '<Text color="red" bold underline>',
      '  带样式的文字',
      '</Text>'
    ]}
  >
    <Box flexDirection="column" marginTop={1} gap={1}>
      <Box flexDirection="row" gap={2}>
        <Text color="red">红色</Text>
        <Text color="green">绿色</Text>
        <Text color="blue">蓝色</Text>
        <Text color="yellow">黄色</Text>
      </Box>
      <Box flexDirection="row" gap={2}>
        <Text bold>粗体</Text>
        <Text italic>斜体</Text>
        <Text underline>下划线</Text>
        <Text strikethrough>删除线</Text>
      </Box>
      <Box flexDirection="row" gap={2}>
        <Text backgroundColor="blue" color="white">白底蓝字</Text>
        <Text inverse>反色</Text>
        <Text dimColor>暗淡</Text>
      </Box>
    </Box>
  </Demo>
);

// ============================================================
// 2. Text Wrap
// ============================================================
const TextWrap = () => (
  <Demo 
    title="2. Text wrap - 截断模式"
    code={[
      '<Box width={18}>',
      '  <Text wrap="truncate">超出宽度截断</Text>',
      '</Box>'
    ]}
  >
    <Box marginTop={1} flexDirection="column" gap={1}>
      <Box flexDirection="row" gap={2}>
        <Text bold>truncate:</Text>
        <Box width={18} borderStyle="round">
          <Text wrap="truncate">Hello World Truncate</Text>
        </Box>
      </Box>
      <Box flexDirection="row" gap={2}>
        <Text bold>wrap:</Text>
        <Box width={18} borderStyle="round">
          <Text wrap="wrap">Hello World</Text>
        </Box>
      </Box>
    </Box>
  </Demo>
);

// ============================================================
// 3. Box 尺寸
// ============================================================
const BoxSize = () => (
  <Demo 
    title="3. Box 尺寸"
    code={[
      '<Box width={10} height={3} padding={2} borderStyle="round">',
      '  <Text>固定尺寸盒子</Text>',
      '</Box>'
    ]}
  >
    <Box marginTop={1} flexDirection="row" gap={2}>
      <Box width={8} height={3} borderStyle="round" justifyContent="center" alignItems="center">
        <Text>8x3</Text>
      </Box>
      <Box width={10} height={3} borderStyle="single" justifyContent="center" alignItems="center">
        <Text>10x3</Text>
      </Box>
      <Box width={12} height={3} borderStyle="double" justifyContent="center" alignItems="center">
        <Text>12x3</Text>
      </Box>
    </Box>
  </Demo>
);

// ============================================================
// 4. Flex 布局
// ============================================================
const FlexLayout = () => (
  <Demo 
    title="4. Flexbox 布局"
    code={[
      '<Box flexDirection="row" justifyContent="space-between">',
      '  <Text>左</Text><Text>中</Text><Text>右</Text>',
      '</Box>'
    ]}
  >
    <Box marginTop={1} flexDirection="column" gap={1}>
      <Box flexDirection="row" justifyContent="space-between" borderStyle="round" padding={1}>
        <Text>左</Text>
        <Text>中</Text>
        <Text>右</Text>
      </Box>
      <Box height={3} alignItems="center" borderStyle="round" padding={1}>
        <Text>垂直居中 (alignItems="center")</Text>
      </Box>
    </Box>
  </Demo>
);

// ============================================================
// 5. 边框样式
// ============================================================
const BorderStyles = () => (
  <Demo 
    title="5. Box 边框样式"
    code={[
      '<Box borderStyle="round">圆角</Box>',
      '<Box borderStyle="double">双线</Box>'
    ]}
  >
    <Box marginTop={1} flexDirection="column" gap={1}>
      <Box flexDirection="row" gap={2}>
        <Box width={10} borderStyle="single" justifyContent="center"><Text>single</Text></Box>
        <Box width={10} borderStyle="double" justifyContent="center"><Text>double</Text></Box>
        <Box width={10} borderStyle="round" justifyContent="center"><Text>round</Text></Box>
        <Box width={10} borderStyle="bold" justifyContent="center"><Text>bold</Text></Box>
      </Box>
    </Box>
  </Demo>
);

// ============================================================
// 6. Spacer / Newline
// ============================================================
const SpacerNewline = () => (
  <Demo 
    title="6. Spacer 和 Newline"
    code={[
      '<Box flexDirection="row">',
      '  <Text>左</Text><Spacer /><Text>右</Text>',
      '</Box>',
      '<Newline count={2} />'
    ]}
  >
    <Box marginTop={1}>
      <Box flexDirection="row">
        <Box width={8} borderStyle="round" justifyContent="center"><Text>左</Text></Box>
        <Spacer />
        <Box width={8} borderStyle="round" justifyContent="center"><Text>右</Text></Box>
      </Box>
    </Box>
    <Newline />
    <Box borderStyle="round" padding={1}>
      <Text>换行后</Text>
    </Box>
  </Demo>
);

// ============================================================
// 7. useInput
// ============================================================
const UseInput = () => {
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
    if (parts.length > 0) setKey(parts.join(' | '));
  });
  
  return (
    <Demo 
      title="7. useInput - 键盘监听"
      code={[
        'useInput((input, key) => {',
        '  if (key.upArrow) { /* 上箭头 */ }',
        '  if (input === "q") process.exit(0);',
        '});'
      ]}
    >
      <Box marginTop={1} borderStyle="round" padding={1}>
        <Text color="cyan">按键: </Text>
        <Text color="yellow" bold>{key}</Text>
      </Box>
    </Demo>
  );
};

// ============================================================
// 8. usePaste
// ============================================================
const UsePaste = () => {
  const [pasted, setPasted] = useState('');
  
  usePaste((text: string) => {
    setPasted(text.substring(0, 50));
  });
  
  return (
    <Demo 
      title="8. usePaste - 粘贴事件"
      code={[
        'usePaste((text: string) => {',
        '  console.log("粘贴了:", text);',
        '});'
      ]}
    >
      <Text marginTop={1} dimColor>在终端中粘贴文本试试 (Ctrl+Shift+V)</Text>
      {pasted ? (
        <Box marginTop={1} borderStyle="round" padding={1}>
          <Text color="green">粘贴: {pasted}</Text>
        </Box>
      ) : (
        <Text marginTop={1} dimColor>等待粘贴...</Text>
      )}
    </Demo>
  );
};

// ============================================================
// 9. useWindowSize
// ============================================================
const UseWindowSize = () => {
  const { columns, rows } = useWindowSize();
  
  return (
    <Demo 
      title="9. useWindowSize - 响应式"
      code={[
        'const { columns, rows } = useWindowSize();',
        'if (columns > 80) { /* 宽屏布局 */ }'
      ]}
    >
      <Box marginTop={1} borderStyle="round" padding={1}>
        <Text>终端: </Text>
        <Text color="cyan" bold>{columns}x{rows}</Text>
      </Box>
      <Text marginTop={1} dimColor>当前 {columns}px，{columns > 80 ? '宽屏' : '窄屏'}</Text>
    </Demo>
  );
};

// ============================================================
// 10. useFocus
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

const UseFocus = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const { focusNext, focusPrevious } = useFocusManager();
  
  useInput((_, keyInfo) => {
    if (keyInfo.tab && !keyInfo.shift) focusNext();
    else if (keyInfo.tab && keyInfo.shift) focusPrevious();
  });
  
  const options = ['选项 A', '选项 B', '选项 C'];
  
  return (
    <Demo 
      title="10. useFocus - 焦点管理"
      code={[
        'const { isFocused } = useFocus();',
        '<Box onClick={onPress}>确认</Box>',
        '// Tab 切换焦点'
      ]}
    >
      <Text marginTop={1} dimColor>Tab 切换焦点，Enter/空格 确认</Text>
      <Box marginTop={1} gap={1} flexDirection="row">
        {options.map((label, i) => (
          <FocusableButton key={i} label={label} onPress={() => setSelected(i)} />
        ))}
      </Box>
      {selected !== null && (
        <Text marginTop={1} color="green">✓ 已选择: {options[selected]}</Text>
      )}
    </Demo>
  );
};

// ============================================================
// 11. useAnimation
// ============================================================
const UseAnimation = () => {
  const [progress, setProgress] = useState(0);
  const [frame, setFrame] = useState(0);
  const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  
  useAnimation((deltaTime: number) => {
    setProgress(p => (p + deltaTime * 0.05) % 100);
    setFrame(f => (f + 1) % spinnerFrames.length);
  }, 60);
  
  const barWidth = 20;
  const filled = Math.round((progress / 100) * barWidth);
  
  return (
    <Demo 
      title="11. useAnimation - 动画"
      code={[
        'useAnimation((deltaTime) => {',
        '  setProgress(p => (p + 1) % 100);',
        '}, 60); // 60 FPS'
      ]}
    >
      <Box marginTop={1} flexDirection="row" gap={2} alignItems="center">
        <Text>{spinnerFrames[frame]} 加载</Text>
        <Box width={barWidth}>
          <Text color="cyan">{'█'.repeat(filled)}{'░'.repeat(barWidth - filled)}</Text>
        </Box>
        <Text>{Math.round(progress)}%</Text>
      </Box>
    </Demo>
  );
};

// ============================================================
// 12. useApp
// ============================================================
const UseApp = () => {
  const { exit, waitUntilRenderFlush } = useApp();
  const [status, setStatus] = useState('idle');
  
  const handleExit = async () => {
    setStatus('flushing...');
    await waitUntilRenderFlush();
    setStatus('exiting...');
    setTimeout(() => exit({ message: 'Bye!' }), 300);
  };
  
  return (
    <Demo 
      title="12. useApp - 生命周期"
      code={[
        'const { exit, waitUntilRenderFlush } = useApp();',
        'await waitUntilRenderFlush();',
        'exit({ message: "done" });'
      ]}
    >
      <Box marginTop={1} gap={1}>
        <Text>状态: <Text color="green">{status}</Text></Text>
        <Box borderStyle="round" padding={1} onClick={handleExit}>
          <Text color="yellow">点击此处演示 exit()</Text>
        </Box>
      </Box>
    </Demo>
  );
};

// ============================================================
// 13. useBoxMetrics
// ============================================================
const UseBoxMetrics = () => (
  <Demo 
    title="13. useBoxMetrics - 元素测量"
    code={[
      'const { ref, width, height } = useBoxMetrics();',
      '<Box ref={ref}><Text>内容</Text></Box>'
    ]}
  >
    <Box marginTop={1} borderStyle="round" padding={1} width={25}>
      <Text>测量这个盒子</Text>
    </Box>
    <Text marginTop={1} dimColor>ref 绑定后获取实际像素</Text>
  </Demo>
);

// ============================================================
// 14. Static
// ============================================================
const StaticDemo = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <Demo 
      title="14. Static - 静态输出"
      code={[
        '<Static items={[1, 2, 3]}>',
        '  {(item) => <Text>静态 {item}</Text>}',
        '</Static>'
      ]}
    >
      <Box marginTop={1} flexDirection="column" gap={1}>
        <Static items={[1, 2, 3]}>
          {(item: number) => <Text key={item} color="cyan">静态行 {item}</Text>}
        </Static>
        <Text color="yellow">动态计数: {count}</Text>
      </Box>
      <Text marginTop={1} dimColor>Static 不闪烁，动态内容会闪烁</Text>
    </Demo>
  );
};

// ============================================================
// 15. Transform
// ============================================================
const TransformDemo = () => (
  <Demo 
    title="15. Transform - 输出转换"
    code={[
      '<Transform transform={(line) => `→ ${line}`}>',
      '  <Box><Text>内容</Text></Box>',
      '</Transform>'
    ]}
  >
    <Box marginTop={1}>
      <Transform transform={(line: string) => `→ ${line}`}>
        <Box borderStyle="round" padding={1}>
          <Text color="cyan">这行被添加了前缀</Text>
        </Box>
      </Transform>
    </Box>
  </Demo>
);

// ============================================================
// 16. useCursor
// ============================================================
const UseCursor = () => {
  const [step, setStep] = useState(0);
  
  useInput((_, keyInfo) => {
    if (keyInfo.rightArrow) setStep(s => Math.min(4, s + 1));
    if (keyInfo.leftArrow) setStep(s => Math.max(0, s - 1));
  });
  
  const steps = ['①', '②', '③', '④', '⑤'];
  
  return (
    <Demo 
      title="16. useCursor - 光标控制"
      code={[
        'const { setCursorPosition } = useCursor();',
        'setCursorPosition({ left: 5, top: 10 });'
      ]}
    >
      <Text marginTop={1} dimColor>左右箭头移动:</Text>
      <Box marginTop={1} flexDirection="row">
        {steps.map((s, i) => (
          <Text key={i} color={i === step ? 'green' : 'gray'} bold={i === step}>
            {s}{i < 4 ? ' → ' : ''}
          </Text>
        ))}
      </Box>
    </Demo>
  );
};

// ============================================================
// 17. useStdin
// ============================================================
const UseStdin = () => {
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
    <Demo 
      title="17. useStdin - Raw 模式"
      code={[
        'const { isRawModeSupported, setRawMode } = useStdin();',
        'setRawMode(true); // 启用 Raw 模式'
      ]}
    >
      <Box marginTop={1} borderStyle="round" padding={1}>
        <Text>Raw 模式支持: </Text>
        <Text color={isRawModeSupported ? 'green' : 'red'}>{isRawModeSupported ? '是' : '否'}</Text>
      </Box>
      <Text marginTop={1}>当前: <Text color="cyan">{mode}</Text> | 按 R 切换</Text>
    </Demo>
  );
};

// ============================================================
// 18. useStdout
// ============================================================
const UseStdout = () => (
  <Demo 
    title="18. useStdout - 直接写入"
    code={[
      'const { stdout } = useStdout();',
      'stdout.write("直接写入 stdout\\n");'
    ]}
  >
    <Text marginTop={1} dimColor>stdout.write() 绕过 Ink 直接写入终端</Text>
    <Text marginTop={1} dimColor>用于日志、调试信息等</Text>
  </Demo>
);

// ============================================================
// 19. 复杂布局
// ============================================================
const ComplexLayout = () => (
  <Demo 
    title="19. 复杂布局 - 表格"
    code={[
      '<Box flexDirection="column" borderStyle="double">',
      '  <Box gap={2}><Box w={8}><Text bold>姓名</Text></Box>...</Box>',
      '  <Text>───</Text>',
      '  <Box gap={2}><Text>张三</Text>...</Box>',
      '</Box>'
    ]}
  >
    <Box marginTop={1} flexDirection="column" borderStyle="double" padding={1}>
      <Box flexDirection="row" gap={2}>
        <Box width={8}><Text bold>姓名</Text></Box>
        <Box width={6}><Text bold>年龄</Text></Box>
        <Box width={10}><Text bold>城市</Text></Box>
      </Box>
      <Text dimColor>{'─'.repeat(30)}</Text>
      {[['张三', '28', '北京'], ['李四', '34', '上海'], ['王五', '25', '深圳']].map(([name, age, city], i) => (
        <Box key={i} flexDirection="row" gap={2}>
          <Box width={8}><Text color="cyan">{name}</Text></Box>
          <Box width={6}><Text>{age}</Text></Box>
          <Box width={10}><Text>{city}</Text></Box>
        </Box>
      ))}
    </Box>
  </Demo>
);

// ============================================================
// 20. 可访问性
// ============================================================
const Accessibility = () => (
  <Demo 
    title="20. 可访问性属性"
    code={[
      '<Box aria-label="关闭按钮"',
      '     aria-role="button">',
      '  <Text>×</Text>',
      '</Box>'
    ]}
  >
    <Box marginTop={1} flexDirection="column" gap={1}>
      <Text>aria-label - 元素描述</Text>
      <Text>aria-hidden - 隐藏于辅助技术</Text>
      <Text>aria-role - 元素角色</Text>
      <Text>aria-state - 元素状态</Text>
    </Box>
  </Demo>
);

// ============================================================
// 主应用
// ============================================================
const App: FC = () => {
  const [activeSection, setActiveSection] = useState(1);
  const { columns, rows } = useWindowSize();
  
  useInput((input, keyInfo) => {
    if (keyInfo.upArrow) setActiveSection(s => Math.max(1, s - 1));
    if (keyInfo.downArrow) setActiveSection(s => Math.min(20, s + 1));
    if (keyInfo.ctrl && input === 'c') process.exit(0);
  });
  
  const demos = [
    <TextStyles key="1" />,
    <TextWrap key="2" />,
    <BoxSize key="3" />,
    <FlexLayout key="4" />,
    <BorderStyles key="5" />,
    <SpacerNewline key="6" />,
    <UseInput key="7" />,
    <UsePaste key="8" />,
    <UseWindowSize key="9" />,
    <UseFocus key="10" />,
    <UseAnimation key="11" />,
    <UseApp key="12" />,
    <UseBoxMetrics key="13" />,
    <StaticDemo key="14" />,
    <TransformDemo key="15" />,
    <UseCursor key="16" />,
    <UseStdin key="17" />,
    <UseStdout key="18" />,
    <ComplexLayout key="19" />,
    <Accessibility key="20" />,
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

render(<App />);
