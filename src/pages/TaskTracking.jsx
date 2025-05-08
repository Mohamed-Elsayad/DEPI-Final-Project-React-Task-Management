import React, { useState } from 'react';
import TaskStats from '../components/TaskStats';
import Navbar from '../components/Navbar/Navbar';

const statusLabels = {
  done: 'Done',
  'in-progress': 'In Progress',
  pending: 'Left This Month',
};

const statusColors = {
  done: '#2ee59d',
  'in-progress': '#ff9f43',
  pending: '#ff5b5b',
};

const containerStyle = {
  maxWidth: 1100,
  margin: '0 auto',
  padding: '32px 16px',
};

const TaskTracking = ({ tasks, user, onLogout }) => {
  const [selectedStatus, setSelectedStatus] = useState(null);

  const filteredTasks = selectedStatus
    ? tasks.filter((t) => t.status === selectedStatus)
    : [];

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <div style={containerStyle}>
        <TaskStats tasks={tasks} user={user} onCardClick={setSelectedStatus} />
        {selectedStatus && (
          <div style={{ marginTop: 32 }}>
            <h3 style={{ fontWeight: 600, marginBottom: 24, marginLeft: 8 }}>
              Showing {statusLabels[selectedStatus]} Tasks
              <button
                style={{ marginLeft: 16, padding: '4px 12px', borderRadius: 6, border: 'none', background: '#eee', cursor: 'pointer', fontWeight: 500 }}
                onClick={() => setSelectedStatus(null)}
              >
                Clear Filter
              </button>
            </h3>
            {filteredTasks.length === 0 ? (
              <p style={{ color: '#888', marginTop: 16, marginLeft: 8 }}>No tasks found for this status.</p>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginLeft: 0 }}>
                {filteredTasks.map((task) => (
                  <div
                    key={task._id}
                    style={{
                      flex: '1 1 260px',
                      minWidth: 240,
                      maxWidth: 340,
                      background: '#fff',
                      borderRadius: 16,
                      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                      padding: '20px 18px 16px 18px',
                      marginBottom: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#222b45', marginBottom: 8 }}>{task.title}</div>
                    {task.description && <div style={{ color: '#6c757d', fontSize: 15, marginBottom: 12 }}>{task.description}</div>}
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
                      <span
                        style={{
                          background: statusColors[selectedStatus] + '22',
                          color: statusColors[selectedStatus],
                          fontWeight: 600,
                          fontSize: 13,
                          borderRadius: 8,
                          padding: '2px 10px',
                          marginRight: 8,
                        }}
                      >
                        {statusLabels[selectedStatus]}
                      </span>
                      <span style={{ color: '#a0aec0', fontSize: 13 }}>
                        {task.createdAt ? `Created: ${new Date(task.createdAt).toLocaleDateString()}` : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TaskTracking; 