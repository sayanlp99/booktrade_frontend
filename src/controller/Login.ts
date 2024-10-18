import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { loginService } from '../services/Login';

export const useLoginController = (username: string, password: string) => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('user');

  if (isAuthenticated !== "null") {
    navigate("/", { replace: true });
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await loginService(username, password);
      await login({ username, token });
    } catch (error) {
      console.error('Error during login:', error);
      alert('Invalid credentials or an error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleLogin };
};
