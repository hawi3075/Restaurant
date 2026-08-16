import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

// Import Pages & Portals
import Login from './pages/auth/Login';
import CustomerHome from './pages/customer/CustomerHome';
import CategoriesPage from './pages/customer/CategoriesPage';
import AboutUsPage from './pages/customer/AboutUsPage';
import ContactPage from './pages/customer/ContactPage'; // Added Contact Page
import AdminDashboard from './pages/admin/AdminDashboard';
import ChefDashboard from './pages/chef/ChefDashboard';
import WaiterDashboard from './pages/waiter/WaiterDashboard';
import DriverDashboard from './pages/driver/DriverDashboard';

// Placeholder Register Screen if needed
const RegisterPlaceholder = () => <div className="p-8 text-2xl font-bold">Register Screen</div>;

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <Routes>
            {/* Public Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPlaceholder />} />

            {/* Customer Portal & Pages */}
            <Route path="/" element={<CustomerHome />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} /> {/* Added Contact Route */}

            {/* Staff & Admin Portals */}
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/chef/*" element={<ChefDashboard />} />
            <Route path="/waiter/*" element={<WaiterDashboard />} />
            <Route path="/driver/*" element={<DriverDashboard />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;