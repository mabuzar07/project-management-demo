import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from '../features/projects/projectsSlice';
import favoriteProjectsReducer from '../features/projects/favoriteProjectsSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    favoriteProjects: favoriteProjectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
