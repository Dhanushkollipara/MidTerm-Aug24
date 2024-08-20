import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const AdminPage = () => {
  return (
    <Container>
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hi Admin
        </Typography>
        <Typography variant="body1">
          Welcome to the admin dashboard. Here you can manage various aspects of the application.
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminPage;
