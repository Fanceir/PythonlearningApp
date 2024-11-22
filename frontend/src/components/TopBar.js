// components/TopBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function TopBar({ isLoggedIn = false, userName = '' }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #ddd',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* 左侧：标题 */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#333',
            cursor: 'pointer',
          }}
          onClick={goToHome}
        >
          Python 学习平台
        </Typography>

        {/* 右侧：按钮 */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isLoggedIn ? (
            <>
              <Typography
                variant="body1"
                sx={{
                  color: '#555',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                欢迎, {userName || '用户'}
              </Typography>
              <Button
                color="inherit"
                sx={{
                  fontSize: '1rem',
                  color: '#333',
                  textTransform: 'none',
                }}
                onClick={goToProfile}
              >
                个人主页
              </Button>
              <Button
                color="inherit"
                sx={{
                  fontSize: '1rem',
                  color: '#333',
                  textTransform: 'none',
                }}
                onClick={handleLogout}
              >
                登出
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                sx={{
                  fontSize: '1rem',
                  color: '#333',
                  textTransform: 'none',
                }}
                onClick={() => navigate('/login')}
              >
                登录
              </Button>
              <Button
                color="inherit"
                sx={{
                  fontSize: '1rem',
                  color: '#333',
                  textTransform: 'none',
                }}
                onClick={() => navigate('/register')}
              >
                注册
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
