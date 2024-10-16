import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <Button label="Logout" onClick={handleLogout} />
    </div>
  );
};

export default HomePage;
