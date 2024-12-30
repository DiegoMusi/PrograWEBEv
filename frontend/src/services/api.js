// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const fetchProjects = async (token) => {
  try {
    const response = await api.get('/projects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching projects:', err);
    throw err;
  }
};

export const createProject = async (token, project) => {
  try {
    const response = await api.post('/projects', project, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Error creating project:', err);
    throw err;
  }
};
