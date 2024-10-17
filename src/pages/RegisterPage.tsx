import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { FloatLabel } from 'primereact/floatlabel';
import { InputOtp } from 'primereact/inputotp';
import loginImage from '../assets/images/banner.svg';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState('emailVerification'); // "emailVerification" | "otpVerification" | "registration"
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<number>();
  const [uuid, setUuid] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [reading_preferences, setReadingPreference] = useState('');
  const [favorite_genres, setFavouriteGenre] = useState('');
  const [full_name, setFullName] = useState('');

  // API Endpoints
  const sendEmailOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:8000/api/auth/sendEmailOtp', {
        email
      });
      setUuid(response.data.uuid); // Save the UUID for further requests
      setStep('otpVerification'); // Move to the OTP verification step
      setLoading(false);
    } catch (error) {
      console.error('Error sending OTP:', error);
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      await axios.post('http://127.0.0.1:8000/api/auth/verifyEmailOtp', {
        uuid,
        otp
      });
      setStep('registration'); // Move to the registration step after successful OTP
      setLoading(false);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      setLoading(true);
      await axios.post('http://127.0.0.1:8000/api/auth/registerUser', {
        uuid,
        username,
        email,
        password,
        reading_preferences,
        favorite_genres,
        full_name
      });
      alert('Signup successful!');
      setLoading(false);
    } catch (error) {
      console.error('Error during signup:', error);
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="card signup-card">
        <img src={loginImage} alt="Login Illustration" className="login-image" />

        {step === 'emailVerification' && (
          <>
            <h2 className="signup-title">Verify Email</h2>
            <form onSubmit={(e) => { e.preventDefault(); sendEmailOtp(); }}>
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
              <Button
                label="Send OTP"
                loading={loading}
                type="submit"
                className="signup-button"
              />
            </form>
          </>
        )}

        {step === 'otpVerification' && (
          <>
            <h2 className="signup-title">Verify OTP</h2>
            <form onSubmit={(e) => { e.preventDefault(); verifyOtp(); }}>
              <div className="input-group">
                <InputOtp
                  value={otp}
                  onChange={(e) =>{ setOtp(Number(e.value)); console.log(e.value);}}
                  integerOnly
                  length={6}
                />
              </div>
              <Button
                label="Verify OTP"
                loading={loading}
                type="submit"
                className="signup-button"
              />
            </form>
          </>
        )}

        {step === 'registration' && (
          <>
            <h2 className="signup-title">Register</h2>
            <form onSubmit={handleSignup}>
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
              autoFocus
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
              autoFocus
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
