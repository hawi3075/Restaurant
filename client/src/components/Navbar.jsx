import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Utensils, Globe, LogOut, User as UserIcon, Menu, X, 
  ShoppingBag, MapPin, HelpCircle, MessageSquare, LogIn,
  Store, Info, LayoutGrid, ShieldCheck, Mail, Lock, User, Phone, ArrowRight, ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';
import GlobalSearch from './GlobalSearch';

// --- Integrated Auth Modal Component with Back Icon ---
function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');

  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: '',
    phone: '',
    address: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert("Logged in successfully!");
    } else {
      alert("Account created successfully!");
    }
    // Keeps you on the current page instead of redirecting away
    onClose(); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-orange-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* Top Orange Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 to-amber-500 z-10" />

        {/* Back Button (Top Left) & Close Button (Top Right) */}
        <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 transition flex items-center space-x-1 text-xs font-bold cursor-pointer"
            title="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline pr-1">Back</span>
          </button>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-500 hover:text-orange-600 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left / Main Form Side */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between pt-14 md:pt-8">
          
          <div className="space-y-1 mb-6">
            <div className="flex items-center space-x-2 text-orange-600 mb-2">
              <div className="p-2 bg-orange-100 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="font-black text-xl tracking-tight text-gray-900">ማእድ Ma'ad</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-xs text-gray-500">
              {isLogin ? 'Sign in to access your orders and favorites.' : 'Join us to explore the best food and restaurants.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="Hawi Girma"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-xs font-medium"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                {isLogin ? 'Email or Phone' : 'Email Address'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  name="emailOrPhone" 
                  required 
                  placeholder={isLogin ? 'hawig3521@gmail.com or phone' : 'hawig3521@gmail.com'}
                  value={formData.emailOrPhone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-xs font-medium"
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input 
                      type="text" 
                      name="phone" 
                      placeholder="+251 91 234 5678"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Location / Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input 
                      type="text" 
                      name="address" 
                      placeholder="Adama, Ethiopia"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-xs font-medium"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input 
                  type="password" 
                  name="password" 
                  required 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-xs font-medium"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                  <input type="checkbox" className="rounded text-orange-600 focus:ring-orange-500" />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="font-bold text-orange-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
            )}

            <button 
              type="submit"
              className="w-full mt-2 flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-orange-600/25 transition text-xs uppercase tracking-wider cursor-pointer"
            >
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-4 text-xs text-gray-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="font-bold text-orange-600 hover:underline focus:outline-none cursor-pointer"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>

        </div>

        {/* Divider / Right Side (Google Login Integration Style) */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-orange-50/60 to-amber-50/40 p-6 sm:p-8 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-orange-100 text-center">
          
          <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center text-orange-600 mb-4 border border-orange-100">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h3 className="font-black text-gray-900 text-lg mb-1">Quick & Secure Access</h3>
          <p className="text-xs text-gray-500 mb-6 max-w-xs">
            Connect instantly with your Google account for a streamlined ordering experience.
          </p>

          <button 
            onClick={() => { alert("Google Auth integration hook"); onClose(); }}
            className="w-full max-w-xs flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl border border-gray-200 shadow-sm transition text-xs cursor-pointer"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.17 21.32 7.23 24 12 24z"/>
              <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.5-.38-2.24s.13-1.52.38-2.24V6.61H1.18C.43 8.12 0 9.83 0 12s.43 3.88 1.18 5.39l4.09-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.18 6.61l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <p className="text-[10px] text-gray-400 mt-6">
            By continuing, you agree to Ma'ad's <span className="underline cursor-pointer">Terms & Conditions</span>.
          </p>

        </div>

      </div>
    </div>
  );
}

// --- Main Navbar Component ---
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Modal State Management
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openLogin = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
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
            {/* Global Search */}
            <GlobalSearch />

            <button className="hidden sm:flex items-center space-x-1.5 text-gray-700 hover:text-orange-600 font-medium text-sm px-3 py-1.5 rounded-lg transition">
              <Globe className="w-4 h-4 text-gray-500" />
              <span>En</span>
            </button>

            {/* Notification Bell */}
            {user && <NotificationBell />}

            {!user && (
              <button 
                onClick={openLogin}
                className="hidden sm:block bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-orange-600/20 transition text-sm cursor-pointer"
              >
                Join Us
              </button>
            )}

            {/* Hamburger Menu Toggle Button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2.5 rounded-xl bg-gray-100 hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition shadow-sm relative z-50 cursor-pointer"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Backdrop overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity" 
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
            className="flex items-center space-x-4 p-3 rounded-2xl border border-transparent hover:bg-orange-50 hover:border-orange-100 hover:text-orange-600 hover:translate-x-1 hover:shadow-sm group transition-all duration-300"
          >
            <div className="bg-orange-600 text-white p-2.5 rounded-xl shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
              <UserIcon className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-800 group-hover:text-orange-600 text-sm">Profile</span>
          </Link>

          {/* My Address */}
          <Link 
            to="/address" 
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-4 p-3 rounded-2xl border border-transparent hover:bg-orange-50 hover:border-orange-100 hover:text-orange-600 hover:translate-x-1 hover:shadow-sm group transition-all duration-300"
          >
            <div className="bg-orange-600 text-white p-2.5 rounded-xl shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-800 group-hover:text-orange-600 text-sm">My Address</span>
          </Link>

          {/* My Orders */}
          <Link 
            to="/orders" 
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-4 p-3 rounded-2xl border border-transparent hover:bg-orange-50 hover:border-orange-100 hover:text-orange-600 hover:translate-x-1 hover:shadow-sm group transition-all duration-300"
          >
            <div className="bg-orange-600 text-white p-2.5 rounded-xl shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-800 group-hover:text-orange-600 text-sm">My Orders</span>
          </Link>

          {/* Language */}
          <Link 
            to="/language" 
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-4 p-3 rounded-2xl border border-transparent hover:bg-orange-50 hover:border-orange-100 hover:text-orange-600 hover:translate-x-1 hover:shadow-sm group transition-all duration-300"
          >
            <div className="bg-orange-600 text-white p-2.5 rounded-xl shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
              <Globe className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-800 group-hover:text-orange-600 text-sm">Language</span>
          </Link>

          {/* Help & Support */}
          <Link 
            to="/contact" 
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-4 p-3 rounded-2xl border border-transparent hover:bg-orange-50 hover:border-orange-100 hover:text-orange-600 hover:translate-x-1 hover:shadow-sm group transition-all duration-300"
          >
            <div className="bg-orange-600 text-white p-2.5 rounded-xl shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
              <HelpCircle className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-800 group-hover:text-orange-600 text-sm">Help & Support</span>
          </Link>

          {/* Live Chat */}
          <Link 
            to="/chat" 
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-4 p-3 rounded-2xl border border-transparent hover:bg-orange-50 hover:border-orange-100 hover:text-orange-600 hover:translate-x-1 hover:shadow-sm group transition-all duration-300"
          >
            <div className="bg-orange-600 text-white p-2.5 rounded-xl shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-800 group-hover:text-orange-600 text-sm">Live Chat</span>
          </Link>

          {/* General Site Links */}
          <div className="pt-3 border-t border-gray-100 space-y-1">
            <Link 
              to="/categories" 
              onClick={() => setMenuOpen(false)}
              className="flex items-center space-x-3 p-2.5 rounded-xl text-xs font-bold text-gray-600 hover:text-orange-600 hover:bg-orange-50 hover:translate-x-1 transition-all duration-300"
            >
              <LayoutGrid className="w-4 h-4 text-orange-600" />
              <span>Categories</span>
            </Link>
            <Link 
              to="/restaurants" 
              onClick={() => setMenuOpen(false)}
              className="flex items-center space-x-3 p-2.5 rounded-xl text-xs font-bold text-gray-600 hover:text-orange-600 hover:bg-orange-50 hover:translate-x-1 transition-all duration-300"
            >
              <Store className="w-4 h-4 text-orange-600" />
              <span>Restaurants</span>
            </Link>
            <Link 
              to="/about" 
              onClick={() => setMenuOpen(false)}
              className="flex items-center space-x-3 p-2.5 rounded-xl text-xs font-bold text-gray-600 hover:text-orange-600 hover:bg-orange-50 hover:translate-x-1 transition-all duration-300"
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
              className="w-full flex items-center justify-center space-x-2 bg-red-50 text-red-600 hover:bg-red-100 font-bold py-3 rounded-xl transition text-sm shadow-sm cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button 
              onClick={() => { setMenuOpen(false); openLogin(); }}
              className="w-full flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-600/20 transition text-sm cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Join Us</span>
            </button>
          )}
        </div>

      </div>

      {/* Render the popup modal overlay component */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialMode={authMode} 
      />
    </>
  );
}