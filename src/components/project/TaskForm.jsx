import React from 'react';

const roles = [
  'Designer',
  'Developer',
  'Project Manager',
  'Team Leader'
];

const TaskForm = ({ newTask, setNewTask, handleSubmitTask, setShowTaskForm }) => (
  <form onSubmit={handleSubmitTask} className="task-form">
    <h3>{newTask.id ? 'Edit Task' : 'Add New Task'}</h3>
    <div className="form-group">
      <label>Task Name:</label>
      <input
        type="text"
        name="name"
        value={newTask.name}
        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        required
      />
    </div>
    <div className="form-group">
      <label>Contributor:</label>
      <input
        type="text"
        name="contributor"
        value={newTask.contributor || ''}
        onChange={(e) => setNewTask({ ...newTask, contributor: e.target.value })}
        required
      />
    </div>
    <div className="form-group">
      <label>Role:</label>
      <select
        name="role"
        value={newTask.role || roles[0]}
        onChange={(e) => setNewTask({ ...newTask, role: e.target.value })}
        required
      >
        {roles.map(role => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
    </div>
    <div className="form-group">
      <label>Status:</label>
      <select
        name="status"
        value={newTask.status}
        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
    <div className="form-actions">
      <button type="submit" className="submit-btn">
        {newTask.id ? 'Update Task' : 'Add Task'}
      </button>
      <button 
        type="button" 
        className="cancel-btn"
        onClick={() => {
          setShowTaskForm(false);
          setNewTask({
            name: '',
            contributor: '',
            role: roles[0],
            status: 'Pending',
            projectId: null
          });
        }}
      >
        Cancel
      </button>
    </div>
  </form>
);

export default TaskForm; 