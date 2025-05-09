import React, { useState, useEffect } from "react";
import './Project.css';
import ProjectList from "./project/ProjectList.jsx";
import ProjectDetails from "./project/ProjectDetails.jsx";

const Project = () => {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [
      {
        id: 1,
        name: 'Website Redesign',
        description: 'Complete overhaul of company website',
        status: 'In Progress',
        startDate: new Date('2024-03-01').toISOString(),
        tasks: [],
        notes: [],
        statusLogs: []
      },
      {
        id: 2,
        name: 'Mobile App Development',
        description: 'New mobile application for iOS and Android',
        status: 'Planning',
        startDate: new Date('2024-03-15').toISOString(),
        tasks: [],
        notes: [],
        statusLogs: []
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('tasks');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'Planning',
    startDate: new Date().toISOString().split('T')[0]
  });
  const [newTask, setNewTask] = useState({
    name: '',
    designer: '',
    status: 'Pending',
    projectId: null
  });
  const [newNote, setNewNote] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  const calculateTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`;
    return 'Just now';
  };

  const handleProjectInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const date = new Date(newProject.startDate);
    date.setHours(12, 0, 0, 0);
    const projectToAdd = {
      ...newProject,
      id: Date.now(),
      startDate: date.toISOString(),
      tasks: [],
      notes: [],
      statusLogs: [{
        id: Date.now(),
        from: 'Created',
        to: newProject.status,
        timestamp: new Date().toISOString()
      }]
    };
    setProjects([...projects, projectToAdd]);
    setNewProject({
      name: '',
      description: '',
      status: 'Planning',
      startDate: new Date().toISOString().split('T')[0]
    });
    setShowProjectForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmitTask = (e) => {
    e.preventDefault();
    if (editingTask) {
      const updatedProjects = projects.map(project => {
        if (project.id === selectedProject.id) {
          return {
            ...project,
            tasks: project.tasks.map(task =>
              task.id === editingTask.id
                ? { ...newTask, id: editingTask.id, createdAt: editingTask.createdAt, updatedAt: new Date().toISOString() }
                : task
            )
          };
        }
        return project;
      });
      setProjects(updatedProjects);
      setSelectedProject(updatedProjects.find(p => p.id === selectedProject.id));
      setEditingTask(null);
    } else {
      const taskToAdd = {
        ...newTask,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      const updatedProjects = projects.map(project => {
        if (project.id === selectedProject.id) {
          return {
            ...project,
            tasks: [...project.tasks, taskToAdd]
          };
        }
        return project;
      });
      setProjects(updatedProjects);
      setSelectedProject(updatedProjects.find(p => p.id === selectedProject.id));
    }
    setNewTask({
      name: '',
      designer: '',
      status: 'Pending',
      projectId: null
    });
    setShowTaskForm(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      name: task.name,
      designer: task.designer,
      status: task.status,
      projectId: task.projectId
    });
    setShowTaskForm(true);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedProjects = projects.map(project => {
        if (project.id === selectedProject.id) {
          return {
            ...project,
            tasks: project.tasks.filter(task => task.id !== taskId)
          };
        }
        return project;
      });
      setProjects(updatedProjects);
      setSelectedProject(updatedProjects.find(p => p.id === selectedProject.id));
    }
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      const noteToAdd = {
        id: Date.now(),
        content: newNote,
        createdAt: new Date().toISOString()
      };
      const updatedProjects = projects.map(project => {
        if (project.id === selectedProject.id) {
          return {
            ...project,
            notes: [...project.notes, noteToAdd]
          };
        }
        return project;
      });
      setProjects(updatedProjects);
      setSelectedProject(updatedProjects.find(p => p.id === selectedProject.id));
      setNewNote('');
    }
  };

  const handleDeleteNote = (noteId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          notes: project.notes.filter(note => note.id !== noteId)
        };
      }
      return project;
    });
    setProjects(updatedProjects);
    setSelectedProject(updatedProjects.find(p => p.id === selectedProject.id));
  };

  const handleStatusUpdate = (newStatus) => {
    const statusLog = {
      id: Date.now(),
      from: selectedProject.status,
      to: newStatus,
      timestamp: new Date().toISOString()
    };
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          status: newStatus,
          statusLogs: [...project.statusLogs, statusLog]
        };
      }
      return project;
    });
    setProjects(updatedProjects);
    setSelectedProject(updatedProjects.find(p => p.id === selectedProject.id));
  };

  const handleEditProject = () => {
    setEditingProject(selectedProject);
    setNewProject({
      name: selectedProject.name,
      description: selectedProject.description,
      status: selectedProject.status,
      startDate: new Date(selectedProject.startDate).toISOString().split('T')[0]
    });
  };

  const handleDeleteProject = () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      const updatedProjects = projects.filter(project => project.id !== selectedProject.id);
      setProjects(updatedProjects);
      setSelectedProject(null);
    }
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        const updatedProject = {
          ...project,
          name: newProject.name,
          description: newProject.description,
          status: newProject.status,
          startDate: new Date(newProject.startDate).toISOString(),
          statusLogs: [
            ...project.statusLogs,
            {
              id: Date.now(),
              from: project.status,
              to: newProject.status,
              timestamp: new Date().toISOString()
            }
          ]
        };
        return updatedProject;
      }
      return project;
    });
    setProjects(updatedProjects);
    setSelectedProject(updatedProjects.find(p => p.id === selectedProject.id));
    setEditingProject(null);
    setNewProject({
      name: '',
      description: '',
      status: 'Planning',
      startDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="project-manager">
      {!selectedProject ? (
        <ProjectList
          projects={projects}
          showProjectForm={showProjectForm}
          setShowProjectForm={setShowProjectForm}
          newProject={newProject}
          handleProjectInputChange={handleProjectInputChange}
          handleProjectSubmit={handleProjectSubmit}
          calculateTimeAgo={calculateTimeAgo}
          setSelectedProject={setSelectedProject}
        />
      ) : (
        <ProjectDetails
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          editingProject={editingProject}
          setEditingProject={setEditingProject}
          newProject={newProject}
          handleProjectInputChange={handleProjectInputChange}
          handleUpdateProject={handleUpdateProject}
          handleDeleteProject={handleDeleteProject}
          handleStatusUpdate={handleStatusUpdate}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showTaskForm={showTaskForm}
          setShowTaskForm={setShowTaskForm}
          newTask={newTask}
          setNewTask={setNewTask}
          handleSubmitTask={handleSubmitTask}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
          handleAddNote={handleAddNote}
          handleDeleteNote={handleDeleteNote}
          newNote={newNote}
          setNewNote={setNewNote}
          calculateTimeAgo={calculateTimeAgo}
        />
      )}
    </div>
  );
};

export default Project; 