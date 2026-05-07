#!/usr/bin/env node
/**
 * Ink TUI Demo - 演示 Ink (React-style CLI 框架) 的核心功能
 * 运行: node index.js
 */
const { render, Text, Box, Spacer, useInput, useApp } = require('ink');
const React = require('react');

// ============================================================
// 1. 组件定义 - 两种方式：函数组件 vs class 组件
// ============================================================

// 样式复用：定义可组合的样式对象
const styles = {
  // 基础样式
  bold: { bold: true },
  italic: { italic: true },
  underline: { underline: true },
  
  // 颜色
  success: { color: 'green' },
  error: { color: 'red' },
  warning: { color: 'yellow' },
  info: { color: 'cyan' },
  muted: { dim: true },
  
  // 边框
  border: {
    borderStyle: 'round',
    borderColor: 'cyan'
  },
  
  // 按钮样式
  button: {
    borderStyle: 'bold',
    borderColor: 'cyan',
    paddingLeft: 2,
    paddingRight: 2
  },
  buttonActive: {
    borderStyle: 'bold',
    borderColor: 'green',
    backgroundColor: 'green',
    color: 'black'
  }
};

// 简单按钮组件 - 函数式
const Button = ({ children, onPress, active }) => {
  return React.createElement(Box, {
    ...(active ? styles.buttonActive : styles.button),
    onFocus: true,
  }, 
    React.createElement(Text, { 
      bold: !active,
      color: active ? 'black' : 'cyan'
    }, active ? `[ ${children} ]` : `[ ${children} ]`)
  );
};

// 卡片组件 - 演示组合和样式复用
const Card = ({ title, content, variant = 'default' }) => {
  const borderColor = variant === 'success' ? 'green' 
                    : variant === 'warning' ? 'yellow'
                    : variant === 'error' ? 'red'
                    : 'cyan';
  
  return React.createElement(Box, {
    flexDirection: 'column',
    borderStyle: 'round',
    borderColor,
    padding: 1,
    margin: 1
  }, [
    React.createElement(Text, { bold: true, color: borderColor }, `┌─ ${title} ─`),
    React.createElement(Box, { paddingLeft: 2 }, [
      React.createElement(Text, { dim: false }, content)
    ]),
    React.createElement(Text, { color: borderColor }, '└' + '─'.repeat(title.length + 4))
  ]);
};

// 进度条组件
const ProgressBar = ({ value, width = 40 }) => {
  const filled = Math.round((value / 100) * width);
  const empty = width - filled;
  return React.createElement(Text, null, 
    '█'.repeat(filled) + '░'.repeat(empty) + ` ${value}%`
  );
};

// ============================================================
// 2. 响应式布局 - Ink 的 Flex 布局
// ============================================================

// 列布局组件
const Column = ({ children, width }) => 
  React.createElement(Box, { 
    width: width || 'natural',
    flexDirection: 'column',
    margin: 1 
  }, children);

// 行布局组件  
const Row = ({ children, justifyContent = 'flex-start' }) =>
  React.createElement(Box, {
    flexDirection: 'row',
    justifyContent
  }, children);

// ============================================================
// 3. 交互组件
// ============================================================

// 下拉选择器组件
const Select = ({ options, selected, onSelect }) => {
  const [focused, setFocused] = React.useState(0);
  
  useInput((input, key) => {
    if (key.upArrow) setFocused(f => Math.max(0, f - 1));
    if (key.downArrow) setFocused(f => Math.min(options.length - 1, f + 1));
    if (key.return) {
      onSelect(options[focused]);
    }
  });
  
  return React.createElement(Box, { flexDirection: 'column' },
    options.map((opt, i) => 
      React.createElement(Text, {
        key: opt.value,
        color: i === focused ? 'green' : i === selected ? 'cyan' : 'gray',
        bold: i === focused
      }, i === focused ? '▶ ' : '  ' + opt.label)
    )
  );
};

// 文本输入组件
const TextInput = ({ value, onChange, placeholder }) => {
  const [cursorPos, setCursorPos] = React.useState(0);
  const displayValue = value || '';
  
  useInput((input, key) => {
    if (key.backspace || key.delete) {
      if (cursorPos > 0) {
        const newValue = displayValue.slice(0, cursorPos - 1) + displayValue.slice(cursorPos);
        setCursorPos(p => p - 1);
        onChange(newValue);
      }
    } else if (input && !key.ctrl && !key.meta) {
      const newValue = displayValue.slice(0, cursorPos) + input + displayValue.slice(cursorPos);
      setCursorPos(p => p + 1);
      onChange(newValue);
    }
  });
  
  const placeholderText = placeholder || '输入...';
  const text = displayValue || placeholderText;
  const dim = !displayValue;
  
  return React.createElement(Box, {},
    React.createElement(Text, { 
      color: dim ? 'gray' : 'white',
      dim
    }, `[${text}${
      // 闪烁光标模拟
      Date.now() % 1000 < 500 ? '|' : ' '
    }]`)
  );
};

// 复选框组件
const Checkbox = ({ checked, label, onChange }) => {
  return React.createElement(Box, {
    onInput: () => onChange(!checked)
  }, [
    React.createElement(Text, { 
      key: 'box',
      color: checked ? 'green' : 'gray',
      bold: checked
    }, checked ? '[✓]' : '[ ]'),
    React.createElement(Text, { 
      key: 'label',
      marginLeft: 1
    }, label)
  ]);
};

// ============================================================
// 4. 弹出框/模态框
// ============================================================

const Modal = ({ children, title, onClose }) => {
  // ESC 关闭
  useInput((input, key) => {
    if (key.escape && onClose) onClose();
  });
  
  return React.createElement(Box, {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }, [
    // 半透明背景
    React.createElement(Box, {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'black',
      opacity: 0.7
    }),
    // 模态框内容
    React.createElement(Box, {
      flexDirection: 'column',
      borderStyle: 'double',
      borderColor: 'cyan',
      padding: 2,
      minWidth: 50
    }, [
      React.createElement(Box, { justifyContent: 'space-between' }, [
        React.createElement(Text, { bold: true, color: 'cyan' }, title || '弹出框'),
        React.createElement(Text, { color: 'gray' }, '[ESC关闭]')
      ]),
      React.createElement(Box, { marginTop: 1 }, children)
    ])
  ]);
};

// ============================================================
// 5. 主应用 - 组合所有组件
// ============================================================

const DemoApp = () => {
  const [counter, setCounter] = React.useState(0);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [todos, setTodos] = React.useState([
    { id: 1, text: '学习 Ink 组件定义', done: true },
    { id: 2, text: '掌握样式复用技巧', done: true },
    { id: 3, text: '实现响应式布局', done: false },
    { id: 4, text: '添加交互功能', done: false }
  ]);
  
  const selectOptions = [
    { label: '组件定义', value: 'component' },
    { label: '样式复用', value: 'style' },
    { label: '响应式布局', value: 'layout' },
    { label: '交互事件', value: 'interaction' },
    { label: '弹出框', value: 'modal' }
  ];
  
  // 全局键盘事件处理
  useInput((input, key) => {
    if (key.ctrl && input === 'c') {
      process.exit(0);
    }
  });
  
  // 响应式：终端宽度检测（简单实现）
  const isWide = process.stdout.columns > 80;
  
  return React.createElement(Box, { 
    flexDirection: 'column',
    padding: 1
  }, [
    // 标题
    React.createElement(Box, { justifyContent: 'center' }, [
      React.createElement(Text, { bold: true, color: 'cyan', fontSize: 'large' }, '✨ Ink TUI Demo')
    ]),
    React.createElement(Text, { dim: true }, '─'.repeat(60)),
    
    // 响应式布局演示
    React.createElement(Box, { flexDirection: 'column', marginTop: 1 }, [
      React.createElement(Text, { bold: true, color: 'yellow' }, '📐 响应式布局'),
      React.createElement(Text, { dim: true }, `终端宽度: ${process.stdout.columns}px | 布局: ${isWide ? '宽屏双列' : '窄屏单列'}`)
    ]),
    
    // 两列或单列布局
    isWide 
      ? React.createElement(Row, null, [
          // 左列 - 功能演示
          React.createElement(Column, { width: '50%' }, [
            React.createElement(Card, { 
              title: '计数器', 
              content: `当前值: ${counter}`,
              variant: 'info'
            }),
            React.createElement(Box, { gap: 1 }, [
              React.createElement(Button, { 
                onPress: () => setCounter(c => c + 1),
                active: false
              }, '+1'),
              React.createElement(Button, { 
                onPress: () => setCounter(c => c - 1),
                active: false
              }, '-1'),
              React.createElement(Button, { 
                onPress: () => setCounter(0),
                active: false
              }, '重置')
            ])
          ]),
          // 右列 - 进度和选择
          React.createElement(Column, { width: '50%' }, [
            React.createElement(Card, { 
              title: '进度条', 
              content: '',
              variant: 'success'
            }),
            React.createElement(Box, { paddingLeft: 2 }, [
              React.createElement(ProgressBar, { value: counter * 10 })
            ]),
            React.createElement(Box, { marginTop: 1 }),
            React.createElement(Text, { bold: true }, '选择一个选项:'),
            React.createElement(Select, {
              options: selectOptions,
              selected: selectedOption ? selectOptions.findIndex(o => o.value === selectedOption) : -1,
              onSelect: (opt) => setSelectedOption(opt.value)
            }),
            selectedOption && React.createElement(Text, { 
              color: 'green', 
              marginTop: 1 
            }, `✓ 已选择: ${selectedOption}`)
          ])
        ])
      : React.createElement(Column, null, [
          // 单列布局内容
          React.createElement(Card, { title: '计数器', content: `当前值: ${counter}`, variant: 'info' }),
          React.createElement(ProgressBar, { value: counter * 10 })
        ]),
    
    React.createElement(Text, { dim: true }, '─'.repeat(60)),
    
    // 待办事项列表示例
    React.createElement(Card, { title: '待办事项', variant: 'warning' }),
    React.createElement(Box, { flexDirection: 'column', paddingLeft: 3 }, 
      todos.map(todo => 
        React.createElement(Checkbox, {
          key: todo.id,
          checked: todo.done,
          label: todo.text,
          onChange: (checked) => {
            setTodos(todos.map(t => 
              t.id === todo.id ? { ...t, done: checked } : t
            ));
          }
        })
      )
    ),
    
    React.createElement(Text, { dim: true }, '─'.repeat(60)),
    
    // 文本输入演示
    React.createElement(Text, { bold: true, color: 'yellow' }, '📝 文本输入:'),
    React.createElement(TextInput, {
      value: inputValue,
      onChange: setInputValue,
      placeholder: '输入文字...'
    }),
    inputValue && React.createElement(Text, { color: 'green' }, `已输入: ${inputValue}`),
    
    React.createElement(Text, { dim: true }, '─'.repeat(60)),
    
    // 底部按钮
    React.createElement(Row, { justifyContent: 'space-between' }, [
      React.createElement(Button, { 
        onPress: () => setShowModal(true),
        active: showModal
      }, '打开弹窗'),
      React.createElement(Text, { dim: true }, 'Ctrl+C 退出')
    ]),
    
    // 模态框
    showModal && React.createElement(Modal, {
      title: '🎉 欢迎使用 Ink',
      onClose: () => setShowModal(false)
    }, [
      React.createElement(Text, null, '这是一个弹出框演示!'),
      React.createElement(Text, { dim: true, marginTop: 1 }, '按 ESC 或点击外部关闭'),
      React.createElement(Box, { marginTop: 1 }, [
        React.createElement(Button, { onPress: () => setShowModal(false) }, '知道了')
      ])
    ])
  ]);
};

// 渲染应用
render(React.createElement(DemoApp));
