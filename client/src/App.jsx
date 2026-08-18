import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

// Import Pages & Portals
import Login from './pages/auth/Login';
import CustomerHome from './pages/customer/CustomerHome';
import CategoriesPage from './pages/customer/CategoriesPage';
import AboutUsPage from './pages/customer/AboutUsPage';
import ContactPage from './pages/customer/ContactPage';

// Import New Customer Drawer Pages
import Profile from './pages/customer/Profile';
import Address from './pages/customer/Address';
import Orders from './pages/customer/Orders';
import Language from './pages/customer/Language';
import Chat from './pages/customer/Chat';

// Import Admin Dashboard & Sub-pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminZonesPage from './pages/admin/AdminZonesPage';
import AdminRestaurantsPage from './pages/admin/AdminRestaurantsPage';
import AdminAddRestaurantPage from './pages/admin/AdminAddRestaurantPage';
import AdminMainCategoriesPage from './pages/admin/AdminMainCategoriesPage';
import AdminFoodCatalogPage from './pages/admin/AdminFoodCatalogPage';
import AdminAddonsPage from './pages/admin/AdminAddonsPage';
import AdminDeliverymanPage from './pages/admin/AdminDeliverymanPage';
import AdminEmployeesPage from './pages/admin/AdminEmployeesPage';
import AdminCustomersPage from './pages/admin/AdminCustomersPage';
import AdminSupportPage from './pages/admin/AdminSupportPage';

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
            <Route path="/contact" element={<ContactPage />} />

            {/* Customer Menu Drawer Routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/address" element={<Address />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/language" element={<Language />} />
            <Route path="/chat" element={<Chat />} />

            {/* Staff Portals */}
            <Route path="/chef/*" element={<ChefDashboard />} />
            <Route path="/waiter/*" element={<WaiterDashboard />} />
            <Route path="/driver/*" element={<DriverDashboard />} />

            {/* Admin Portal & Nested Routes matching the Sidebar */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/zones" element={<AdminZonesPage />} />
            <Route path="/admin/restaurants/list" element={<AdminRestaurantsPage />} />
            <Route path="/admin/restaurants/add" element={<AdminAddRestaurantPage />} />
            <Route path="/admin/food/categories" element={<AdminMainCategoriesPage />} />
            <Route path="/admin/food/items" element={<AdminFoodCatalogPage />} />
            <Route path="/admin/food/addons" element={<AdminAddonsPage />} />
            <Route path="/admin/delivery/list" element={<AdminDeliverymanPage />} />
            <Route path="/admin/employees/list" element={<AdminEmployeesPage />} />
            <Route path="/admin/customers" element={<AdminCustomersPage />} />
            <Route path="/admin/support/messages" element={<AdminSupportPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;