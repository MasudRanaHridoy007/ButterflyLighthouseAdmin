import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SliderSection from './components/SliderSection';
import Brands from './components/brands';
import TopLevelManagement from './components/TopLevelManagement'
import Login from './pages/login';
import Signup from './pages/signup'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Login />
        <div className="main-content">
          <Routes>
            <Route path="/SliderSection" element={<SliderSection />} />
            <Route path="/TopLevelManagement" element={<TopLevelManagement />} />
            <Route path="/Brands" element={<Brands />} />
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />

            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
