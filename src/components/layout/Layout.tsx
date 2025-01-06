import React from 'react';
import styled from '@emotion/styled';
import { Sidebar } from './Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LayoutContainer>
    <Sidebar />
    <MainContent>{children}</MainContent>
  </LayoutContainer>
);
