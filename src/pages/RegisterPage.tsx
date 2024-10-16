import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { FloatLabel } from 'primereact/floatlabel';
import './RegisterPage.css';
import loginImage from '../assets/images/banner.svg';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
      } else {
        alert("Signup successful!");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="signup-container">
      <div className="card signup-card">
      <img src={loginImage} alt="Login Illustration" className="login-image" /> 
        <h2 className="signup-title">Register</h2>
        <form onSubmit={handleSignup} className="signup-form">
          <FloatLabel>
            <InputText
              id="username"
              className="bg-white-100 w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
            <label htmlFor="username">Username</label>
          </FloatLabel>

          <FloatLabel>
            <InputText
              id="email"
              className="bg-white-100 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
          </FloatLabel>

          <FloatLabel>
            <Password
              inputClassName="w-full"
              className="bg-white-100 w-full"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              toggleMask
              pt={{ iconField: { root: { className: 'w-full' } } }}
            />
            <label htmlFor="password">Password</label>
          </FloatLabel>

          <FloatLabel>
            <Password
              id="confirmPassword"
              inputClassName="w-full"
              className="bg-white-100 w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              toggleMask
              pt={{ iconField: { root: { className: 'w-full' } } }}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </FloatLabel>

          <Button
            label="Sign Up"
            icon="pi pi-user-plus"
            loading={loading}
            type="submit"
            className="signup-button"
          />
        </form>

        <div className="signup-links">
          <a href="/login" className="login-link">Already have an account? Log in</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
