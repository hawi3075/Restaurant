import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      console.log('AuthContext: Attempting login for', email);
      const response = await API.post('/auth/login', { email, password });
      console.log('AuthContext: Login response:', response.data);
      
      const { token: newToken, user: userData } = response.data;
      
      if (!newToken || !userData) {
        console.error('AuthContext: Invalid response format', response.data);
        return { 
          success: false, 
          error: 'Invalid response from server' 
        };
      }
      
      console.log('AuthContext: Storing token and user:', userData);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
      
      console.log('AuthContext: Login successful, role:', userData.role);
      return { success: true, role: userData.role };
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      console.error('AuthContext: Error response:', error.response?.data);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed. Please check your credentials.' 
      };
    }
  };

  const register = async (formData) => {
    try {
      const response = await API.post('/auth/register', formData);
      const { token: newToken, user: userData } = response.data;
      
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
      return { success: true, role: userData.role };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);