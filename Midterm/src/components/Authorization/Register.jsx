import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, CircularProgress, Box, MenuItem, Select, InputLabel, FormControl, FormHelperText, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../redux/auth/authAction';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/roles');
        setRoles(response.data.roles); 
      } catch (error) {
        console.error('Failed to fetch roles', error);
      }
    };

    fetchRoles();
  }, []);

  const validationSchema = Yup.object({
    displayName: Yup.string()
      .required('Display Name is required')
      .min(2, 'Display Name must be at least 2 characters')
      .max(20, 'Display Name must not be more than 20 characters'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must not be more than 20 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    role: Yup.string()
      .required('Role is required'),
  });

  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      username: '',
      password: '',
      role: ''
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      dispatch(registerUser(values))
        .then(() => {
          setSnackbarMessage('Registration successful!');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
        })
        .catch((error) => {
          setSnackbarMessage('Failed to register. Please try again.');
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
        label="Display Name"
        name="displayName"
        fullWidth
        margin="normal"
        value={formik.values.displayName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.displayName && Boolean(formik.errors.displayName)}
        helperText={formik.touched.displayName && formik.errors.displayName}
      />
      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
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
      <FormControl
        fullWidth
        margin="normal"
        error={formik.touched.role && Boolean(formik.errors.role)}
      >
        <InputLabel>Role</InputLabel>
        <Select
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {roles.map((role) => (
            <MenuItem key={role._id} value={role._id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.role && formik.errors.role && (
          <FormHelperText>{formik.errors.role}</FormHelperText>
        )}
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Register'}
      </Button>

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

export default Register;
