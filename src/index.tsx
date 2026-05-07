#!/usr/bin/env node
/**
 * Ink 完整功能展示 Demo (TypeScript 版本)
 * 覆盖 Ink 所有核心 API：组件、Hooks、布局、交互
 * 
 * 运行: npx tsx src/index.tsx
 * 或: npx ts-node src/index.tsx
 */
import React, { useState, useEffect } from 'react';
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
  InkElement,
  FC,
} from 'ink';

// ============================================================
// 演示1: Text 组件 - 颜色和样式
// ============================================================
const TextStylesDemo: FC = () => (
  <Box flexDirection="column" marginY={1}>
    <Box gap={2}>
      <Text bold color="cyan">1. Text 样式演示</Text>
    </Box>
    <Box gap={2}>
      <Text color="red">红色</Text>
      <Text color="green">绿色</Text>
      <Text color="blue">蓝色</Text>
      <Text color="yellow">黄色</Text>
      <Text color="magenta">品红</Text>
      <Text color="cyan">青色</Text>
    </Box>
    <Box gap={2}>
      <Text backgroundColor="red" color="white">白底红字</Text>
      <Text dimColor>暗淡文字</Text>
      <Text bold>粗体</Text>
      <Text italic>斜体</Text>
      <Text underline>下划线</Text>
      <Text strikethrough>删除线</Text>
      <Text inverse>反色</Text>
    </Box>
  </Box>
);

// ============================================================
// 演示2: Text wrap 模式
// ============================================================
const TextWrapDemo: FC = () => (
  <Box flexDirection="column" marginY={1}>
    <Text bold color="cyan">2. Text Wrap 模式 (容器 width=25)</Text>
    <Box width={25} borderStyle="round" padding={1}>
      <Text wrap="truncate">Hello World Truncate</Text>
    </Box>
    <Box width={25} borderStyle="round" padding={1} marginTop={1}>
      <Text wrap="truncate-middle">Hello World Middle</Text>
    </Box>
    <Box width={25} borderStyle="round" padding={1} marginTop={1}>
      <Text wrap="truncate-start">Hello World Start</Text>
    </Box>
  </Box>
);

// ============================================================
// 演示3: Box 布局 - 尺寸
// ============================================================
const BoxLayoutDemo: FC = () => (
  <Box flexDirection="column" marginY={1}>
    <Text bold color="cyan">3. Box 布局尺寸</Text>
    <Box gap={2}>
      <Box width={8} height={3} borderStyle="round" justifyContent="center" alignItems="center">
        <Text>8x3</Text>
      </Box>
      <Box width={12} height={3} borderStyle="single" justifyContent="center" alignItems="center">
        <Text>12x3</Text>
      </Box>
      <Box width={16} height={3} borderStyle="double" justifyContent="center" alignItems="center">
        <Text>16x3</Text>
      </Box>
    </Box>
    <Text dimColor marginTop={1}>padding / margin / gap</Text>
  </Box>
);

// ============================================================
// 演示4: Flex 布局
// ============================================================
const FlexLayoutDemo: FC = () => (
  <Box flexDirection="column" marginY={1}>
    <Text bold color="cyan">4. Flex 布局</Text>
    <Box gap={2}>
      <Box width={20} gap={1}>
        <Text bold color="yellow">justifyContent:</Text>
        <Box borderStyle="round" padding={1}>
          <Text dimColor>flex-start|center|flex-end</Text>
        </Box>
      </Box>
      <Box width={20} gap={1}>
        <Text bold color="yellow">alignItems:</Text>
        <Box borderStyle="round" padding={1} height={3} alignItems="center">
          <Text dimColor>flex-start|center|flex-end</Text>
        </Box>
      </Box>
    </Box>
  </Box>
);

// ============================================================
// 演示5: 边框样式
// ============================================================
const BorderStylesDemo: FC = () => (
  <Box flexDirection="column" marginY={1}>
    <Text bold color="cyan">5. 边框样式</Text>
    <Box gap={2} flexDirection="row">
      <Box width={12} height={3} borderStyle="single" justifyContent="center" alignItems="center">
        <Text>single</Text>
      </Box>
      <Box width={12} height={3} borderStyle="double" justifyContent="center" alignItems="center">
        <Text>double</Text>
      </Box>
      <Box width={12} height={3} borderStyle="round" justifyContent="center" alignItems="center">
        <Text>round</Text>
      </Box>
      <Box width={12} height={3} borderStyle="bold" justifyContent="center" alignItems="center">
        <Text>bold</Text>
      </Box>
    </Box>
    <Box gap={2} flexDirection="row" marginTop={1}>
      <Box width={14} height={3} borderStyle="singleDouble" justifyContent="center" alignItems="center">
        <Text>s-d</Text>
      </Box>
      <Box width={14} height={3} borderStyle="doubleSingle" justifyContent="center" alignItems="center">
        <Text>d-s</Text>
      </Box>
      <Box width={14} height={3} borderStyle="classic" justifyContent="center" alignItems="center">
        <Text>classic</Text>
      </Box>
      <Box width={14} height={3} borderStyle="dots" justifyContent="center" alignItems="center">
        <Text>dots</Text>
      </Box>
    </Box>
  </Box>
);

// ============================================================
// 演示6: Spacer 和 Newline
// ============================================================
const SpacerNewlineDemo: FC = () => (
  <Box flexDirection="column" marginY={1}>
    <Text bold color="cyan">6. Spacer 和 Newline</Text>
    <Box flexDirection="row">
      <Box width={10} borderStyle="round" justifyContent="center" alignItems="center">
        <Text>左边</Text>
      </Box>
      <Spacer />
      <Box width={10} borderStyle="round" justifyContent="center" alignItems="center">
        <Text>右边</Text>
      </Box>
    </Box>
    <Newline count={2} />
    <Box borderStyle="round" padding={1}>
      <Text>换行后</Text>
    </Box>
  </Box>
);

// ============================================================
// 演示7: useInput 键盘输入
// ============================================================
const UseInputDemo: FC = () => {
  const [key, setKey] = useState('等待按键...');
  
  useInput((input, keyInfo) => {
    const parts: string[] = [];
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
  
  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color="cyan">7. useInput 键盘监听</Text>
      <Box borderStyle="round" padding={1} minWidth={40}>
        <Text color="cyan">按键: </Text>
        <Text color="yellow">{key}</Text>
      </Box>
    </Box>
  );
};

// ============================================================
// 演示8: usePaste 粘贴事件
// ============================================================
const UsePasteDemo: FC = () => {
  const [pasted, setPasted] = useState('');
  
  usePaste((text: string) => {
    setPasted(text.substring(0, 50) + (text.length > 50 ? '...' : ''));
  });
  
  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color="cyan">8. usePaste 粘贴事件</Text>
      <Text dimColor>在终端中粘贴文本试试</Text>
      {pasted && (
        <Box borderStyle="round" padding={1} marginTop={1}>
          <Text color="green">粘贴: </Text>
          <Text>{pasted}</Text>
        </Box>
      )}
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
      <Text bold color="cyan">9. useWindowSize 响应式</Text>
      <Box borderStyle="round" padding={1}>
        <Text>终端尺寸: </Text>
        <Text color="cyan">{columns}</Text>
        <Text> 列 x </Text>
        <Text color="cyan">{rows}</Text>
        <Text> 行</Text>
      </Box>
    </Box>
  );
};

// ============================================================
// 演示10: useFocus 焦点管理
// ============================================================
interface FocusableButtonProps {
  id: string;
  label: string;
  onPress: () => void;
}

const FocusableButton: FC<FocusableButtonProps> = ({ id, label, onPress }) => {
  const { isFocused } = useFocus();
  
  useInput((input, keyInfo) => {
    if ((keyInfo.return || input === ' ') && isFocused) {
      onPress();
    }
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
    if (keyInfo.tab && !keyInfo.shift) {
      focusNext();
    } else if (keyInfo.tab && keyInfo.shift) {
      focusPrevious();
    }
  });
  
  const buttons = ['选项 A', '选项 B', '选项 C'];
  
  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color="cyan">10. useFocus 焦点管理</Text>
      <Text dimColor>Tab 切换焦点，Enter/空格 确认</Text>
      <Box marginTop={1} gap={1}>
        {buttons.map((label, i) => (
          <FocusableButton 
            key={i} 
            id={`btn-${i}`}
            label={label} 
            onPress={() => setSelected(i)} 
          />
        ))}
      </Box>
      {selected !== null && (
        <Text color="green" marginTop={1}>已选择: {buttons[selected]}</Text>
      )}
    </Box>
  );
};

// ============================================================
// 演示11: useAnimation 动画
// ============================================================
const UseAnimationDemo: FC = () => {
  const [progress, setProgress] = useState(0);
  const [frame, setFrame] = useState(0);
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  
  useAnimation((deltaTime: number) => {
    setProgress(p => (p + deltaTime * 0.05) % 100);
    setFrame(f => (f + 1) % frames.length);
  }, 60);
  
  const barWidth = 30;
  const filled = Math.round((progress / 100) * barWidth);
  
  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color="cyan">11. useAnimation 动画</Text>
      <Box gap={2}>
        <Text>{frames[frame]} 加载动画</Text>
        <Box width={barWidth}>
          <Text>{'█'.repeat(filled) + '░'.repeat(barWidth - filled)}</Text>
        </Box>
        <Text color="cyan">{Math.round(progress)}%</Text>
      </Box>
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
    setStatus('waiting flush...');
    await waitUntilRenderFlush();
    setStatus('done! exiting...');
    setTimeout(() => exit({ message: 'Bye!' }), 500);
  };
  
  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color="cyan">12. useApp 生命周期</Text>
      <Box gap={1}>
        <Text>状态: </Text>
        <Text color="green">{status}</Text>
      </Box>
      <Box borderStyle="round" padding={1} onClick={handleExit}>
        <Text color="yellow">点击此处演示 exit() → </Text>
      </Box>
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
      <Text bold color="cyan">13. useBoxMetrics 元素测量</Text>
      <Box ref={ref} borderStyle="round" padding={1} width={30}>
        <Text>测量这个盒子</Text>
      </Box>
      <Box marginTop={1}>
        <Text>测量结果: </Text>
        <Text color={hasMeasured ? 'green' : 'yellow'}>
          {hasMeasured ? `${width}x${height}` : '等待测量...'}
        </Text>
      </Box>
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
      <Text bold color="cyan">14. Static 静态输出</Text>
      <Box gap={1}>
        <Static items={[1, 2, 3]}>
          {(item: number) => (
            <Text key={item} color="cyan">静态行 {item} (不闪烁)</Text>
          )}
        </Static>
        <Text color="yellow">动态计数: {count} (每秒更新)</Text>
      </Box>
    </Box>
  );
};

// ============================================================
// 演示15: Transform 输出转换
// ============================================================
const TransformDemo: FC = () => (
  <Box flexDirection="column" marginY={1}>
    <Text bold color="cyan">15. Transform 输出转换</Text>
    <Transform transform={(outputLine: string) => `>> ${outputLine}`}>
      <Box borderStyle="round" padding={1}>
        <Text color="cyan">这行会被 Transform 添加前缀</Text>
      </Box>
    </Transform>
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
  
  const positions = ['①', '②', '③', '④', '⑤'];
  
  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color="cyan">16. useCursor 光标控制</Text>
      <Text dimColor>左右箭头移动光标位置</Text>
      <Box marginTop={1}>
        {positions.map((pos, i) => (
          <Text key={i} color={i === step ? 'green' : 'gray'}>
            {pos}{i < 4 ? ' → ' : ''}
          </Text>
        ))}
      </Box>
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
      <Text bold color="cyan">17. useStdin Raw 模式</Text>
      <Box borderStyle="round" padding={1}>
        <Text>Raw 模式支持: </Text>
        <Text color={isRawModeSupported ? 'green' : 'red'}>
          {isRawModeSupported ? '是' : '否'}
        </Text>
      </Box>
      <Box marginTop={1}>
        <Text>当前模式: </Text>
        <Text color="cyan">{mode}</Text>
        <Text dimColor> | 按 R 切换模式</Text>
      </Box>
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
      stdout.write('[stdout.write] 直接写入标准输出\n');
    }
  }, [stdout]);
  
  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color="cyan">18. useStdout 写入</Text>
      <Text dimColor>stdout.write() 可直接写入标准输出</Text>
    </Box>
  );
};

// ============================================================
// 演示19: 复杂布局 - 表格
// ============================================================
const ComplexLayoutDemo: FC = () => (
  <Box flexDirection="column" marginY={1}>
    <Text bold color="cyan">19. 复杂布局 - 表格</Text>
    <Box flexDirection="column" borderStyle="double" padding={1}>
      <Box gap={2}>
        <Box width={15}><Text bold>姓名</Text></Box>
        <Box width={10}><Text bold>年龄</Text></Box>
        <Box width={15}><Text bold>城市</Text></Box>
      </Box>
      <Text dimColor>─────────────────────────────────────────────</Text>
      <Box gap={2}>
        <Box width={15}><Text color="cyan">张三</Text></Box>
        <Box width={10}><Text>28</Text></Box>
        <Box width={15}><Text>北京</Text></Box>
      </Box>
      <Box gap={2}>
        <Box width={15}><Text color="cyan">李四</Text></Box>
        <Box width={10}><Text>34</Text></Box>
        <Box width={15}><Text>上海</Text></Box>
      </Box>
      <Box gap={2}>
        <Box width={15}><Text color="cyan">王五</Text></Box>
        <Box width={10}><Text>25</Text></Box>
        <Box width={15}><Text>深圳</Text></Box>
      </Box>
    </Box>
  </Box>
);

// ============================================================
// 演示20: 可访问性属性
// ============================================================
const AccessibilityDemo: FC = () => (
  <Box flexDirection="column" marginY={1}>
    <Text bold color="cyan">20. 可访问性属性</Text>
    <Box gap={1}>
      <Text><Text bold>aria-label:</Text> 屏幕阅读器标签</Text>
      <Text><Text bold>aria-hidden:</Text> 从辅助技术隐藏</Text>
      <Text><Text bold>aria-role:</Text> 角色定义</Text>
      <Text><Text bold>aria-state:</Text> 状态信息</Text>
    </Box>
  </Box>
);

// ============================================================
// 主应用 - 整合所有演示
// ============================================================
const InkFullDemo: FC = () => {
  const [activeSection, setActiveSection] = useState(1);
  const { columns, rows } = useWindowSize();
  
  // 方向键切换章节
  useInput((input, keyInfo) => {
    if (keyInfo.upArrow) setActiveSection(s => Math.max(1, s - 1));
    if (keyInfo.downArrow) setActiveSection(s => Math.min(20, s + 1));
    if (keyInfo.ctrl && input === 'c') process.exit(0);
  });
  
  const demos: InkElement[] = [
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
      {/* 标题 */}
      <Box justifyContent="center">
        <Text bold color="cyan" fontSize="large">✨ Ink 完整 API 演示 (TS)</Text>
      </Box>
      <Box justifyContent="center" gap={2}>
        <Text dim>终端: {columns}x{rows}</Text>
        <Text dim>|</Text>
        <Text dim>↑↓ 切换章节</Text>
        <Text dim>|</Text>
        <Text dim>Ctrl+C 退出</Text>
      </Box>
      <Text dimColor>{'─'.repeat(Math.min(columns, 80))}</Text>
      
      {/* 当前章节 */}
      <Box marginY={1}>
        <Text color="yellow">章节 {activeSection}/20:</Text>
      </Box>
      
      {/* 内容区域 */}
      <Box flexDirection="column" flexGrow={1}>
        {demos[activeSection - 1]}
      </Box>
      
      <Text dimColor>{'─'.repeat(Math.min(columns, 80))}</Text>
      <Text dimColor> Ink v7 | React for CLIs | TypeScript</Text>
    </Box>
  );
};

// 渲染应用
render(<InkFullDemo />);
