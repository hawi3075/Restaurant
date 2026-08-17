import React from 'react';
import { User, Mail, Phone, Shield, Edit3 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shadow-orange-600/25">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900">{user?.name || 'Hawi Girma'}</h1>
              <p className="text-sm text-gray-500">Member profile details</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 bg-orange-50 text-orange-600 hover:bg-orange-100 font-bold px-4 py-2.5 rounded-xl transition text-sm">
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="bg-white p-3 rounded-xl shadow-sm text-orange-600"><User className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Full Name</p>
              <p className="font-bold text-gray-800">{user?.name || 'Hawi Girma'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="bg-white p-3 rounded-xl shadow-sm text-orange-600"><Mail className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email Address</p>
              <p className="font-bold text-gray-800">{user?.email || 'hawig3521@gmail.com'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="bg-white p-3 rounded-xl shadow-sm text-orange-600"><Phone className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Phone Number</p>
              <p className="font-bold text-gray-800">+251 900 000 000</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="bg-white p-3 rounded-xl shadow-sm text-orange-600"><Shield className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Account Status</p>
              <p className="font-bold text-emerald-600">Active & Verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}