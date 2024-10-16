import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { FloatLabel } from 'primereact/floatlabel';
import './LoginPage.css';
import loginImage from '../assets/images/banner.svg';

interface LoginPageProps {
  onLogin: (token: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (username === 'user' && password === 'password') {
        onLogin('valid-token');
      } else {
        alert('Invalid credentials');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="card login-card">
       <img src={loginImage} alt="Login Illustration" className="login-image" /> 
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <FloatLabel className="input-group">
            <label htmlFor="username">Username</label>
            <InputText
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </FloatLabel>
          <FloatLabel className="input-group">
          <Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputClassName="w-full"
            className="bg-white-100 w-full"
            toggleMask
            pt={{ iconField: { root: { className: 'w-full' } } }}
        />
            <label htmlFor="password">Password</label>
          </FloatLabel>
          <Button
            label="Login"
            icon="pi pi-sign-in"
            loading={loading}
            type="submit"
            className="login-button"
          />
        </form>
        <div className="login-links">
            <a href="/verifyEmail" className="register">Register</a>
            <a href="/verifyForgotPasswordEmail" className="forgot-password">Forgot Password?</a>
          </div>
      </div>
    </div>
  );
};

export default LoginPage;
