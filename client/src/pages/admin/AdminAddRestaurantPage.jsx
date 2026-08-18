import React from 'react';
import { Store, Plus } from 'lucide-react';

export default function AdminAddRestaurantPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Add New Restaurant</h1>
          <p className="text-xs text-gray-500 mt-0.5">Register a new vendor partner into the system.</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-3xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-gray-600 uppercase">Restaurant Name</label>
            <input type="text" placeholder="e.g. Café Monarch" className="w-full mt-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500" />
          </div>
          <div>
            <label className="font-bold text-gray-600 uppercase">Cuisine Type</label>
            <input type="text" placeholder="e.g. Traditional & Fast Food" className="w-full mt-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500" />
          </div>
        </div>
        <button className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-orange-600/20 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Save Restaurant</span>
        </button>
      </div>
    </div>
  );
}