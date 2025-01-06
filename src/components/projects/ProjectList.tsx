import React, { useEffect } from 'react';
import { Table, Button, Space, message, Popconfirm, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { Project } from '../../types/project';
import dayjs from 'dayjs';
import useFavouriteProjects from '@/hooks/useFavouriteProjects';

export const ProjectList: React.FC = () => {
  const navigate = useNavigate();
  const { projects, loading, error, deleteProject, selectProject } = useProjects();
  const { toggleFavouriteProject, favoriteProjects } = useFavouriteProjects();

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleEdit = (projectId: string) => {
    selectProject(projectId);
    navigate(`/projects/${projectId}/edit`);
  };

  const handleDelete = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      message.success('Project deleted successfully');
    } catch (error) {
      message.error('Failed to delete project');
    }
  };

  const columns: ColumnsType<Project> = [
    {
      title: 'Project ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      render: (startDate: string) => {
        return <span>{dayjs(startDate).format('MMMM D, YYYY')}</span>;
      },
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
      render: (endDate: string) => {
        return <span>{dayjs(endDate).format('MMMM D, YYYY')}</span>;
      },
    },
    {
      title: 'Project Manager',
      dataIndex: 'projectManager',
      key: 'projectManager',
      sorter: (a, b) => a.projectManager.localeCompare(b.projectManager),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {favoriteProjects.find((fav) => fav.id === record.id) ? (
            <Tooltip title="Remove from Favourites">
              <HeartFilled onClick={() => toggleFavouriteProject(record)} />
            </Tooltip>
          ) : (
            <Tooltip title="Add to Favourites">
              <HeartOutlined onClick={() => toggleFavouriteProject(record)} />
            </Tooltip>
          )}
          <Button
            type="primary"
            className="ml-3"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this project?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => navigate('/projects/new')}>
          Add New Project
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={projects}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} projects`,
        }}
      />
    </div>
  );
};
