import React from 'react';
import { ShieldCheck, Plus } from 'lucide-react';

export default function AdminEmployeesPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Employees List</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage admin staff accounts and roles.</p>
        </div>
        <button className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>
    </div>
  );
}