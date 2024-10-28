// pages/Home.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate 钩子
import { executeCode } from '../services/api';
import { TextField, Button, Typography, Box } from '@mui/material';
import TopBar from '../components/TopBar';

function Home() {
  const [code, setCode] = useState('print("Hello, Python!")');
  const [output, setOutput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate(); // 初始化导航

  const handleExecute = async () => {
    try {
      const response = await executeCode({ code });
      setOutput(response.data.result);
    } catch (error) {
      console.error('Execution failed:', error);
    }
  };

  const handleLoginClick = () => {
    navigate('/login'); // 跳转到登录页面
  };

  const handleRegisterClick = () => {
    navigate('/register'); // 跳转到注册页面
  };

  const handleLogoutClick = () => {
    console.log('Logout button clicked');
    setIsLoggedIn(false);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <TopBar
        isLoggedIn={isLoggedIn}
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        onLogoutClick={handleLogoutClick}
      />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom align="center">
          Welcome to Python Learning Platform
        </Typography>

        <TextField
          label="Python Code"
          multiline
          fullWidth
          rows={10}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          variant="outlined"
          sx={{ mt: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleExecute}
          sx={{ mt: 2 }}
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
