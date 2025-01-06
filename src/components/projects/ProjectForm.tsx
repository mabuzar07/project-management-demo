import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, DatePicker, Button, message, Row, Col } from 'antd';
import { useProjects } from '@/hooks/useProjects';
import { Project } from '@/types/project';

export const ProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, addProject, updateProject } = useProjects();
  const project = id && projects.find((p) => p.id === id);
  const navigate = useNavigate();
  const initialValues: Project = id
    ? (project as Project)
    : {
        id: '',
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        projectManager: '',
      };

  return (
    <Row>
      <Col span={12}>
        <Form
          initialValues={initialValues}
          onFinish={(values) => {
            if (initialValues?.id) {
              updateProject({ ...project, ...values });
            } else {
              const projectId = values.name.toLowerCase().replace(/\s+/g, '_');
              const updatedValues = { ...values, id: projectId };
              addProject({ ...project, ...updatedValues });
            }
            message.success(`Project ${id ? 'updated' : 'added'} successfully!`);
            navigate('/');
          }}
          layout="vertical"
        >
          <Col span={8}>
            <Form.Item label="Project ID" name="id">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Project Name"
              name="name"
              rules={[{ required: true, message: 'Please input project name!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input project description!' }]}
          >
            <Input.TextArea rows={10} />
          </Form.Item>
          <Col span={8}>
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: 'Please select start date!' }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="End Date"
              name="endDate"
              rules={[{ required: true, message: 'Please select end date!' }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Project Manager"
              name="projectManager"
              rules={[{ required: true, message: 'Please input project manager!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
