// components/TopBarHome.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function TopBarHome({
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
}) {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Python 学习平台
        </Typography>

        {isLoggedIn ? (
          <Button color="inherit" onClick={onLogoutClick}>
            登出
          </Button>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>
              登录
            </Button>
            <Button color="inherit" onClick={() => navigate('/register')}>
              注册
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBarHome;
