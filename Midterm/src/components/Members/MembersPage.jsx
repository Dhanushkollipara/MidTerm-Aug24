import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import axios from 'axios';

const Members = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('userId');
      if (token) {
        try {
          const response = await axios.get(`http://localhost:3000/api/v1/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        } catch (err) {
          setError('Failed to fetch user details');
        }
      } else {
        setError('No token found');
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', mt: 5, p: 2 }}>
      <Paper elevation={3} sx={{ p: 3, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Avatar
          src="https://static.vecteezy.com/system/resources/previews/027/951/137/non_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png" // Replace with actual avatar URL if available
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          User Details
        </Typography>
        <Typography variant="h6"><b>Username:</b> {user.user.username}</Typography>
        <Typography variant="h6"><b>Email:</b> {user.user.email}</Typography>
        <Typography variant="h6"><b>Display Name:</b> {user.user.displayName}</Typography>
        <Typography variant="h6"><b>Role: </b>{user.user.role.name}</Typography>
      </Paper>
    </Box>
  );
};

export default Members;
