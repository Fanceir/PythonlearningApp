import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import TopBar from '../components/TopBar';
import Sidebar from '../components/Sidebar';
import ContentArea from '../components/ContentArea';

function Main() {
  const defaultModule = {
    name: 'Python Basics',
    path: '/docs/python_basics.md',
  };

  // 初始化时从 localStorage 加载状态
  const [selectedModule, setSelectedModule] = useState(() => {
    const savedModule = localStorage.getItem('selectedModule');
    return savedModule ? JSON.parse(savedModule) : defaultModule;
  });

  const handleSelectModule = (module) => {
    setSelectedModule(module);
    // 保存到 localStorage
    localStorage.setItem('selectedModule', JSON.stringify(module));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <TopBar />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          gap: 2,
          p: 2,
          overflow: 'hidden',
        }}
      >
        {/* Sidebar */}
        <Paper
          elevation={2}
          sx={{
            display: 'flex',
            width: 280,
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Sidebar onSelectModule={handleSelectModule} />
        </Paper>

        {/* Content Area */}
        <Paper
          elevation={2}
          sx={{
            flex: 1,
            borderRadius: 2,
            overflow: 'auto',
          }}
        >
          <ContentArea selectedModule={selectedModule} />
        </Paper>
      </Box>
    </Box>
  );
}

export default Main;
