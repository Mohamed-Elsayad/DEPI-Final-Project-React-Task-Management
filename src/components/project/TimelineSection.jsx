import React from 'react';
import './TimelineSection.css';

const TimelineSection = ({ selectedProject, calculateTimeAgo }) => {
  return (
    <div className="timeline-section">
      <div className="timeline">
        {selectedProject.tasks.map((task, index) => (
          <div key={task.id} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h4>{task.name}</h4>
              <p>Status: {task.status}</p>
              <p>Contributor: {task.contributor}</p>
              <p>Role: {task.role}</p>
              <p>Created: {calculateTimeAgo(task.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineSection; 