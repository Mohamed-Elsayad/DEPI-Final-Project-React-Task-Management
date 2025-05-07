import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { authApi } from '../../services/api';
import styles from './Login.module.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await authApi.login(credentials);
      if (response.user) {
        onLogin(response.user);
        navigate('/', { replace: true });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
    <div className={styles.pageContainer}>
      
      <Container className={styles.formContainer}>
        <Card className="shadow-sm">
          <Card.Header className="bg-primary text-white py-3">
            <h2 className="mb-0">Login</h2>
          </Card.Header>
          <Card.Body className="p-4">
            {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  required
                  autoFocus
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  required
                />
              </Form.Group>

               <div className="d-flex justify-content-between align-items-center mt-3">
                   <Button variant="link"onClick={() => navigate('/register')}className="ps-0">
                  Don't have an account? Register
                </Button>
                    <Button variant="primary" type="submit" disabled={isSubmitting} size="lg">
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
             </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      
    </div>
  );
};

export default Login;