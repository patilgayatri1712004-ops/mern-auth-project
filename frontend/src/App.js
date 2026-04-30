import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Tabs } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import './App.css';

const { Title, Text } = Typography;

function App() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  const onFinish = async (values) => {
    setLoading(true);
    const isLogin = activeTab === '1';

    const url = isLogin
      ? 'http://localhost:5000/api/signin'
      : 'http://localhost:5000/api/signup';

    try {
      const res = await axios.post(url, values);
      message.success(res.data.message);
    } catch (err) {
      message.error(err.response?.data?.error || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <div style={{ textAlign: 'center' }}>
          <Title level={2}>KIT's IMER</Title>
          <Text>MCA Department Auth System</Text>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          items={[
            { label: 'Sign In', key: '1' },
            { label: 'Sign Up', key: '2' }
          ]}
        />

        <Form onFinish={onFinish} layout="vertical">

          {activeTab === '2' && (
            <>
              <Form.Item name="firstName" rules={[{ required: true }]}>
                <Input prefix={<UserOutlined />} placeholder="First Name" />
              </Form.Item>

              <Form.Item name="lastName" rules={[{ required: true }]}>
                <Input prefix={<UserOutlined />} placeholder="Last Name" />
              </Form.Item>
            </>
          )}

          <Form.Item name="email" rules={[{ required: true }]}>
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            {activeTab === '1' ? 'Login' : 'Register'}
          </Button>

        </Form>
      </Card>
    </div>
  );
}

export default App;