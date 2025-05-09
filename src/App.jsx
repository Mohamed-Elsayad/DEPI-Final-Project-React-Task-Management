import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddTask from "./pages/AddTask/AddTask";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import EditTask from "./pages/EditTask/EditTask";
import PlanifyLandingPage from "./pages/PlanifyLandingPage";
import './App.css';
import { useEffect, useState } from 'react';
import Sidebar from "./components/Sidebar";
import TaskTracking from "./pages/TaskTracking";
import CalendarPage from "./pages/Calendar";
import Project from "./components/Project";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    async function fetchTasks() {
      if (user && user.id) {
        const response = await fetch(`https://innovative-flow-production.up.railway.app/api/tasks?userId=${user.id}`);
        const data = await response.json();
        setTasks(data);
      }
    }
    fetchTasks();
    App.fetchTasks = fetchTasks;
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  const handleLogout = () => {
    handleLogin(null);
    window.location.href = '/landing';
  };

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  return (
    <div className="App" style={{ display: 'flex' }}>
      {user && <Sidebar />}
      <div style={{ flex: 1, marginLeft: user ? 250 : 0 }}>
        <Routes>
          <Route path="/landing" element={!user ? <PlanifyLandingPage onLogin={handleLogin} /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <Home user={user} onLogout={handleLogout} /> : <Navigate to="/landing" />} />
          <Route path="/add-task" element={user ? <AddTask user={user} fetchTasks={App.fetchTasks} /> : <Navigate to="/landing" />} />
          <Route path="/edit-task/:id" element={user ? <EditTask user={user} fetchTasks={App.fetchTasks} /> : <Navigate to="/landing" />} />
          <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register onRegister={handleLogin} /> : <Navigate to="/" />} />
          <Route path="/task-tracking" element={user ? <TaskTracking tasks={tasks} user={user} onLogout={handleLogout} fetchTasks={App.fetchTasks} /> : <Navigate to="/landing" />} />
          <Route path="/calendar" element={user ? <CalendarPage tasks={tasks} user={user} onLogout={handleLogout} fetchTasks={App.fetchTasks} /> : <Navigate to="/landing" />} />
          <Route path="/project" element={user ? <Project /> : <Navigate to="/landing" />} />
          <Route path="*" element={<Navigate to="/landing" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;