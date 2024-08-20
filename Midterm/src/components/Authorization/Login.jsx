import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, CircularProgress, Box, Snackbar, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../redux/auth/authAction';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must not be more than 20 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      dispatch(loginUser(values))
        .then(() => {
          setSnackbarMessage('Login successful!');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
        navigate('/members');
        })
        .catch((error) => {
          setSnackbarMessage('Failed to login. Please check your credentials.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        })
        .finally(() => setLoading(false));
    },
  });

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      component="form"
      sx={{ maxWidth: 400, margin: '0 auto', mt: 5 }}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        label="Username"
        name="username"
        fullWidth
        margin="normal"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Login'}
      </Button>

      {/* Snackbar for success and error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
