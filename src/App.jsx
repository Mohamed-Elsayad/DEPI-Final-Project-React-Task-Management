import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddTask from "./pages/AddTask/AddTask";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import EditTask from "./pages/EditTask/EditTask";
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <Home user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/add-task" element={user ? <AddTask user={user} /> : <Navigate to="/login" />} />
        <Route path="/edit-task/:id" element={user ? <EditTask user={user} /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register onRegister={handleLogin} /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;