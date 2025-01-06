import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import {
  selectProject,
  setLoading,
  setError,
  addProject,
  updateProject,
  deleteProject,
} from '../features/projects/projectsSlice';
import { Project } from '../types/project';

export const useProjects = () => {
  const dispatch = useDispatch();

  const { projects, loading, error, selectedProject } = useSelector(
    (state: RootState) => state.projects
  );

  return {
    projects,
    loading,
    error,
    selectedProject,

    selectProject: (id: string) => dispatch(selectProject(id)),
    setLoading: (loading: boolean) => dispatch(setLoading(loading)),
    clearError: () => dispatch(setError(null)),

    addProject: (project: Omit<Project, 'id'>) => dispatch(addProject(project as Project)),
    updateProject: (project: Project) => dispatch(updateProject(project)),
    deleteProject: (id: string) => dispatch(deleteProject(id)),
  };
};

export default useProjects;
