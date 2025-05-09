import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import PlanifyLandingPage from './pages/PlanifyLandingPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <PlanifyLandingPage 
              onLogin={handleLogin}
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;