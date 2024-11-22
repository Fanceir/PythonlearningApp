import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { fetchUserProfile, updateUserProfile } from '../services/api';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate

function Profile() {
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    username: '',
    newPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    newPassword: '',
  });

  const navigate = useNavigate(); // 初始化 useNavigate

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const response = await fetchUserProfile();
        setUserInfo((prev) => ({
          ...prev,
          fullName: response.data.fullName,
          email: response.data.email,
          username: response.data.username,
        }));
      } catch (error) {
        console.error('获取个人资料时出错：', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));

    // 清除用户输入时的错误提示
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!userInfo.fullName) {
      newErrors.fullName = '姓名不能为空。';
    }

    if (!userInfo.email) {
      newErrors.email = '邮箱不能为空。';
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      newErrors.email = '邮箱格式不正确。';
    }

    if (userInfo.newPassword && userInfo.newPassword.length < 8) {
      newErrors.newPassword = '密码长度至少需要8位。';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      setLoading(true);

      const profileData = {
        fullName: userInfo.fullName,
        email: userInfo.email,
      };

      // 仅在提供新密码时更新密码
      if (userInfo.newPassword) {
        profileData.new_password = userInfo.newPassword;
      }

      await updateUserProfile(profileData);
      alert('个人资料更新成功！');

      // 更新后清空密码字段
      setUserInfo((prev) => ({
        ...prev,
        newPassword: '',
      }));
    } catch (error) {
      console.error('更新个人资料时出错：', error);
      alert('更新失败，请重试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        个人资料
      </Typography>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <TextField
          label="用户名"
          name="username"
          value={userInfo.username}
          fullWidth
          disabled
        />
        <TextField
          label="邮箱"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="姓名"
          name="fullName"
          value={userInfo.fullName}
          onChange={handleChange}
          fullWidth
          error={!!errors.fullName}
          helperText={errors.fullName}
        />
        <TextField
          label="新密码"
          name="newPassword"
          type="password"
          value={userInfo.newPassword}
          onChange={handleChange}
          fullWidth
          error={!!errors.newPassword}
          helperText={errors.newPassword || '更新密码时至少需要8位字符。'}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate(-1)} // 返回上一页
          >
            返回
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? '保存中...' : '保存更改'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;
