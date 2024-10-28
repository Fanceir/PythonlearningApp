// components/ContentArea.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Divider, Box } from '@mui/material';
import MarkdownContent from './MarkdownContent';

function ContentArea({ selectedModule }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(selectedModule.path);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Failed to load content', error);
        setContent('Failed to load content');
      }
    };

    fetchContent();
  }, [selectedModule]);

  return (
    <Container sx={{ flex: 1, overflowY: 'auto', p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {selectedModule.name}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ mt: 2 }}>
        <MarkdownContent content={content} />
      </Box>
    </Container>
  );
}

export default ContentArea;
