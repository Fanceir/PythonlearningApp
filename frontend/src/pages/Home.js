// pages/Home.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { executeCode } from '../services/api';
import { Button, Typography, Box } from '@mui/material';
import TopBarHome from '../components/TopBarHome';
import Editor from '@monaco-editor/react';

function Home() {
  const [code, setCode] = useState('print("Hello, Python!")');
  const [output, setOutput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleExecute = async () => {
    try {
      const response = await executeCode({ code });
      setOutput(response.data.result);
    } catch (error) {
      console.error('Execution failed:', error);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLogoutClick = () => {
    console.log('Logout button clicked');
    setIsLoggedIn(false);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <TopBarHome
        isLoggedIn={isLoggedIn}
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        onLogoutClick={handleLogoutClick}
      />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom align="center">
          欢迎来到 Python 学习平台
        </Typography>

        <Box sx={{ border: '1px solid #ddd', borderRadius: '5px', mt: 2 }}>
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
          Run Code
        </Button>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Output:
        </Typography>
        <pre
          style={{
            backgroundColor: '#f0f0f0',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          {output}
        </pre>
      </Box>
    </Box>
  );
}

export default Home;
