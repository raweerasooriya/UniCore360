// src/pages/OAuth2Redirect.js
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function OAuth2Redirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // Store token in localStorage
      localStorage.setItem('token', token);

      // Decode token to get role
      const decoded = jwt_decode(token);
      const role = decoded.role; // 'ADMIN', 'TECHNICIAN', or 'USER'

      // Redirect based on role
      if (role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else if (role === 'TECHNICIAN') {
        navigate('/technician/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } else {
      // No token – go to login page
      navigate('/login');
    }
  }, [location, navigate]);

  return <div>Logging you in...</div>;
}

export default OAuth2Redirect;