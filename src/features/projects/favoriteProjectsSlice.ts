import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../../types/project';

interface FavoriteProjectsState {
  favoriteProjects: Project[];
}

const initialState: FavoriteProjectsState = {
  favoriteProjects: [],
};

const favoriteProjectsSlice = createSlice({
  name: 'favoriteProjects',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Project>) => {
      const index = state.favoriteProjects.findIndex((p) => p.id === action.payload.id);
      if (index === -1) {
        state.favoriteProjects.push(action.payload);
      } else {
        state.favoriteProjects.splice(index, 1);
      }
    },
    updateFavoriteProject: (state, action: PayloadAction<Project>) => {
      const index = state.favoriteProjects.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.favoriteProjects[index] = action.payload;
      }
    },
  },
});

export const { toggleFavorite, updateFavoriteProject } = favoriteProjectsSlice.actions;
export default favoriteProjectsSlice.reducer;
