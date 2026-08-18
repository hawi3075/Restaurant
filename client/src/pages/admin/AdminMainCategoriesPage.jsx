import React from 'react';
import { Store, Plus } from 'lucide-react';

export default function AdminMainCategoriesPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Main Categories</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage global food categories.</p>
        </div>
        <button className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>
    </div>
  );
}