import React, { useState } from 'react';
import axios from 'axios';
import { executeCode } from '../services/api';
import {
  Button,
  CircularProgress,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import MonacoEditor from '@monaco-editor/react';

const CodeRunner = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const runCode = async () => {
    setLoading(true); // 启动加载状态
    setOutput(''); // 清空之前的输出
    setErrorMessage(''); // 清除之前的错误信息
    try {
      const response = await executeCode({ code });
      setOutput(response.data.result); // 显示执行结果
    } catch (error) {
      console.error('Execution failed:', error);
      setErrorMessage('Error executing code'); // 设置错误信息
    } finally {
      setLoading(false); // 执行完毕后恢复按钮
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Python Code Runner
      </Typography>

      {/* Monaco Editor 用于代码输入区 */}
      <MonacoEditor
        height="300px"
        language="python"
        value={code}
        onChange={(value) => setCode(value)}
        theme="vs-dark"
        options={{
          selectOnLineNumbers: true,
          minimap: { enabled: false },
          automaticLayout: true,
          wordWrap: 'on',
        }}
      />

      {/* 执行按钮 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <Button
          onClick={runCode}
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{
            padding: '10px 20px',
            fontSize: '16px',
            textTransform: 'none',
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Run Code'
          )}
        </Button>
      </Box>

      {/* 输出部分 */}
      <Typography variant="h6" gutterBottom>
        Output:
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          minHeight: '150px',
          whiteSpace: 'pre-wrap', // 保持换行
          wordWrap: 'break-word',
          fontFamily: 'monospace',
          fontSize: '14px',
          color: '#333',
          border: errorMessage ? '2px solid #f44336' : 'none', // 如果有错误，显示红色边框
        }}
      >
        {errorMessage ? (
          <Typography variant="body1" sx={{ color: '#f44336' }}>
            {errorMessage}
          </Typography>
        ) : (
          output || (loading ? 'Executing code, please wait...' : '')
        )}
      </Paper>
    </Box>
  );
};

export default CodeRunner;
