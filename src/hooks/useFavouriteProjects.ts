import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { Project } from '../types/project';
import { toggleFavorite, updateFavoriteProject } from '@/features/projects/favoriteProjectsSlice';

const useFavouriteProjects = () => {
  const dispatch = useDispatch();
  const favoriteProjects = useSelector(
    (state: RootState) => state.favoriteProjects.favoriteProjects
  );

  const addFavoriteProject = (project: Project) => {
    dispatch(toggleFavorite(project));
  };

  const removeFavoriteProject = (project: Project) => {
    dispatch(toggleFavorite(project));
  };

  const updateFavorite = (project: Project) => {
    dispatch(updateFavoriteProject(project));
  };

  const toggleFavouriteProject = (project: Project) => {
    dispatch(toggleFavorite(project));
  };

  return {
    favoriteProjects,
    addFavoriteProject,
    removeFavoriteProject,
    toggleFavouriteProject,
    updateFavorite,
  };
};

export default useFavouriteProjects;
