import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../../types/project';

interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  selectedProject: Project | null;
}

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
  selectedProject: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
      state.loading = false;
      state.error = null;
    },

    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },

    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },

    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },

    selectProject: (state, action: PayloadAction<string>) => {
      state.selectedProject = state.projects.find((p) => p.id === action.payload) || null;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setProjects,
  addProject,
  updateProject,
  deleteProject,
  selectProject,
  setLoading,
  setError,
} = projectsSlice.actions;

export default projectsSlice.reducer;
