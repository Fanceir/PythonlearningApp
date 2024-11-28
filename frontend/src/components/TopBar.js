import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../services/api'; // 导入API

function TopBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // 用于存储用户信息
  const [loading, setLoading] = useState(true); // 用于显示加载状态

  useEffect(() => {
    // 获取用户信息
    const getUserInfo = async () => {
      try {
        const response = await fetchUserProfile(); // 调用API
        setUser(response.data); // 设置用户信息
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false); // 完成加载
      }
    };

    if (localStorage.getItem('token')) {
      // 判断是否有登录状态
      getUserInfo(); // 获取用户信息
    } else {
      setLoading(false); // 没有登录状态，直接停止加载
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null); // 清空用户信息
    navigate('/'); // 重定向到首页
  };

  const goToProfile = () => {
    navigate('/profile'); // 导航到个人资料页面
  };

  const goToHome = () => {
    navigate('/'); // 导航到首页
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'inherit',
        borderBottom: '1px solid #ddd',
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
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
          {loading ? (
            // 如果加载中，显示加载指示器
            <CircularProgress size={24} sx={{ color: '#333' }} />
          ) : user ? (
            <>
              <Typography
                variant="body1"
                sx={{
                  color: '#555',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                欢迎, {user.fullName || '用户'} {/* 显示用户名 */}
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
