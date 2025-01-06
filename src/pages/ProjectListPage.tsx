import { Layout } from '@/components/layout/Layout';
import { ProjectList } from '@/components/projects/ProjectList';
import React from 'react';

const ProjectListPage: React.FC = () => {
  return (
    <Layout>
      <ProjectList />
    </Layout>
  );
};

export default ProjectListPage;
