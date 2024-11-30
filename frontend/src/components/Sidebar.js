// components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemText, Divider, Box } from '@mui/material';

function Sidebar({ onSelectModule }) {
  const modules = [
    { name: 'Introduction', path: '/docs/introduction.md' },
    { name: 'Advanced Python', path: '/docs/advanced_python.md' },
    { name: 'Exercises', path: '/docs/exercises.md' },
  ];

  return (
    <Box sx={{ width: '250px', backgroundColor: '#f4f4f4', height: '100vh' }}>
      <List>
        {modules.map((module, index) => (
          <React.Fragment key={index}>
            <ListItem button onClick={() => onSelectModule(module)}>
              <ListItemText primary={module.name} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
