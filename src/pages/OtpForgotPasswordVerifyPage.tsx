import React, { useState } from 'react';
import { Button } from 'primereact/button';
import loginImage from '../assets/images/banner.svg';
import { InputOtp } from 'primereact/inputotp';

const OtpForgotPasswordVerifyPage: React.FC = () => {
    const [otp, setOtp] = useState<number>();
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
            <h2 className="login-title">Verify OTP</h2>
            <form onSubmit={handleEmailVerification} className="login-form">
              <div className="input-group">
                <InputOtp value={otp} onChange={(e) => setOtp(otp)} integerOnly length={6}/>
              </div>

              <Button
                label="Verify"
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

export default OtpForgotPasswordVerifyPage;