import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignUp = () => {
  const { signupWithEmail, loginWithGoogle, setupRecaptcha, loginWithPhone } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phone: '',
    password: '',
    otp: ''
  });
  const [error, setError] = useState('');
  const [isPhoneSignup, setIsPhoneSignup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.username || !formData.phone || !formData.password) {
      setError('Please fill all fields');
      return;
    }
    try {
      setError('');
      await signupWithEmail(formData.email, formData.password);
      navigate('/dashboard');
    } catch {
      setError('Failed to sign up');
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setError('');
      await loginWithGoogle();
      navigate('/dashboard');
    } catch {
      setError('Failed to sign up with Google');
    }
  };

  const handlePhoneSignup = async (e) => {
    e.preventDefault();
    setupRecaptcha('recaptcha-container-signup');
    const appVerifier = window.recaptchaVerifier;
    try {
      setError('');
      const confirmationResult = await loginWithPhone(formData.phone, appVerifier);
      window.confirmationResult = confirmationResult;
      setIsPhoneSignup(true);
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
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      {!isPhoneSignup ? (
        <>
          <Form onSubmit={handleEmailSignUp}>
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
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
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
              Sign Up with Email
            </Button>
          </Form>
          <Button variant="primary" onClick={handleGoogleSignUp}>
            Sign Up with Google
          </Button>
          <Form onSubmit={handlePhoneSignup}>
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
          <div id="recaptcha-container-signup"></div>
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

export default SignUp;
