import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
} from '@mui/material';
import Editor from '@monaco-editor/react';
import TopBar from '../components/TopBar'; // 导入顶部导航
import { executeCode } from '../services/api';

function Home() {
  const [code, setCode] = useState('print("Hello, Python!")');
  const [output, setOutput] = useState('');

  const handleExecute = async () => {
    try {
      const response = await executeCode({ code });
      setOutput(response.data.result);
    } catch (error) {
      console.error('Execution failed:', error);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* 顶部导航栏 */}
      <TopBar />

      {/* Hero 区域 */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          backgroundColor: '#1976d2', // 主要蓝色背景
          color: '#fff',
          borderBottom: '5px solid #1565c0', // 增加底部边框
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold' }} gutterBottom>
          欢迎来到 Python 学习平台
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          在这里你可以运行、学习并分享 Python 代码，开始你的编程之旅！
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          href="#features"
          sx={{
            backgroundColor: '#42a5f5', // 轻蓝色按钮
            '&:hover': {
              backgroundColor: '#1e88e5', // 更深的蓝色按钮悬浮状态
            },
          }}
        >
          立即开始
        </Button>
      </Box>

      {/* 内容块（Features 或 Highlights） */}
      <Container id="features" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          主要特性
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/150"
                alt="Feature 1"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  快速运行代码
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  在此平台，你可以快速写并执行 Python 代码，无需复杂的环境配置。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/150"
                alt="Feature 2"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  交互式学习
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  通过交互式的代码示例，让你在实践中学习 Python。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/150"
                alt="Feature 3"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  丰富的文档
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  提供完整的文档和教程，帮助你从入门到精通。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* 快速链接和导航 */}
      <Container sx={{ py: 6, backgroundColor: '#e3f2fd' }}>
        <Typography variant="h5" gutterBottom align="center">
          快速导航
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              href="/docs"
              sx={{
                py: 2,
                backgroundColor: '#0288d1', // 更深的蓝色
                '&:hover': {
                  backgroundColor: '#0277bd', // 更深的蓝色悬浮
                },
              }}
            >
              查看文档
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              href="/start"
              sx={{
                py: 2,
                backgroundColor: '#039be5', // 明亮的蓝色
                '&:hover': {
                  backgroundColor: '#0288d1', // 深蓝色悬浮
                },
              }}
            >
              开始学习
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              href="/download"
              sx={{
                py: 2,
                backgroundColor: '#0288d1', // 深蓝色
                '&:hover': {
                  backgroundColor: '#0277bd', // 更深的蓝色悬浮
                },
              }}
            >
              下载工具
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* 代码编辑器和输出 */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" gutterBottom align="center">
          代码编辑器
        </Typography>
        <Box sx={{ border: '1px solid #ddd', borderRadius: '5px', mb: 4 }}>
          <Editor
            height="300px"
            defaultLanguage="python"
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              lineNumbers: 'on',
            }}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleExecute}
          sx={{
            mt: 2,
            backgroundColor: '#0288d1', // 深蓝色
            '&:hover': {
              backgroundColor: '#0277bd', // 深蓝色悬浮
            },
          }}
          fullWidth
        >
          运行代码
        </Button>

        <Typography variant="h6" sx={{ mt: 3, color: 'secondary.main' }}>
          输出:
        </Typography>
        <Paper
          sx={{
            backgroundColor: '#f0f0f0',
            padding: '10px',
            borderRadius: '5px',
            color: '#333',
            overflowX: 'auto',
            boxShadow: 1,
          }}
        >
          {output || '尚无输出...'}
        </Paper>
      </Container>
    </Box>
  );
}

export default Home;
