import React from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h1 className="text-3xl font-black text-gray-900">Help & Support</h1>
        <p className="text-gray-500 text-sm mt-2">Have questions or need assistance? Reach out to our support team promptly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="bg-orange-50 text-orange-600 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900">Call Us</h3>
          <p className="text-sm text-gray-500 mt-1">+251 900 000 000</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="bg-orange-50 text-orange-600 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900">Mail Us</h3>
          <p className="text-sm text-gray-500 mt-1">support@maad.com</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="bg-orange-50 text-orange-600 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900">Find Us</h3>
          <p className="text-sm text-gray-500 mt-1">Adama, Ethiopia</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
        <h3 className="text-xl font-black text-gray-900 mb-6">Send us a message</h3>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Name</label>
            <input type="text" placeholder="Hawi Girma" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-orange-600" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Message</label>
            <textarea rows="4" placeholder="How can we help you?" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-orange-600"></textarea>
          </div>
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-orange-600/20 transition flex items-center justify-center space-x-2">
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </button>
        </form>
      </div>
    </div>
  );
}