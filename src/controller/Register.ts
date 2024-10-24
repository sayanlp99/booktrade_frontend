import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendEmailOtp, verifyOtp, registerUser } from '../services/Register';

export const useRegisterController = () => {
  const [step, setStep] = useState<'emailVerification' | 'otpVerification' | 'registration'>('emailVerification');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<number>();
  const [uuid, setUuid] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [reading_preferences, setReadingPreference] = useState('');
  const [favorite_genres, setFavouriteGenre] = useState('');
  const [full_name, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const responseUuid = await sendEmailOtp(email);
      setUuid(responseUuid);
      setStep('otpVerification');
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      await verifyOtp(uuid, otp);
      setStep('registration');
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();


  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      await registerUser({
        uuid,
        username,
        email,
        password,
        reading_preferences,
        favorite_genres,
        full_name,
      });
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error during signup:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    email,
    otp,
    uuid,
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
  };
};
