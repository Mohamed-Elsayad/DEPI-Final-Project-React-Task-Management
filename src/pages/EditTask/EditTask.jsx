import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';
import { taskApi } from '../../services/api';
import styles from './EditTask.module.css';
import EditTaskForm from './EditTaskForm';

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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await taskApi.deleteTask(id);
      navigate('/');
    }
  };

  const handleCancel = () => {
    navigate('/');
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
        <EditTaskForm
          task={task}
          setTask={setTask}
          error={error}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          handleCancel={handleCancel}
        />
      </Container>
    </div>
  );
};

export default EditTask;