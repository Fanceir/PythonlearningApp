// pages/Main.js
import React, { useState } from 'react';
import { Box } from '@mui/material';
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
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopBar />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar onSelectModule={handleSelectModule} />
        <ContentArea selectedModule={selectedModule} />
      </Box>
    </Box>
  );
}

export default Main;
