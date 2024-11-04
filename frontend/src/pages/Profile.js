import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { fetchUserProfile, updateUserProfile } from '../services/api';

function Profile() {
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    username: '',
    currentPassword: '',
    newPassword: '',
  });
  const [loading, setLoading] = useState(false);

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
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const profileData = {
        fullName: userInfo.fullName,
        email: userInfo.email,
      };

      // Only include password fields if they're provided
      if (userInfo.currentPassword && userInfo.newPassword) {
        profileData.current_password = userInfo.currentPassword;
        profileData.new_password = userInfo.newPassword;
      }

      await updateUserProfile(profileData);
      alert('Profile updated successfully!');

      // Clear password fields after update
      setUserInfo((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
      }));
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
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
          fullWidth
          disabled
        />
        <TextField
          label="Email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Full Name"
          name="fullName"
          value={userInfo.fullName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Current Password"
          name="currentPassword"
          type="password"
          value={userInfo.currentPassword}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="New Password"
          name="newPassword"
          type="password"
          value={userInfo.newPassword}
          onChange={handleChange}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>
    </Container>
  );
}

export default Profile;
