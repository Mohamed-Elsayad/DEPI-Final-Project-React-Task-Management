import React from 'react';
import './StatusSection.css';

const StatusSection = ({ selectedProject, calculateTimeAgo }) => {
  // Sort statusLogs from newest to oldest
  const sortedLogs = [...selectedProject.statusLogs].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  return (
    <div className="status-section">
      <div className="status-logs">
        {sortedLogs.map(log => (
          <div key={log.id} className="status-log">
            <div className="status-change">
              <span className={`status-badge ${log.from.toLowerCase().replace(' ', '-')}`}>
                {log.from}
              </span>
              <span className="status-arrow">→</span>
              <span className={`status-badge ${log.to.toLowerCase().replace(' ', '-')}`}>
                {log.to}
              </span>
            </div>
            <span className="log-date">{calculateTimeAgo(log.timestamp)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusSection; 