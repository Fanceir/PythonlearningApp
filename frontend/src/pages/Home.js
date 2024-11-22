import React, { useState } from 'react';
import { Button, Typography, Box, Container } from '@mui/material';
import Editor from '@monaco-editor/react';
import TopBar from '../components/TopBar'; // 提取的导航栏组件
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
    <Box sx={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* 顶部导航 */}
      <TopBar />

      {/* 内容部分 */}
      <Container sx={{ mt: 6 }}>
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          sx={{ color: 'primary.main' }}
        >
          欢迎来到 Python 学习平台
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ color: 'text.secondary', mb: 4 }}
        >
          在这里运行 Python 代码，探索学习的乐趣。
        </Typography>

        {/* 编辑器和运行结果 */}
        <Box sx={{ border: '1px solid #ddd', borderRadius: '5px', mb: 4 }}>
          <Editor
            height="300px"
            defaultLanguage="python"
            defaultValue={code}
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
          sx={{ mt: 2 }}
          fullWidth
        >
          运行代码
        </Button>

        <Typography variant="h6" sx={{ mt: 3, color: 'secondary.main' }}>
          输出:
        </Typography>
        <pre
          style={{
            backgroundColor: '#f0f0f0',
            padding: '10px',
            borderRadius: '5px',
            color: '#333',
            overflowX: 'auto',
          }}
        >
          {output || '尚无输出...'}
        </pre>
      </Container>
    </Box>
  );
}

export default Home;
