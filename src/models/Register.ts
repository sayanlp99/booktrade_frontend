
export interface RegisterModel {
  email: string;
  otp?: number;
  uuid?: string | null;
  username: string;
  password: string;
  confirmPassword: string;
  reading_preferences: string;
  favorite_genres: string;
  full_name: string;
}
