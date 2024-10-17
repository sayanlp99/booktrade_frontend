import axios from 'axios';

export const sendEmailOtp = async (email: string): Promise<string> => {
  const response = await axios.post('http://127.0.0.1:8000/api/auth/sendEmailOtp', { email });
  return response.data.uuid; // Returns UUID
};

export const verifyOtp = async (uuid: string | null, otp: number | undefined): Promise<void> => {
  await axios.post('http://127.0.0.1:8000/api/auth/verifyEmailOtp', { uuid, otp });
};

export const registerUser = async (userData: {
  uuid: string | null;
  username: string;
  email: string;
  password: string;
  reading_preferences: string;
  favorite_genres: string;
  full_name: string;
}): Promise<void> => {
  await axios.post('http://127.0.0.1:8000/api/auth/registerUser', userData);
};
