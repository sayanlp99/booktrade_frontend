import axios from "axios";
import { API_URL } from "../utils/url";

export const ForgotPasswordService = {
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