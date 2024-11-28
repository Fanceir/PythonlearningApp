import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, useMediaQuery } from '@mui/material';
import TopBar from '../components/TopBar';
import Sidebar from '../components/Sidebar';
import ContentArea from '../components/ContentArea';
import CodeRunner from '../components/CodeRunner';
import { Rnd } from 'react-rnd'; // 引入 react-rnd

function Main() {
  const defaultModule = {
    name: 'Python Basics',
    path: '/docs/python_basics.md',
  };

  // 从 localStorage 获取选中的模块
  const [selectedModule, setSelectedModule] = useState(() => {
    const savedModule = localStorage.getItem('selectedModule');
    return savedModule ? JSON.parse(savedModule) : defaultModule;
  });

  const handleSelectModule = (module) => {
    setSelectedModule(module);
    // 保存模块到 localStorage
    localStorage.setItem('selectedModule', JSON.stringify(module));
  };

  // 使用媒体查询来处理小屏幕设备
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  // 初始化 CodeRunner 的宽度
  const [codeRunnerWidth, setCodeRunnerWidth] = useState(320);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 顶部导航栏 */}
      <TopBar />

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: isMobile ? 'column' : 'row', // 小屏幕时垂直排列
          gap: 2,
          p: 2,
          overflow: 'hidden',
        }}
      >
        {/* Sidebar：左侧栏 */}
        {!isMobile && (
          <Paper
            elevation={2}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: 280,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Sidebar onSelectModule={handleSelectModule} />
          </Paper>
        )}

        {/* Content Area：中间内容区 */}
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

        {/* CodeRunner：右侧代码运行区 */}
        {!isMobile && (
          <Rnd
            size={{ width: codeRunnerWidth, height: 'calc(100vh - 64px)' }} // 控制 CodeRunner 的初始宽度和高度
            minWidth={250} // 设置最小宽度
            maxWidth={600} // 设置最大宽度
            bounds="parent" // 限制范围在父容器内
            onResizeStop={(e, direction, ref, delta, position) => {
              setCodeRunnerWidth(ref.offsetWidth); // 更新宽度
            }}
            enableResizing={{
              left: false,
              right: true, // 允许从右边调整宽度
              top: false,
              bottom: false,
            }}
          >
            <Paper
              elevation={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <CodeRunner />
            </Paper>
          </Rnd>
        )}

        {/* 手机设备上的右侧区域 */}
        {isMobile && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              代码运行器
            </Typography>
            <CodeRunner />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Main;
