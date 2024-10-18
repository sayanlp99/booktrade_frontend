// views/RegisterPage.tsx
import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { FloatLabel } from 'primereact/floatlabel';
import { InputOtp } from 'primereact/inputotp';
import { Toast } from 'primereact/toast';
import loginImage from '../assets/images/banner.svg';
import './main.css';
import { useRegisterController } from '../controller/Register';

const RegisterPage: React.FC = () => {
  const {
    step,
    email,
    otp,
    username,
    password,
    confirmPassword,
    reading_preferences,
    favorite_genres,
    full_name,
    loading,
    setEmail,
    setOtp,
    setUsername,
    setPassword,
    setConfirmPassword,
    setReadingPreference,
    setFavouriteGenre,
    setFullName,
    handleSendOtp,
    handleVerifyOtp,
    handleRegister,
    toast,
  } = useRegisterController();

  return (
    <div className="signup-container">
      <Toast ref={toast} />
      <div className="card signup-card">
        <img src={loginImage} alt="Login Illustration" className="login-image" />

        {step === 'emailVerification' && (
          <>
            <h2 className="signup-title">Verify Email</h2>
            <form className='signup-form' onSubmit={(e) => { e.preventDefault(); handleSendOtp(); }}>
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
            </form>
          </>
        )}

        {step === 'otpVerification' && (
          <>
            <h2 className="signup-title">Verify OTP</h2>
            <form className='signup-form' onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }}>
            <div className="input-group">
                <InputOtp value={otp} onChange={(e) => setOtp(Number(e.value))} integerOnly length={6}/>
              </div>

              <Button
                label="Verify"
                loading={loading}
                type="submit"
                className="verify-button"
              />
            </form>
          </>
        )}

        {step === 'registration' && (
          <>
            <h2 className="signup-title">Register</h2>
            <form className='signup-form' onSubmit={(e) => { e.preventDefault(); handleRegister(); }} >
              <FloatLabel>
                <InputText
                  id="full_name"
                  className="bg-white-100 w-full"
                  value={full_name}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <label htmlFor="full_name">Full Name</label>
              </FloatLabel>
              <FloatLabel>
                <InputText
                  id="username"
                  className="bg-white-100 w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label htmlFor="username">Username</label>
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
                  inputClassName="w-full"
                  className="bg-white-100 w-full"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  toggleMask
                  pt={{ iconField: { root: { className: 'w-full' } } }}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </FloatLabel>
              <FloatLabel>
                <InputText
                  id="reading_preference"
                  className="bg-white-100 w-full"
                  value={reading_preferences}
                  onChange={(e) => setReadingPreference(e.target.value)}
                  required
                />
                <label htmlFor="reading_preference">Reading Preference</label>
              </FloatLabel>
              <FloatLabel>
                <InputText
                  id="favourite_genre"
                  className="bg-white-100 w-full"
                  value={favorite_genres}
                  onChange={(e) => setFavouriteGenre(e.target.value)}
                  required
                />
                <label htmlFor="favourite_genre">Favourite Genre</label>
              </FloatLabel>
              <Button
                label="Register"
                icon="pi pi-user-plus"
                loading={loading}
                type="submit"
                className="signup-button"
              />
            </form>
          </>
        )}

        <div className="signup-links">
          <a href="/login" className="login-link">Already have an account? Log in</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
