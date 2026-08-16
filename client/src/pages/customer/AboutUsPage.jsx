import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Heart, Phone, Mail, MapPin, CheckCircle, Target, Lightbulb, Award, Users, Smile, Coffee } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5EE] via-[#FFF8F3] to-[#FFEDDF] text-gray-800 font-sans selection:bg-orange-500 selection:text-white flex flex-col justify-between">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,700;0,9..144,900;1,9..144,600&family=Work+Sans:wght@400;500;600;700;800&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }
      `}</style>

      <div>
        <Navbar />

        {/* --- 1. HERO BANNER SECTION --- */}
        <div className="relative bg-gray-900 py-20 px-6 overflow-hidden">
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0 z-0 opacity-40">
            <img 
              src="/m7.jpg" 
              alt="Delicious Food Banner" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/80 to-transparent z-10"></div>

          <div className="max-w-7xl mx-auto relative z-20 space-y-3">
            <h1 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
              About Us
            </h1>
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-300">
              <Link to="/" className="hover:text-orange-500 transition-colors flex items-center space-x-1">
                <span>🏠</span>
                <span>Home</span>
              </Link>
              <span>—</span>
              <span className="text-orange-400 font-semibold">About Us</span>
            </div>
          </div>
        </div>

        {/* --- 2. HEALTHY FOODS PROVIDER SECTION --- */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Chef Image & Badge */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-orange-50 max-w-md mx-auto lg:mx-0">
                <img 
                  src="/m8.jpg" 
                  alt="Professional Chef" 
                  className="w-full h-[420px] object-cover"
                />
              </div>

              {/* Experience Circular Badge */}
              <div className="absolute -top-6 right-4 lg:right-12 bg-orange-600 text-white w-32 h-32 rounded-full flex flex-col items-center justify-center text-center shadow-xl border-4 border-white animate-pulse">
                <span className="font-display text-2xl font-black">12+</span>
                <span className="text-xs font-bold tracking-wider uppercase">Years Experience</span>
              </div>

              {/* Bottom Quote Box */}
              <div className="absolute -bottom-6 left-4 right-4 sm:left-12 sm:right-12 bg-gray-900 text-white p-5 rounded-2xl shadow-xl border border-gray-800">
                <p className="text-xs sm:text-sm text-gray-300 italic font-medium">
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate officiis architecto reiciendis."
                </p>
              </div>
            </div>

            {/* Right: Content & Highlights */}
            <div className="space-y-6 mt-6 lg:mt-0">
              <div>
                <div className="flex items-center space-x-2 text-orange-600 font-extrabold text-sm uppercase tracking-wider mb-2">
                  <span>About Us</span>
                  <div className="w-8 h-0.5 bg-orange-600"></div>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                  Healthy Foods Provider
                </h2>
              </div>

              <p className="text-gray-600 text-base leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate aspernatur molestiae minima pariatur consequatur voluptate sapiente deleniti soluta, animi ab necessitatibus optio similique quasi fuga impedit corrupti obcaecati neque consequatur sequi.
              </p>

              {/* Highlight Item 1 */}
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white shadow-sm border border-orange-100">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-gray-900 mb-1">Trusted Partner</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Minus, Officiis Placeat Iusto Quasi Amet Beatae Ab Maxime.
                  </p>
                </div>
              </div>

              {/* Highlight Item 2 */}
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white shadow-sm border border-orange-100">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-gray-900 mb-1">First Delivery</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Lorem Ipsum Dolor Sit Amet Consectetur, Adipisicing Elit. Minus, Officiis Placeat Iusto Quasi Adipisci Impedit Delectus Beatae Ab Maxime.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* --- 3. VISION, MISSION, GOALS SECTION --- */}
        <section className="bg-white/60 py-20 border-y border-orange-100/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Vision, Mission, Goals Cards */}
            <div className="space-y-6">
              
              {/* Vision Card */}
              <div className="bg-gray-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden flex items-start space-x-5 border border-gray-800">
                <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <Target className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">Vision</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab corporis perspiciatis voluptatum odit.
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="bg-gray-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden flex items-start space-x-5 border border-gray-800">
                <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <Lightbulb className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">Mission</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab corporis perspiciatis voluptatum odit.
                  </p>
                </div>
              </div>

              {/* Goals Card */}
              <div className="bg-gray-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden flex items-start space-x-5 border border-gray-800">
                <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">Goals</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab corporis perspiciatis voluptatum odit.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Restaurant Atmosphere Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-orange-100">
                <img 
                  src="/m1.jpg" 
                  alt="Restaurant Interior" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Decorative Geometric Block Accent */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-500 rounded-2xl -z-10 opacity-80"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gray-900 rounded-2xl -z-10"></div>
            </div>

          </div>
        </section>

        {/* --- 4. STATISTICS COUNTER SECTION (FIXED: Gradient Theme) --- */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center p-8 rounded-3xl bg-white shadow-md border border-orange-100 hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-full bg-orange-50 border-4 border-orange-500 flex items-center justify-center mb-4 shadow-sm">
                <Coffee className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-display text-3xl font-black mb-1 text-gray-900">1200 +</h3>
              <p className="text-sm font-bold text-gray-500">Customer Serve</p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center p-8 rounded-3xl bg-white shadow-md border border-orange-100 hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-full bg-orange-50 border-4 border-orange-500 flex items-center justify-center mb-4 shadow-sm">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-display text-3xl font-black mb-1 text-gray-900">1150 +</h3>
              <p className="text-sm font-bold text-gray-500">Experience Chef</p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center p-8 rounded-3xl bg-white shadow-md border border-orange-100 hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-full bg-orange-50 border-4 border-orange-500 flex items-center justify-center mb-4 shadow-sm">
                <Smile className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-display text-3xl font-black mb-1 text-gray-900">1250 +</h3>
              <p className="text-sm font-bold text-gray-500">Happy Customer</p>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center p-8 rounded-3xl bg-white shadow-md border border-orange-100 hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-full bg-orange-50 border-4 border-orange-500 flex items-center justify-center mb-4 shadow-sm">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-display text-3xl font-black mb-1 text-gray-900">1300 +</h3>
              <p className="text-sm font-bold text-gray-500">Winning Awards</p>
            </div>

          </div>
        </section>

      </div>

      {/* --- FOOTER SECTION --- */}
      <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="bg-orange-600 text-white p-2 rounded-xl shadow-md">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                ማእድ <span className="text-orange-500 font-medium text-sm">Ma'ad</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Discover delicious meals and order instantly from the best local restaurants around you.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
              <li><Link to="/categories" className="hover:text-orange-500 transition-colors">Categories</Link></li>
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide">Legal & Privacy</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-orange-500 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/cookies" className="hover:text-orange-500 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Adama, Ethiopia</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>+251 900 000 000</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>support@maad.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ማእድ Ma'ad Restaurant Management System. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>for food lovers.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}