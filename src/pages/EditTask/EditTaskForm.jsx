import React from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

const EditTaskForm = ({ task, setTask, error, isSubmitting, handleSubmit, handleDelete, handleCancel }) => (
  <Form onSubmit={handleSubmit}>
    <h3>Edit Task</h3>
    {error && <Alert variant="danger">{error}</Alert>}
    <Form.Group className="mb-3" controlId="taskTitle">
      <Form.Label>Title</Form.Label>
      <Form.Control
        type="text"
        value={task.title}
        onChange={e => setTask({ ...task, title: e.target.value })}
        required
        disabled={isSubmitting}
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="taskDescription">
      <Form.Label>Description</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        value={task.description}
        onChange={e => setTask({ ...task, description: e.target.value })}
        disabled={isSubmitting}
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="taskStatus">
      <Form.Label>Status</Form.Label>
      <Form.Select
        value={task.status}
        onChange={e => setTask({ ...task, status: e.target.value })}
        disabled={isSubmitting}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </Form.Select>
    </Form.Group>
    <div className="d-flex gap-2">
      <Button type="submit" variant="success" disabled={isSubmitting}>
        {isSubmitting ? <Spinner size="sm" animation="border" /> : 'Save Changes'}
      </Button>
      <Button variant="danger" onClick={handleDelete} disabled={isSubmitting}>
        Delete
      </Button>
      <Button variant="secondary" onClick={handleCancel} disabled={isSubmitting}>
        Cancel
      </Button>
    </div>
  </Form>
);

export default EditTaskForm; 