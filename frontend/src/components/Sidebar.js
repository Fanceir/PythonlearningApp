// components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemText, Divider, Box } from '@mui/material';

function Sidebar({ onSelectModule }) {
  const modules = [
    { name: '介绍', path: '/docs/introduction.md' },
    { name: '第一天', path: '/docs/01day1.md' },
    { name: '第二天', path: '/docs/02day2.md' },
    { name: '第三天', path: '/docs/03day3.md' },
    { name: '第四天', path: '/docs/04day4.md' },
    { name: '第五天', path: '/docs/05day5.md' },
    { name: '第六天', path: '/docs/06day6.md' },
    { name: '第七天', path: '/docs/07day7.md' },
    { name: '第八天', path: '/docs/08day8.md' },
    { name: '第九天', path: '/docs/09day9.md' },
    { name: '第十天', path: '/docs/10day10.md' },
    { name: '第十一天', path: '/docs/11day11.md' },
    { name: '第十二天', path: '/docs/12day12.md' },
    { name: '第十三天', path: '/docs/13day13.md' },
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
