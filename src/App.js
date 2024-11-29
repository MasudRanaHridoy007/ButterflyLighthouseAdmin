import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SliderSection from './components/SliderSection';
import Brands from './components/brands';
import TopLevelManagement from './components/TopLevelManagement';
import Login from './pages/login';
import Signup from './pages/signup';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <MainLayout />
      </div>
    </Router>
  );
}

// Main Layout Component
function MainLayout() {
  const location = useLocation();

  // Define routes where the Sidebar should NOT be displayed
  const hideSidebarRoutes = ['/', '/Signup'];

  // Check if the current route matches any of the routes to hide the sidebar
  const isSidebarVisible = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="main-container">
      {isSidebarVisible && <Sidebar />} {/* Render Sidebar conditionally */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/SliderSection" element={<SliderSection />} />
          <Route path="/TopLevelManagement" element={<TopLevelManagement />} />
          <Route path="/Brands" element={<Brands />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
