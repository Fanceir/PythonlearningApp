import React, { useState } from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import TopBar from '../components/TopBar';
import Sidebar from '../components/Sidebar';
import ContentArea from '../components/ContentArea';

function Main() {
  const [selectedModule, setSelectedModule] = useState({
    name: 'Python Basics',
    path: '/docs/python_basics.md',
  });

  const handleSelectModule = (module) => {
    setSelectedModule(module);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <TopBar />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          gap: 2, // Add spacing between sidebar and content
          p: 2, // Add padding around the main content
          overflow: 'hidden', // Prevent content from creating scrollbars
        }}
      >
        <Paper
          elevation={2}
          sx={{
            display: 'flex',
            width: 280,
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Sidebar onSelectModule={handleSelectModule} />
        </Paper>
        <Paper
          elevation={2}
          sx={{
            flex: 1,
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <ContentArea selectedModule={selectedModule} />
        </Paper>
      </Box>
    </Box>
  );
}

export default Main;
