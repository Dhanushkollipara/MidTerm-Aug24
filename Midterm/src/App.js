import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, AppBar, Toolbar, Typography, Button, CircularProgress } from '@mui/material';
import ProtectedRoute from './ProtectedRoute';

// Lazy loading components
const Register = lazy(() => import('./components/Authorization/Register'));
const Login = lazy(() => import('./components/Authorization/Login'));
const MembersPage = lazy(() => import('./components/Members/MembersPage'));
const AdminPage = lazy(() => import('./components/Admin/AdminPage'));
const Addproducts = lazy(() => import('./components/Admin/AddProducts'));
const AddCategory = lazy(() => import('./components/Admin/AddCategory'));
const HomePage = lazy(() => import('./components/HomePage'));

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
        <Suspense fallback={<CircularProgress />}>
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
        </Suspense>
      </Container>
    </Router>
  );
}

export default App;
