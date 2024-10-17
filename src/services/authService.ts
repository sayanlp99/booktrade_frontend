// services/authService.ts

import { User, OtpVerification, RegisterResponse } from '../models/auth';

const BASE_URL = 'http://your-api-url.com/api'; // Replace with your API's base URL

export const sendEmailOtp = async (email: string): Promise<RegisterResponse> => {
  const response = await fetch(`${BASE_URL}/auth/sendEmailOtp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  return response.json();
};

export const verifyEmailOtp = async (data: OtpVerification): Promise<RegisterResponse> => {
  const response = await fetch(`${BASE_URL}/auth/verifyEmailOtp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const registerUser = async (userData: User): Promise<RegisterResponse> => {
  const response = await fetch(`${BASE_URL}/auth/registerUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};
