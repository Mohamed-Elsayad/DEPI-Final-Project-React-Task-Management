import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project, calculateTimeAgo, setSelectedProject }) => {
  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <div className="project-meta">
        <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
          {project.status}
        </span>
        <span className="date">Started {calculateTimeAgo(project.startDate)}</span>
      </div>
      <button 
        className="view-details-btn"
        onClick={() => setSelectedProject(project)}
      >
        View Details
      </button>
    </div>
  );
};

export default ProjectCard; 