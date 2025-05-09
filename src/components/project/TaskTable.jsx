import React from 'react';

const TaskTable = ({ selectedProject, calculateTimeAgo, handleEditTask, handleDeleteTask }) => (
  <table className="task-table">
    <thead>
      <tr>
        <th>Status</th>
        <th>Task Name</th>
        <th>Contributor</th>
        <th>Role</th>
        <th>Last Update</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {selectedProject.tasks.map((task) => (
        <tr key={task.id}>
          <td>
            <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
              {task.status}
            </span>
          </td>
          <td>{task.name}</td>
          <td>{task.contributor}</td>
          <td>{task.role}</td>
          <td>{calculateTimeAgo(task.updatedAt || task.createdAt)}</td>
          <td className="actions">
            <button 
              className="edit-btn"
              onClick={() => handleEditTask(task)}
            >
              Edit
            </button>
            <button 
              className="delete-btn"
              onClick={() => handleDeleteTask(task.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TaskTable; 