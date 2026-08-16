import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, Utensils } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission API logic here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5EE] via-[#FFF8F3] to-[#FFEDDF] text-gray-800 font-sans flex flex-col justify-between">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,700;0,9..144,900;1,9..144,600&family=Work+Sans:wght@400;500;600;700;800&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }
      `}</style>

      <div>
        <Navbar />

        {/* --- MAIN CONTACT CONTENT SECTION --- */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          
          {/* Header Title */}
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl sm:text-5xl font-black text-orange-600 tracking-tight">
              Contact us
            </h1>
            <div className="w-16 h-1 bg-orange-600 mx-auto mt-3 rounded-full"></div>
          </div>

          {/* Top 3 Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            
            {/* Card 1: Call Us */}
            <div className="bg-white rounded-3xl p-8 shadow-md border border-orange-100 flex items-center space-x-5 hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-2xl bg-orange-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-600/30">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider mb-1">Call us</h3>
                <p className="text-gray-900 font-display font-bold text-lg">+251 900 000 000</p>
              </div>
            </div>

            {/* Card 2: Mail Us */}
            <div className="bg-white rounded-3xl p-8 shadow-md border border-orange-100 flex items-center space-x-5 hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-2xl bg-orange-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-600/30">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider mb-1">Mail us</h3>
                <p className="text-gray-900 font-display font-bold text-base sm:text-lg break-all">support@maad.com</p>
              </div>
            </div>

            {/* Card 3: Find Us */}
            <div className="bg-white rounded-3xl p-8 shadow-md border border-orange-100 flex items-center space-x-5 hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-2xl bg-orange-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-600/30">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider mb-1">Find us</h3>
                <p className="text-gray-900 font-display font-bold text-sm sm:text-base">Adama, Ethiopia</p>
              </div>
            </div>

          </div>

          {/* Form & Illustration Section */}
          <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Input Form */}
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900 mb-1">Type here</h2>
                <p className="text-sm text-gray-500">Send us a message and our support team will reply promptly.</p>
              </div>

              {submitted && (
                <div className="bg-green-50 text-green-700 text-sm font-semibold p-4 rounded-xl border border-green-200">
                  Thank you! Your message has been successfully sent.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Message</label>
                  <textarea 
                    rows="5"
                    required
                    placeholder="Type your message here"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-orange-600/20 transition text-sm flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit</span>
                </button>
              </form>
            </div>

            {/* Right: Support Illustration Image */}
            <div className="flex justify-center bg-orange-50/50 p-8 rounded-2xl border border-orange-100">
              <img 
                src="/m8.jpg" 
                alt="Support Customer Representative" 
                className="w-full max-w-md h-[380px] object-cover rounded-2xl shadow-md"
              />
            </div>

          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ማእድ Ma'ad Restaurant Management System. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link>
            <Link to="/categories" className="hover:text-orange-500 transition-colors">Categories</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}