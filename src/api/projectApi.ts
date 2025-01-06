import axios from 'axios';
import { Project } from '../types/project';

const API_BASE_URL = 'api/v1';

export const projectApi = {
  getProjects: async (): Promise<Project[]> => {
    const response = await axios.get(`${API_BASE_URL}/projects`);
    return response.data;
  },

  getProject: async (id: string): Promise<Project> => {
    const response = await axios.get(`${API_BASE_URL}/projects/${id}`);
    return response.data;
  },

  updateProject: async (project: Project): Promise<Project> => {
    const response = await axios.put(`${API_BASE_URL}/projects/${project.id}`, project);
    return response.data;
  },
};
