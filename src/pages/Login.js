import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const { loginWithEmail, loginWithGoogle, setupRecaptcha, loginWithPhone } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    otp: ''
  });
  const [error, setError] = useState('');
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill all fields');
      return;
    }
    try {
      setError('');
      await loginWithEmail(formData.email, formData.password);
      navigate('/dashboard');
    } catch {
      setError('Failed to log in');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      await loginWithGoogle();
      navigate('/dashboard');
    } catch {
      setError('Failed to log in with Google');
    }
  };

  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    setupRecaptcha('recaptcha-container');
    const appVerifier = window.recaptchaVerifier;
    try {
      setError('');
      const confirmationResult = await loginWithPhone(formData.phone, appVerifier);
      window.confirmationResult = confirmationResult;
      setIsPhoneLogin(true);
    } catch (error) {
      setError('Failed to send OTP');
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const confirmationResult = window.confirmationResult;
    try {
      setError('');
      await confirmationResult.confirm(formData.otp);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to verify OTP');
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      {!isPhoneLogin ? (
        <>
          <Form onSubmit={handleEmailLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login with Email
            </Button>
          </Form>
          <Button variant="primary" onClick={handleGoogleLogin}>
            Login with Google
          </Button>
          <Form onSubmit={handlePhoneLogin}>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send OTP
            </Button>
          </Form>
          <div id="recaptcha-container"></div>
        </>
      ) : (
        <Form onSubmit={handleOtpVerification}>
          <Form.Group className="mb-3" controlId="formBasicOtp">
            <Form.Label>OTP</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Verify OTP
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default Login;

