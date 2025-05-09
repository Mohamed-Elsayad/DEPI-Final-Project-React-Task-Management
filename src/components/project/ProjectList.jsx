import React from 'react';
import ProjectCard from './ProjectCard.jsx';
import ProjectForm from './ProjectForm.jsx';
import './ProjectList.css';

const ProjectList = ({ 
  projects, 
  showProjectForm, 
  setShowProjectForm, 
  newProject, 
  handleProjectInputChange, 
  handleProjectSubmit,
  calculateTimeAgo,
  setSelectedProject 
}) => {
  return (
    <div className="projects-list">
      <div className="projects-header">
        <h2>Active Projects</h2>
        <button 
          className="add-project-btn"
          onClick={() => setShowProjectForm(true)}
        >
          + Add New Project
        </button>
      </div>

      {showProjectForm && (
        <ProjectForm
          newProject={newProject}
          handleProjectInputChange={handleProjectInputChange}
          handleProjectSubmit={handleProjectSubmit}
          setShowProjectForm={setShowProjectForm}
        />
      )}

      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            calculateTimeAgo={calculateTimeAgo}
            setSelectedProject={setSelectedProject}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectList; 