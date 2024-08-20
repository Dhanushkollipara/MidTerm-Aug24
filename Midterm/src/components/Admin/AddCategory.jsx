import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/v1/categories', { name, description })
      .then(() => {
        navigate('/admin'); // Redirect to Admin page after submission
      })
      .catch(error => console.error('Error creating category:', error));
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Create Category</Typography>
        <IconButton
          onClick={() => navigate('/admin')}
          color="primary"
          sx={{ position: 'absolute', top: 16, right: 16 }}
        >
          <CloseIcon />
        </IconButton>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={4}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Create
          </Button>
          <Button
            type="button"
            onClick={() => navigate('/adminlogin')}
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddCategory;
