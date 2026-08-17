import React, { useState } from 'react';
import { MapPin, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export default function Address() {
  const [addresses, setAddresses] = useState([
    { id: 1, title: 'Home', address: 'Bole Road, Near Friendship Building, Addis Ababa', default: true },
    { id: 2, title: 'Office / Campus', address: 'Adama Science and Technology University, Adama', default: false }
  ]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">My Addresses</h1>
          <p className="text-sm text-gray-500">Manage your delivery locations</p>
        </div>
        <button className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-orange-600/20 transition text-sm">
          <Plus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      <div className="space-y-4">
        {addresses.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-start space-x-4">
              <div className="bg-orange-50 text-orange-600 p-3.5 rounded-2xl mt-1">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                  {item.default && (
                    <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Default</span>
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mt-1">{item.address}</p>
              </div>
            </div>
            <button className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}