import React from 'react';
import { Box, Typography, Paper, Button, Container } from '@mui/material';
import Question from '../components/Question';
import TopBar from '../components/TopBar';
import CodeRunner from '../components/CodeRunner';

export default function PracticePage() {
  return (
    <>
      {/* 固定在顶部的 TopBar */}
      <TopBar />

      <Box
        sx={{
          backgroundColor: '#f4f6f8',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            backgroundColor: '#1976d2',
            padding: '16px 0',
            color: '#fff',
            textAlign: 'center',
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Python 编程实践
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 300 }}>
            测试你的 Python 知识
          </Typography>
        </Box>

        {/* Question Section */}
        <Box sx={{ padding: '20px 15px', flexGrow: 1 }}>
          <Question />
        </Box>

        {/* CodeRunner 提示和组件 */}
        <Box
          sx={{
            padding: 3,
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 2,
            marginTop: 3,
          }}
        >
          {/* 提示文本 */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#1976d2',
              marginBottom: 1,
              textAlign: 'center',
            }}
          >
            你可以试着验证你的想法：
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#555',
              marginBottom: 2,
              textAlign: 'center',
              fontSize: '16px',
              lineHeight: '1.6',
            }}
          >
            在下面的代码编辑器中输入你的 Python
            代码并运行，看看它是否符合你的预期
          </Typography>

          {/* CodeRunner */}
          <Box
            sx={{
              backgroundColor: '#fafafa',
              padding: 2,
              borderRadius: 2,
              boxShadow: 1,
              minHeight: '250px',
            }}
          >
            <CodeRunner />
          </Box>
        </Box>
      </Box>
    </>
  );
}
