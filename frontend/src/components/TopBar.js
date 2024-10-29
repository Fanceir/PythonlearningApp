// components/TopBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function TopBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Python 学习
        </Typography>
        <Box>
          <Button color="inherit" onClick={goToProfile}>
            个人主页
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            登出
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
