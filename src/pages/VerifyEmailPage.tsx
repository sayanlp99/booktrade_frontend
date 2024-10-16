import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import loginImage from '../assets/images/banner.svg';

const VerifyEmailPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailVerification = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      };

    return (
        <div className="login-container">
          <div className="card login-card">
           <img src={loginImage} alt="Login Illustration" className="login-image" /> 
            <h2 className="login-title">Verify Email</h2>
            <form onSubmit={handleEmailVerification} className="login-form">
              <FloatLabel className="input-group">
                <label htmlFor="email">Email</label>
                <InputText
                  id="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </FloatLabel>
              <Button
                label="Send OTP"
                loading={loading}
                type="submit"
                className="verify-button"
              />
              <div className="signup-links">
                <a href="/login" className="login-link">Already have an account? Log in</a>
            </div>
            </form>
          </div>
        </div>
      );
};

export default VerifyEmailPage;