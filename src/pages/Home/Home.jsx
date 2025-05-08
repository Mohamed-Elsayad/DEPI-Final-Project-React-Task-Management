import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Spinner, Alert, Card, Button, Badge } from 'react-bootstrap';
import { taskApi } from '../../services/api';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Home.module.css';

const Home = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (user && user.id) {
          const data = await taskApi.fetchTasks(user.id);
          setTasks(data);
          setFilteredTasks(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const term = searchParams.get('search') || '';
    setSearchTerm(term);
    
    if (term) {
      const filtered = tasks.filter(task => 
        task.title.toLowerCase().includes(term.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  }, [location.search, tasks]);

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskApi.deleteTask(taskId);
        setTasks(tasks.filter(task => task._id !== taskId));
        setFilteredTasks(filteredTasks.filter(task => task._id !== taskId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return (
    <div className={styles.loading}>
      <Spinner animation="border" variant="primary" />
    </div>
  );

  if (error) return (
    <Alert variant="danger" className="m-3">
      Error: {error}
    </Alert>
  );

  return (
    <div className={styles.pageContainer}>
      <Navbar user={user} onLogout={onLogout} />
      
      <Container className={styles.taskContainer}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className={styles.pageTitle}>My Tasks</h2>
          <Button 
            variant="success"
            onClick={() => navigate('/add-task')}
            className={styles.addButton}
            style={{ backgroundColor: '#2ee59d', borderColor: '#2ee59d' }}
          >
            <i className="bi bi-plus-lg me-1"></i> Add New Task
          </Button>
        </div>

        {searchTerm && (
          <div className="mb-3">
            <span className="text-muted">
              Showing results for: <strong>"{searchTerm}"</strong>
            </span>
            <Button 
              variant="link"
              size="sm"
              onClick={() => navigate('/')}
              className="ms-2"
            >
              Clear search
            </Button>
          </div>
        )}

        {filteredTasks.length === 0 ? (
          <Card className="text-center p-4">
            <Card.Body>
              <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
              <h5 className="mt-3">
                {searchTerm ? 'No tasks match your search' : 'No tasks found'}
              </h5>
              <p className="text-muted">
                {searchTerm ? 'Try a different search term' : 'Create your first task to get started'}
              </p>
              {!searchTerm && (
                <Button 
                  variant="success"
                  onClick={() => navigate('/add-task')}
                  style={{ backgroundColor: '#2ee59d', borderColor: '#2ee59d' }}
                >
                  Create Task
                </Button>
              )}
            </Card.Body>
          </Card>
        ) : (
          filteredTasks.map(task => (
            <Card 
              key={task._id} 
              className={`mb-3 ${styles.taskCard}`}
              style={{
                borderLeft: `4px solid ${
                  task.status === 'done' ? '#1cc88a' : 
                  task.status === 'in-progress' ? '#f6c23e' : '#858796'
                }`
              }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div className={styles.taskContent}>
                    <Card.Title className={styles.taskTitle}>
                      {task.title}
                    </Card.Title>
                    {task.description && (
                      <Card.Text className={styles.taskDescription}>
                        {task.description}
                      </Card.Text>
                    )}
                  </div>
                  <div className="d-flex">
                    <Button 
                      variant="outline-success"
                      size="sm"
                      className={`me-2 ${styles.taskButton}`}
                      onClick={() => navigate(`/edit-task/${task._id}`)}
                      style={{ color: '#2ee59d', borderColor: '#2ee59d' }}
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </Button>
                    <Button 
                      variant="outline-danger"
                      size="sm"
                      className={styles.taskButton}
                      onClick={() => handleDelete(task._id)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </Button>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <Badge 
                    bg="light"
                    text={
                      task.status === 'done' ? 'success' : 
                      task.status === 'in-progress' ? 'dark' : 'secondary'
                    }
                    className={styles.statusBadge}
                  >
                    {task.status.replace('-', ' ')}
                  </Badge>
                  <small className="text-muted">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </div>
  );
};

export default Home;