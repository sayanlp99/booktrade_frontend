import axios from 'axios';
import { API_URL } from '../utils/url';
import { LoginRequest, LoginResponse } from '../models/Login';

export const loginService = async (username: string, password: string): Promise<string> => {
  try {
    const requestBody: LoginRequest = { username, password };
    
    const response = await axios.post<LoginResponse>(`${API_URL}/api/auth/login`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data.token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error during login:', error.response?.data);
    } else {
      console.error('Unexpected error during login:', error);
    }
    throw new Error('Login failed');
  }
};
