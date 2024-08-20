import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Register from './components/Authorization/Register';
import Login from './components/Authorization/Login';
import MembersPage from './components/Members/MembersPage';
import AdminPage from './components/Admin/AdminPage';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import Addproducts from './components/Admin/AddProducts';
import AddCategory from './components/Admin/AddCategory';
import HomePage from './components/HomePage';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            SkyBuy
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
          <Button color="inherit" href="/register" onClick={handleLogout}>
            Logout
          </Button> 
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5 }}>
        <Routes>
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/admin/add-products" element={<Addproducts />} />
          <Route path="/admin/add-category" element={<AddCategory />} />
          <Route path="/adminlogin" element={<ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>} />
          <Route path="/" element={<HomePage/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
