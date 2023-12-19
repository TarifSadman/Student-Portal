// src/components/Dash.js
import React, { useState } from 'react';
import { Layout, Card, Button, Modal, Affix, Menu, Dropdown, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  AppstoreAddOutlined,
  CloseOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';

import 'antd/dist/reset.css';

const { Header, Content, Footer } = Layout;

const Dash = () => {
  const history = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [appliedCourses, setAppliedCourses] = useState([
    { id: 1, name: 'Mathematics', instructor: 'Dr. Smith', progress: 70 },
    { id: 2, name: 'History', instructor: 'Prof. Johnson', progress: 40 },
    { id: 3, name: 'Computer Science', instructor: 'Dr. Williams', progress: 90 },
  ]);

  const showAddCoursesModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    history('/');
    console.log('Logout clicked');
  };

  const handleAddCourse = (newCourse) => {
    const uniqueId = Date.now();
    console.log(newCourse);
    const updatedCourse = { ...newCourse, id: uniqueId, progress: 0 };
    setAppliedCourses((prevCourses) => [...prevCourses, updatedCourse]);
    setIsModalVisible(false);
  };

  const availableCourses = [
    { id: 4, name: 'Physics', instructor: 'Dr. Davis' },
    { id: 5, name: 'Chemistry', instructor: 'Prof. Turner' },
    { id: 6, name: 'Biology', instructor: 'Dr. Miller' },
  ];

  const profileMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Header style={{ background: '#2d4e66', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo" style={{ color: '#fff', fontSize: '24px' }}>
          Student Dashboard
        </div>
        <Dropdown overlay={profileMenu} placement="bottomRight" arrow>
          <Button type="link" style={{ color: '#fff' }}>
            <Avatar icon={<UserOutlined />} style={{ marginRight: '8px' }} />
            Demo Student
          </Button>
        </Dropdown>
      </Header>

      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        <div style={{ background: '#fff', padding: '24px', minHeight: '80vh', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '24px', color: '#2d4e66' }}>
            My Courses
          </h1>

          <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {appliedCourses.map(course => (
              <Card key={course.id} title={course.name} style={{ width: '300px', margin: '16px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <p style={{ marginBottom: '8px', color: '#555' }}>Instructor: {course.instructor}</p>
                <p style={{ color: '#555' }}>Progress: {course.progress}%</p>
              </Card>
            ))}
          </div>

          <Modal
            title="Available Courses"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" onClick={handleCancel} icon={<CloseOutlined />}>
                Cancel
              </Button>,
            ]}
          >
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
              {availableCourses.map(course => (
                <Card
                  key={course.id}
                  title={course.name}
                  extra={<Button type="primary" onClick={() => handleAddCourse(course)}>Add</Button>}
                  style={{ width: '300px', margin: '16px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                >
                  <p style={{ marginBottom: '8px', color: '#555' }}>Instructor: {course.instructor}</p>
                </Card>
              ))}
            </div>
          </Modal>
        </div>
      </Content>
      <Affix offsetBottom={24} offsetRight={24}>
  <Button type="primary" shape="circle" icon={<AppstoreAddOutlined />} size="large" onClick={showAddCoursesModal} style={{ fontSize: '24px', width: '56px', height: '56px', marginBottom: '16px', marginLeft: '16px', marginRight: '16px' }} />
</Affix>


      <Footer style={{ textAlign: 'center', background: '#2d4e66', color: '#fff', borderTop: '1px solid #e8e8e8' }}>
        Student Portal @2023 created by Tarif Sadman
      </Footer>
    </Layout>
  );
};

export default Dash;
