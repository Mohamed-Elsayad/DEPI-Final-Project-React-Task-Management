import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import styles from './Home.module.css';

const TaskList = ({ filteredTasks, searchTerm, navigate, handleDelete }) => (
  filteredTasks.length === 0 ? (
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
  )
);

export default TaskList; 