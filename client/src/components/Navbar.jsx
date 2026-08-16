import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Utensils, Globe, LogOut, User as UserIcon, Menu, X, 
  ShoppingBag, MapPin, HelpCircle, MessageSquare, LogIn,
  Store, Info, LayoutGrid 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
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

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 font-medium text-gray-600">
          <Link 
            to="/" 
            className={`flex items-center space-x-1 transition ${
              location.pathname === '/' ? 'text-orange-600 font-bold' : 'hover:text-orange-600 text-gray-600'
            }`}
          >
            <Utensils className={`w-4 h-4 ${location.pathname === '/' ? 'text-orange-600' : ''}`} />
            <span>Home</span>
          </Link>
          
          <Link 
            to="/categories" 
            className={`transition ${
              location.pathname === '/categories' ? 'text-orange-600 font-bold' : 'hover:text-orange-600 text-gray-600'
            }`}
          >
            Category
          </Link>

          <Link 
            to="/restaurants" 
            className={`transition ${
              location.pathname === '/restaurants' ? 'text-orange-600 font-bold' : 'hover:text-orange-600 text-gray-600'
            }`}
          >
            Restaurants
          </Link>

          <Link 
            to="/about" 
            className={`transition ${
              location.pathname === '/about' ? 'text-orange-600 font-bold' : 'hover:text-orange-600 text-gray-600'
            }`}
          >
            About Us
          </Link>

          <Link 
            to="/contact" 
            className={`transition ${
              location.pathname === '/contact' ? 'text-orange-600 font-bold' : 'hover:text-orange-600 text-gray-600'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Header Actions */}
        <div className="flex items-center space-x-4">
          <button className="hidden sm:flex items-center space-x-1.5 text-gray-700 hover:text-orange-600 font-medium text-sm px-3 py-1.5 rounded-lg transition">
            <Globe className="w-4 h-4 text-gray-500" />
            <span>En</span>
          </button>

          {!user && (
            <Link 
              to="/login" 
              className="hidden sm:block bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-orange-600/20 transition text-sm"
            >
              Join Us
            </Link>
          )}

          {/* Hamburger Menu Toggle Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2.5 rounded-xl bg-gray-100 hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition shadow-sm"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Backdrop overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity" 
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Slide-out Menu Panel */}
      <div className={`fixed inset-y-0 right-0 w-80 sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
        menuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <h3 className="font-black text-xl text-gray-900 tracking-tight">Menu</h3>
          <button 
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Menu Items Container */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          
          {user && (
            <div className="flex items-center space-x-3 p-3.5 bg-orange-50 rounded-2xl mb-2 border border-orange-100">
              <div className="bg-orange-600 text-white p-2.5 rounded-xl shadow-md">
                <UserIcon className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-gray-900 truncate">{user.name || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          )}

          {/* Profile */}
          <Link 
            to="/profile" 
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-orange-50 hover:text-orange-600 group transition"
          >
            <div className="bg-orange-600 text-white p-2.5 rounded-xl shadow-md group-hover:scale-105 transition">
              <UserIcon className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-800 group-hover:text-orange-600 text-sm">Profile</span>
          </Link>

          {/* My Address */}
          <Link 
            to="/address" 
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-orange-50 hover:text-orange-600 group transition"
          >
            <div className="bg-orange-600 text-white p-2.5 rounded-xl shadow-md group-hover:scale-105 transition">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-800 group-hover:text-orange-600 text-sm">My Address</span>
          </Link>

          {/* My Orders */}
          <Link 
            to="/orders" 
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-orange-50 hover:text-orange-600 group transition"
          >
            <div className="bg-orange-600 text-white p-2.5 rounded-xl shadow-md group-hover:scale-105 transition">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-800 group-hover:text-orange-600 text-sm">My Orders</span>
          </Link>

          {/* Language */}
          <Link 
            to="/language" 
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-orange-50 hover:text-orange-600 group transition"
          >
            <div className="bg-orange-600 text-white p-2.5 rounded-xl shadow-md group-hover:scale-105 transition">
              <Globe className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-800 group-hover:text-orange-600 text-sm">Language</span>
          </Link>

          {/* Help & Support */}
          <Link 
            to="/contact" 
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-orange-50 hover:text-orange-600 group transition"
          >
            <div className="bg-orange-600 text-white p-2.5 rounded-xl shadow-md group-hover:scale-105 transition">
              <HelpCircle className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-800 group-hover:text-orange-600 text-sm">Help & Support</span>
          </Link>

          {/* Live Chat */}
          <Link 
            to="/chat" 
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-orange-50 hover:text-orange-600 group transition"
          >
            <div className="bg-orange-600 text-white p-2.5 rounded-xl shadow-md group-hover:scale-105 transition">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-800 group-hover:text-orange-600 text-sm">Live Chat</span>
          </Link>

          {/* General Site Links */}
          <div className="pt-3 border-t border-gray-100 space-y-1">
            <Link 
              to="/categories" 
              onClick={() => setMenuOpen(false)}
              className="flex items-center space-x-3 p-2.5 text-xs font-bold text-gray-600 hover:text-orange-600 transition"
            >
              <LayoutGrid className="w-4 h-4 text-orange-600" />
              <span>Categories</span>
            </Link>
            <Link 
              to="/restaurants" 
              onClick={() => setMenuOpen(false)}
              className="flex items-center space-x-3 p-2.5 text-xs font-bold text-gray-600 hover:text-orange-600 transition"
            >
              <Store className="w-4 h-4 text-orange-600" />
              <span>Restaurants</span>
            </Link>
            <Link 
              to="/about" 
              onClick={() => setMenuOpen(false)}
              className="flex items-center space-x-3 p-2.5 text-xs font-bold text-gray-600 hover:text-orange-600 transition"
            >
              <Info className="w-4 h-4 text-orange-600" />
              <span>About Us</span>
            </Link>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0">
          {user ? (
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 bg-red-50 text-red-600 hover:bg-red-100 font-bold py-3 rounded-xl transition text-sm shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          ) : (
            <Link 
              to="/login" 
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-600/20 transition text-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Join Us</span>
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}