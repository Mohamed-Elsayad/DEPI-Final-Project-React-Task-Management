import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { taskApi } from '../../services/api';
import styles from './AddTask.module.css';

const AddTask = ({ user }) => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    userId: user.id
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!task.title) {
      setError('Title is required');
      return;
    }

    setIsSubmitting(true);

    try {
      await taskApi.createTask(task);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Container className={styles.formContainer}>
        <Card>
          <Card.Header className="bg-primary text-white">
            <h2>Add New Task</h2>
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

              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  onClick={() => navigate('/')}
                  className="me-2"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Task'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AddTask;