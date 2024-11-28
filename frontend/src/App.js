import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from './routes';

function App() {
  // 初始化主题为 light 或 dark，默认值为 light
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false; // 默认开启 light 模式
  });

  // 切换主题函数
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode)); // 存储选择的模式
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light', // 根据 darkMode 选择主题
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* 自动应用基础样式 */}
      <Router>
        <AppRoutes toggleTheme={toggleTheme} darkMode={darkMode} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
