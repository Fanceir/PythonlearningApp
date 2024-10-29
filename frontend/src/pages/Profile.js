// pages/Profile.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

function Profile() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    bio: '',
  });

  useEffect(() => {
    // 模拟获取用户信息，可以替换为实际的 API 请求
    const storedUser = {
      username: 'JohnDoe',
      email: 'john@example.com',
      bio: 'Python enthusiast and lifelong learner.',
    };
    setUserInfo(storedUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // 模拟保存用户信息，可以替换为实际的 API 请求
    alert('Profile updated successfully!');
    console.log(userInfo);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Personal Profile
      </Typography>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <TextField
          label="Username"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Bio"
          name="bio"
          value={userInfo.bio}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
}

export default Profile;
