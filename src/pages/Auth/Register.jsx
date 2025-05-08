import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { authApi } from '../../services/api';
import styles from './Register.module.css';

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await authApi.register({
        username: userData.username,
        password: userData.password
      });
      onRegister(response.user);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Container className={styles.formContainer}>
        <Card className="shadow-sm">
          <Card.Header style={{ backgroundColor: '#2ee59d' }} className="text-white py-3">
            <h2 className="mb-0">Register</h2>
          </Card.Header>
          <Card.Body className="p-4">
            {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={userData.username}
                  onChange={(e) => setUserData({...userData, username: e.target.value})}
                  required
                  minLength={3}
                  autoFocus
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={userData.password}
                  onChange={(e) => setUserData({...userData, password: e.target.value})}
                  required
                  minLength={6}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={userData.confirmPassword}
                  onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
                  required
                  minLength={6}
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center">
                <Button
                  variant="link"
                  onClick={() => navigate('/login')}
                  className="ps-0"
                >
                  Already have an account? Login
                </Button>
                <Button
                  style={{ backgroundColor: '#2ee59d', borderColor: '#2ee59d' }}
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Register;