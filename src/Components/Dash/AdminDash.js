import React, { useState, useEffect } from 'react';
import { Layout, List, Card, Button, Menu, Dropdown, Avatar, Modal, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import Student1 from "../../studentData/student1.json";
import Student2 from "../../studentData/student2.json";

const { Header, Content } = Layout;
const { Option } = Select;

const AdminDash = () => {
  const history = useNavigate();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddCourseModalVisible, setIsAddCourseModalVisible] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleViewCourses = (student) => {
    setSelectedStudent(student);
    setIsModalVisible(true);
  };

  const handleAddCourse = () => {
    setIsAddCourseModalVisible(true);
  };

  const handleLogout = () => {
    history('/');
    console.log('Logout clicked');
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LoginOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const studentData = [Student1, Student2];

    const loadedStudents = studentData.map((data, index) => ({ id: index + 1, ...data }));

    setStudents(loadedStudents);
  }, []);

  const [availableCourses, setAvailableCourses] = useState([
    { id: 7, name: 'Geography', instructor: 'Prof. Turner' },
    { id: 8, name: 'Art History', instructor: 'Dr. Davis' },
    { id: 9, name: 'Zoology', instructor: 'Prof. Smith' },
    { id: 10, name: 'Botany', instructor: 'Dr. Johnson' },
    { id: 11, name: 'Astronomy', instructor: 'Prof. Anderson' },
    { id: 12, name: 'Rocket Science', instructor: 'Dr. Thomas' },
  ]);

  const handleEnrollCourse = () => {
    if (selectedCourseId && selectedStudent) {
      const selectedCourse = availableCourses.find(course => course.id === selectedCourseId);
  
      if (selectedCourse && !selectedStudent.courses.some(course => course.id === selectedCourse.id)) {
        console.log('Enrolling course:', selectedCourse);
  
        const updatedStudent = {
          ...selectedStudent,
          courses: [...selectedStudent.courses, selectedCourse],
        };
  
        console.log('Updated student:', updatedStudent);
  
        setStudents(prevStudents =>
          prevStudents.map(student =>
            student.id === updatedStudent.id ? updatedStudent : student
          )
        );
        console.log('Updated students:', students);
        setIsAddCourseModalVisible(false);
      } else {
        console.log('Course is already enrolled or selectedCourse not found.');
      }
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Header style={{ background: '#2d4e66', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo" style={{ color: '#fff', fontSize: '24px' }}>
          Admin Dashboard
        </div>
        <Dropdown overlay={profileMenu} placement="bottomRight" arrow>
          <Button type="link" style={{ color: '#fff' }}>
            <Avatar icon={<UserOutlined />} style={{ marginRight: '8px' }} />
            Demo Admin
          </Button>
        </Dropdown>
      </Header>

      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        <div style={{ background: '#fff', padding: '24px', minHeight: '80vh', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '24px', color: '#2d4e66' }}>
            Admin Dashboard - Student List
          </h1>

          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={students}
            renderItem={(student) => (
              <List.Item>
                <Card
                  title={student.name}
                  extra={<Button type="primary" onClick={() => handleViewCourses(student)}>View Courses</Button>}
                  style={{ width: '100%', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                >
                  <p style={{ marginBottom: '8px', color: '#555' }}>Email: {student.contactDetails.email}</p>
                </Card>
              </List.Item>
                )}
              />

        </div>
      </Content>

      <Modal
        title={`Courses Enrolled by ${selectedStudent ? selectedStudent.name : ''}`}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Close
          </Button>,
          <Button key="addCourse" type="primary" onClick={handleAddCourse}>
            Add Course
          </Button>,
        ]}
      >
        {selectedStudent && (
          <div>
            <h3>Courses:</h3>
            <ul>
              {selectedStudent.courses.map((course, index) => (
                <li key={index}>
                  {course.name} - {course.instructor} - {course.progress}%
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>

      <Modal
        title={`Available Courses`}
        visible={isAddCourseModalVisible}
        onCancel={() => setIsAddCourseModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsAddCourseModalVisible(false)}>
            Close
          </Button>,
          <Button key="enroll" type="primary" onClick={handleEnrollCourse}>
            Enroll
          </Button>,
        ]}
      >
        <Select
          placeholder="Select a course"
          onChange={(value) => setSelectedCourseId(value)}
        >
          {availableCourses.map((course) => (
            <Option key={course.id} value={course.id}>
              {course.name}
            </Option>
          ))}
        </Select>
      </Modal>
    </Layout>
  );
};

export default AdminDash;
