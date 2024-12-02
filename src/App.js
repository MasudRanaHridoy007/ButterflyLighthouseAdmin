import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SliderSection from './components/SliderSection';
import Brands from './components/brands';
import TopLevelManagement from './components/TopLevelManagement';
import Login from './pages/login';
import './App.css';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}
function MainLayout() {
  const location = useLocation();
  const token = localStorage.getItem('lighthouse_admin_token'); // Retrieve token

  // Define routes where Sidebar should NOT be displayed
  const hideSidebarRoutes = ['/login'];

  // Check if the current route matches a "no Sidebar" route
  const isSidebarVisible = !hideSidebarRoutes.includes(location.pathname);

  // Redirect to login if the user is not authenticated
  if (!token && location.pathname !== '/login') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="main-container">
      {isSidebarVisible && <Sidebar />} {/* Conditionally render Sidebar */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<PrivateRoute><SliderSection /></PrivateRoute>} />
          <Route path="/slidersection" element={<PrivateRoute><SliderSection /></PrivateRoute>} />
          <Route path="/topLevelmanagement" element={<PrivateRoute><TopLevelManagement /></PrivateRoute>} />
          <Route path="/brands" element={<PrivateRoute><Brands /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}


// PrivateRoute Component to protect routes
function PrivateRoute({ children }) {
  const token = localStorage.getItem('lighthouse_admin_token'); // Retrieve token from localStorage

  if (!token) {
    // Redirect to Login page if no token
    return <Navigate to="/login" />;
  }

  return children; // Render children if token exists
}

export default App;
