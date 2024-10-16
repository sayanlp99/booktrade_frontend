import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { FloatLabel } from 'primereact/floatlabel';
import loginImage from '../assets/images/banner.svg';
import { InputOtp } from 'primereact/inputotp';

const OtpVerifyPage: React.FC = () => {
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
            </form>
          </div>
        </div>
      );
};

export default OtpVerifyPage;