import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Register from './components/Authorization/Register';
import Login from './components/Authorization/Login';
import MembersPage from './components/Members/MembersPage';
import AdminPage from './components/Admin/AdminPage';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            E-commerce App
          </Typography>
          <Button color="inherit" href="/">
            Home
          </Button>
          <Button color="inherit" href="/login">
            Login
          </Button>
          <Button color="inherit" href="/register">
            Register
          </Button>
          {user && (
            <Button color="inherit" href="/adminlogin">
              Admin
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5 }}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/members" element={<MembersPage />} />
          <Route path="/adminlogin" element={<AdminPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
