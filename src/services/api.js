import axios from 'axios';

const API_URL = 'https://innovative-flow-production.up.railway.app/api';

export const authApi = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      return {
        user: {
          id: response.data.user.id,
          name: response.data.user.username,
          token: response.data.token || ''
        }
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return {
        user: {
          id: response.data.user.id,
          name: response.data.user.username,
          token: response.data.token || ''
        }
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }
};

export const taskApi = {
  fetchTasks: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/tasks`, {
        params: { userId }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tasks');
    }
  },
  
  createTask: async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create task');
    }
  },
  
  updateTask: async (taskId, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update task');
    }
  },
  
  deleteTask: async (taskId) => {
    try {
      const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete task');
    }
  }
};