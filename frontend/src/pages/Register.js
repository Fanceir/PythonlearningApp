// pages/Register.js
import { useState } from 'react';
import { registerUser } from '../services/api';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, password, email, fullName });
      alert('注册成功');
      navigator('/login');
    } catch (error) {
      console.error('注册失败', error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          alignItems: 'center',
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>

        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default Register;
