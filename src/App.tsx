import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import OtpVerifyPage from './pages/OtpVerifyPage';
import VerifyForgotPasswordEmailPage from './pages/VerifyForgotPasswordEmailPage';
import OtpForgotPasswordVerifyPage from './pages/OtpForgotPasswordVerifyPage';
import SetNewPasswordPage from './pages/SetNewPasswordPage';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('isAuthenticated')
  );

  const handleLogin = (token: string) => {
    localStorage.setItem('isAuthenticated', token);
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/verifyEmail" element={<VerifyEmailPage />}/>
        <Route path="/otpVerify" element={<OtpVerifyPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verifyForgotPasswordEmail" element={<VerifyForgotPasswordEmailPage />}/>
        <Route path="/otpForgotPasswordVerify" element={<OtpForgotPasswordVerifyPage />} />
        <Route path="/setNewPassword" element={<SetNewPasswordPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
