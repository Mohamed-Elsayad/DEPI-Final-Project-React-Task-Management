import React from 'react';
import './TaskSection.css';
import TaskForm from './TaskForm';
import TaskTable from './TaskTable';

const roles = [
  'Designer',
  'Developer',
  'Project Manager',
  'Team Leader'
];

const TaskSection = ({
  selectedProject,
  showTaskForm,
  setShowTaskForm,
  newTask,
  setNewTask,
  handleSubmitTask,
  handleEditTask,
  handleDeleteTask,
  calculateTimeAgo
}) => {
  return (
    <div className="tasks-section">
      <button 
        className="add-task-btn"
        onClick={() => {
          setNewTask({ ...newTask, projectId: selectedProject.id });
          setShowTaskForm(true);
        }}
      >
        + Add Task
      </button>

      {showTaskForm && (
        <TaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          handleSubmitTask={handleSubmitTask}
          setShowTaskForm={setShowTaskForm}
        />
      )}

      <TaskTable
        selectedProject={selectedProject}
        calculateTimeAgo={calculateTimeAgo}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default TaskSection; 