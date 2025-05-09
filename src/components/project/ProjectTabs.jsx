import React from 'react';
import TaskSection from './TaskSection';
import TimelineSection from './TimelineSection';
import StatusSection from './StatusSection';
import './ProjectTabs.css';

const ProjectTabs = ({
  activeTab,
  setActiveTab,
  selectedProject,
  showTaskForm,
  setShowTaskForm,
  newTask,
  setNewTask,
  handleSubmitTask,
  handleEditTask,
  handleDeleteTask,
  handleAddNote,
  handleDeleteNote,
  newNote,
  setNewNote,
  calculateTimeAgo
}) => {
  return (
    <>
      <div className="project-tabs">
        <button 
          className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </button>
        <button 
          className={`tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('timeline')}
        >
          Timeline
        </button>
        <button 
          className={`tab-btn ${activeTab === 'status' ? 'active' : ''}`}
          onClick={() => setActiveTab('status')}
        >
          Status Updates
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'tasks' && (
          <TaskSection
            selectedProject={selectedProject}
            showTaskForm={showTaskForm}
            setShowTaskForm={setShowTaskForm}
            newTask={newTask}
            setNewTask={setNewTask}
            handleSubmitTask={handleSubmitTask}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
            calculateTimeAgo={calculateTimeAgo}
          />
        )}

        {activeTab === 'timeline' && (
          <TimelineSection
            selectedProject={selectedProject}
            calculateTimeAgo={calculateTimeAgo}
          />
        )}

        {activeTab === 'status' && (
          <StatusSection
            selectedProject={selectedProject}
            calculateTimeAgo={calculateTimeAgo}
          />
        )}
      </div>
    </>
  );
};

export default ProjectTabs; 