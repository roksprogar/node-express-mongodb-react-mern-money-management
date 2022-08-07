import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../resources/authentication.css';
import axios from 'axios';
import Spinner from '../components/Spinner';

function Register() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      axios.post('/api/users/register', values);
      setLoading(false);
      message.success('Registration Successfull!');
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong!');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-5">
          <div className="lottie">
            <lottie-player
              src="https://assets1.lottiefiles.com/packages/lf20_06a6pf9i.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
        <div className="col-md-5">
          <h1>Register</h1>
          <hr />
          <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already registered? Click here to log in.</Link>
              <Button className="primary" htmlType="submit">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
