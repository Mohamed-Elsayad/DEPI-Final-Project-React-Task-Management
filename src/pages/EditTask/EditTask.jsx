import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { taskApi } from '../../services/api';
import styles from './EditTask.module.css';

const EditTask = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    userId: user.id
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const tasks = await taskApi.fetchTasks(user.id);
        const taskToEdit = tasks.find(t => t._id === id);
        if (taskToEdit) {
          setTask(taskToEdit);
        } else {
          throw new Error('Task not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!task.title) {
      setError('Title is required');
      return;
    }

    setIsSubmitting(true);

    try {
      await taskApi.updateTask(id, task);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className={styles.loading}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return (
    <Alert variant="danger" className="m-3">
      Error: {error}
    </Alert>
  );

  return (
    <div className={styles.pageContainer}>
      <Container className={styles.formContainer}>
        <Card>
          <Card.Header style={{ backgroundColor: '#2ee59d' }} className="text-white">
            <h2>Edit Task</h2>
          </Card.Header>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Task Title *</Form.Label>
                <Form.Control
                  type="text"
                  value={task.title}
                  onChange={(e) => setTask({...task, title: e.target.value})}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={task.description}
                  onChange={(e) => setTask({...task, description: e.target.value})}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={task.status}
                  onChange={(e) => setTask({...task, status: e.target.value})}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </Form.Select>
              </Form.Group>

              <div className="d-flex justify-content-between">
                <div>
                  <Button
                    variant="danger"
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to delete this task?')) {
                        await taskApi.deleteTask(id);
                        navigate('/');
                      }
                    }}
                    className="me-2"
                  >
                    Delete Task
                  </Button>
                </div>
                <div>
                  <Button
                    variant="secondary"
                    onClick={() => navigate('/')}
                    className="me-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="success"
                    type="submit"
                    disabled={isSubmitting}
                    style={{ backgroundColor: '#2ee59d', borderColor: '#2ee59d' }}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default EditTask;