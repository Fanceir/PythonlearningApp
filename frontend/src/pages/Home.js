import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Paper,
} from '@mui/material';
import Editor from '@monaco-editor/react';
import TopBarHome from '../components/TopBarHome'; // 导入顶部导航
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
      <TopBarHome />

      {/* Hero 区域 */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          backgroundColor: '#1976d2', // 主要蓝色背景
          color: '#fff',
          borderBottom: '5px solid #1565c0', // 增加底部边框
          borderRadius: '0 0 20px 20px',
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold' }} gutterBottom>
          欢迎来到 Python 学习平台
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          在这里你可以运行、学习 Python 代码，开始你的编程之旅！
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
            borderRadius: '50px',
          }}
        >
          立即开始
        </Button>
      </Box>

      {/* 主要特性区域 */}
      <Container id="features" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          主要功能
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* 第一个卡片 - 快速运行代码 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  快速运行代码
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  立即编写并运行 Python 代码，无需任何配置，马上看到执行结果。
                </Typography>
                {/* 渐变按钮 */}
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    height: 100,
                    borderRadius: 3,
                    background: 'linear-gradient(45deg, #1e3c72, #2a5298)', // 蓝色渐变背景
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #2a5298, #1e3c72)', // Hover 时改变渐变方向
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  运行代码
                </Button>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  示例：`print("Hello, Python!")` 在右侧编辑框中修改代码并运行
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* 第二个卡片 - 学习使用语法 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  学习 Python 语法
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  学习 Python 基础语法，掌握编程基础，快速上手。
                </Typography>
                {/* 渐变按钮 */}
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    height: 100,
                    borderRadius: 3,
                    background: 'linear-gradient(45deg, #1e3c72, #2a5298)', // 蓝色渐变背景
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #2a5298, #1e3c72)', // Hover 时改变渐变方向
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  学习语法
                </Button>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  例如：如何使用变量、控制结构（if、for、while）、函数等。
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* 第三个卡片 - 互动学习平台 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  互动学习平台
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  通过参与讨论、协作编程，提升你的编程技能。
                </Typography>
                {/* 渐变按钮 */}
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    height: 100,
                    borderRadius: 3,
                    background: 'linear-gradient(45deg, #1e3c72, #2a5298)', // 蓝色渐变背景
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #2a5298, #1e3c72)', // Hover 时改变渐变方向
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  加入互动
                </Button>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  在这里，你可以与其他学习者一起讨论编程问题，分享代码。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* 代码编辑器和输出 */}
        <Container sx={{ py: 6 }}>
          <Typography variant="h5" gutterBottom align="center">
            代码编辑器
          </Typography>
          <Box sx={{ border: '1px solid #ddd', borderRadius: 5, mb: 4 }}>
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
              borderRadius: '50px',
              fontSize: 18,
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
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
              padding: '20px',
              borderRadius: 5,
              color: '#333',
              overflowX: 'auto',
              boxShadow: 2,
              border: '1px solid #ddd',
            }}
          >
            {output || '尚无输出...'}
          </Paper>
        </Container>
      </Container>
    </Box>
  );
}

export default Home;
