import React from 'react';
import ProjectTabs from './ProjectTabs.jsx';
import ProjectForm from './ProjectForm.jsx';
import './ProjectDetails.css';

const ProjectDetails = ({
  selectedProject,
  setSelectedProject,
  editingProject,
  setEditingProject,
  newProject,
  handleProjectInputChange,
  handleUpdateProject,
  handleDeleteProject,
  handleStatusUpdate,
  activeTab,
  setActiveTab,
  showTaskForm,
  setShowTaskForm,
  newTask,
  setNewTask,
  handleSubmitTask,
  handleEditTask,
  handleDeleteTask,
  handleAddNote,
  newNote,
  setNewNote,
  calculateTimeAgo
}) => {
  return (
    <div className="project-details">
      <div className="project-header">
        <button className="back-btn" onClick={() => {
          setSelectedProject(null);
          setEditingProject(null);
        }}>
          ← Back to Projects
        </button>
        <h2>{selectedProject.name}</h2>
        <div className="project-status">
          <span className={`status-badge ${selectedProject.status.toLowerCase().replace(' ', '-')}`}>
            {selectedProject.status}
          </span>
          <select 
            value={selectedProject.status}
            onChange={(e) => handleStatusUpdate(e.target.value)}
            className="status-select"
          >
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="project-actions">
            {/* <button 
              className="edit-btn"
              onClick={() => setEditingProject(selectedProject)}
            >
              Edit Project
            </button> */}
            <button 
              className="delete-btn"
              onClick={handleDeleteProject}
            >
              Delete Project
            </button>
          </div>
        </div>
      </div>

      {editingProject && (
        <ProjectForm
          newProject={newProject}
          handleProjectInputChange={handleProjectInputChange}
          handleProjectSubmit={handleUpdateProject}
          setShowProjectForm={() => setEditingProject(null)}
          isEditing={true}
        />
      )}

      <ProjectTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedProject={selectedProject}
        showTaskForm={showTaskForm}
        setShowTaskForm={setShowTaskForm}
        newTask={newTask}
        setNewTask={setNewTask}
        handleSubmitTask={handleSubmitTask}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
        handleAddNote={handleAddNote}
        newNote={newNote}
        setNewNote={setNewNote}
        calculateTimeAgo={calculateTimeAgo}
      />
    </div>
  );
};

export default ProjectDetails; 