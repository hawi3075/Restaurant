import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Utensils, Globe, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2.5">
          <div className="bg-orange-600 text-white p-2 rounded-xl shadow-md">
            <Utensils className="w-5 h-5" />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900">
            ማእድ <span className="text-orange-600 font-medium text-sm">Ma'ad</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 font-medium text-gray-600">
          
          {/* Home Link (Exact Match) */}
          <Link 
            to="/" 
            className={`flex items-center space-x-1 transition ${
              location.pathname === '/' 
                ? 'text-orange-600 font-bold' 
                : 'hover:text-orange-600 font-medium text-gray-600'
            }`}
          >
            <Utensils className={`w-4 h-4 ${location.pathname === '/' ? 'text-orange-600' : ''}`} />
            <span>Home</span>
          </Link>
          
          {/* Category Link */}
          <Link 
            to="/categories" 
            className={`transition ${
              location.pathname === '/categories' 
                ? 'text-orange-600 font-bold' 
                : 'hover:text-orange-600 font-medium text-gray-600'
            }`}
          >
            Category
          </Link>

          {/* About Us Link */}
          <Link 
            to="/about" 
            className={`transition ${
              location.pathname === '/about' 
                ? 'text-orange-600 font-bold' 
                : 'hover:text-orange-600 font-medium text-gray-600'
            }`}
          >
            About Us
          </Link>

          <Link to="/#privacy" className="hover:text-orange-600 transition">Privacy Policy</Link>
          <Link to="/#contact" className="hover:text-orange-600 transition">Contact</Link>
        </nav>

        {/* Right Action Items: Language, Auth & Join Us */}
        <div className="flex items-center space-x-4">
          <button className="hidden sm:flex items-center space-x-1.5 text-gray-700 hover:text-orange-600 font-medium text-sm px-3 py-1.5 rounded-lg transition">
            <Globe className="w-4 h-4 text-gray-500" />
            <span>En</span>
          </button>

          {user ? (
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-xl border">
                <UserIcon className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-semibold text-gray-700">{user.name || user.email}</span>
                <span className="text-xs bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full uppercase">
                  {user.role}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 bg-gray-100 hover:bg-red-50 px-3 py-2 rounded-xl transition font-medium text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-orange-600/20 transition text-sm"
            >
              Join Us
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}