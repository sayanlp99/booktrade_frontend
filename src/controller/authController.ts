
import { sendEmailOtp, verifyEmailOtp, registerUser } from '../services/authService';
import { User, OtpVerification, RegisterResponse } from '../models/auth';

export const handleEmailVerification = async (email: string): Promise<RegisterResponse> => {
  try {
    return await sendEmailOtp(email);
  } catch (error) {
    console.error('Error sending email OTP:', error);
    return { success: false, message: 'Error sending OTP' };
  }
};

export const handleOtpVerification = async (data: OtpVerification): Promise<RegisterResponse> => {
  try {
    return await verifyEmailOtp(data);
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return { success: false, message: 'Error verifying OTP' };
  }
};

export const handleUserRegistration = async (userData: User): Promise<RegisterResponse> => {
  try {
    return await registerUser(userData);
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, message: 'Error registering user' };
  }
};
