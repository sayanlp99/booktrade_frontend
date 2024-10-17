import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { InputOtp } from 'primereact/inputotp';
import { FloatLabel } from 'primereact/floatlabel';
import loginImage from '../assets/images/banner.svg';
import axios from 'axios';
import { API_URL } from '../utils/url';

// Model
interface ForgotPasswordModel {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

// Controller: Service to handle API calls
const ForgotPasswordService = {
  sendEmailOtp: async (email: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/forgetPasswordOtp`, { email });
      return response.data;
    } catch (error) {
      throw new Error('Failed to send OTP');
    }
  },
  verifyOtpAndChangePassword: async (uuid: string, otp: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/forgetPasswordChangePassword`, { uuid, otp, password });
      return response.data;
    } catch (error) {
      throw new Error('Failed to verify OTP or change password');
    }
  }
};

// View: Main component
const ForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Password
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ForgotPasswordModel>({ email: '', otp: '', password: '', confirmPassword: '' });
  const [uuid, setUuid] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await ForgotPasswordService.sendEmailOtp(form.email);
      setUuid(response.uuid); // Assuming UUID is returned after email OTP is sent
      setStep(2); // Move to OTP step
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Move to password step after OTP verification
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      if (uuid) {
        await ForgotPasswordService.verifyOtpAndChangePassword(uuid, form.otp, form.password);
        alert('Password changed successfully!');
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <img src={loginImage} alt="Login Illustration" className="login-image" />
        {step === 1 && (
          <>
            <h2 className="login-title">Verify Email</h2>
            <form onSubmit={handleEmailSubmit} className="login-form">
              <FloatLabel className="input-group">
                <label htmlFor="email">Email</label>
                <InputText
                  id="email"
                  placeholder="Enter your Email"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                  autoFocus
                />
              </FloatLabel>
              <Button label="Send OTP" loading={loading} type="submit" className="verify-button" />
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="login-title">Verify OTP</h2>
            <form onSubmit={handleOtpSubmit} className="login-form">
              <div className="input-group">
                <InputOtp value={form.otp} onChange={(e) => setForm({ ...form, otp: String(e.value) })} integerOnly length={6} />
              </div>
              <Button label="Verify OTP" loading={loading} type="submit" className="verify-button" />
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="login-title">Set New Password</h2>
            <form onSubmit={handlePasswordSubmit} className="login-form">
              <FloatLabel>
                <Password
                  id="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  placeholder="Password"
                  toggleMask
                  inputClassName="w-full"
                  className="bg-white-100 w-full"
                  pt={{ iconField: { root: { className: 'w-full' } } }}
                />
                <label htmlFor="password">New Password</label>
              </FloatLabel>
              <FloatLabel>
                <Password
                  id="confirmPassword"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  required
                  placeholder="Confirm Password"
                  toggleMask
                  inputClassName="w-full"
                  className="bg-white-100 w-full"
                  pt={{ iconField: { root: { className: 'w-full' } } }}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </FloatLabel>
              <Button label="Update Password" loading={loading} type="submit" className="verify-button" />
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
