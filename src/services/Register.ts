import axios from 'axios';
import { API_URL } from '../utils/url';

export const sendEmailOtp = async (email: string): Promise<string> => {
  const response = await axios.post(`${API_URL}/api/auth/sendEmailOtp`, { email });
  return response.data.uuid;
};

export const verifyOtp = async (uuid: string | null, otp: number | undefined): Promise<void> => {
  await axios.post(`${API_URL}/api/auth/verifyEmailOtp`, { uuid, otp });
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
  await axios.post(`${API_URL}/api/auth/registerUser`, userData);
};
