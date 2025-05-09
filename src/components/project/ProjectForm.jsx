import React from 'react';
import './ProjectForm.css';

const ProjectForm = ({ 
  newProject, 
  handleProjectInputChange, 
  handleProjectSubmit, 
  setShowProjectForm,
  isEditing = false 
}) => {
  return (
    <form onSubmit={handleProjectSubmit} className="project-form">
      <h3>{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
      <div className="form-group">
        <label>Project Name:</label>
        <input
          type="text"
          name="name"
          value={newProject.name}
          onChange={handleProjectInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={newProject.description}
          onChange={handleProjectInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={newProject.startDate}
          onChange={handleProjectInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>{isEditing ? 'Status:' : 'Initial Status:'}</label>
        <select
          name="status"
          value={newProject.status}
          onChange={handleProjectInputChange}
        >
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="On Hold">On Hold</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {isEditing ? 'Update Project' : 'Create Project'}
        </button>
        <button 
          type="button" 
          className="cancel-btn"
          onClick={() => setShowProjectForm(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm; 