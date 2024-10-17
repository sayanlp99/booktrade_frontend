export interface User {
    username: string;
    email: string;
    password: string;
  }
  
  export interface OtpVerification {
    uuid: string;
    otp: string;
  }
  
  export interface RegisterResponse {
    success: boolean;
    message: string;
    data?: any;
  }
  