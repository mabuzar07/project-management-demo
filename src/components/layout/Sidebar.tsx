import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import styled from '@emotion/styled';
import { Button, Layout, Menu, theme, Tooltip } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, HeartOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const SidebarContainer = styled.aside<{ collapsed: boolean }>`
  width: ${(props) => (props.collapsed ? '80px' : '250px')};
  background-color: #f5f5f5;
  padding: 2rem;
  transition: width 0.3s;
  @media (max-width: 768px) {
    width: ${(props) => (props.collapsed ? '60px' : '200px')};
  }
`;

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);
  const favoriteProjects = useSelector(
    (state: RootState) => state.favoriteProjects.favoriteProjects
  );

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <SidebarContainer collapsed={collapsed}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16, marginLeft: -12 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      {collapsed ? (
        <Tooltip title="Favorite Projects" placement="right">
          <HeartOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />
        </Tooltip>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Favorite Projects</h2>
          <ol className="pl-6 pb-4 list-none">
            {favoriteProjects.map((project) => (
              <li
                key={project.id}
                className="mb-2 p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors relative before:content-['•'] before:absolute before:-left-4 before:text-gray-800"
              >
                <Link to={'#'} className="text-gray-800 font-semibold hover:text-blue-500">
                  {project.name}
                </Link>
              </li>
            ))}
          </ol>
        </>
      )}
    </SidebarContainer>
  );
};
