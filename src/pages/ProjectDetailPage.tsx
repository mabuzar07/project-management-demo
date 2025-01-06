import React from 'react';
import { ProjectForm } from '../components/projects/ProjectForm';
import { Layout } from '../components/layout/Layout';

const ProjectDetailPage = ({ title }: { title: string }) => {
  return (
    <Layout>
      <h1>{title}</h1>
      <ProjectForm />
    </Layout>
  );
};

export default ProjectDetailPage;
