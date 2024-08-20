import React from 'react';
import { Box, Typography, Container, AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <Container>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" component={Link} to="/admin/add-products">
            Add Products
          </Button>
          <Button color="inherit" component={Link} to="/admin/add-category">
            Add Category
          </Button>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hi Admin
        </Typography>
        <Typography variant="body1">
          Welcome to the admin dashboard. Use the navigation bar above to manage products and categories.
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminPage;
