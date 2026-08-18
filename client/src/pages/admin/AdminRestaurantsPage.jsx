import React, { useState } from 'react';
import { Store, Plus, CheckCircle, XCircle, Search } from 'lucide-react';

export default function AdminRestaurantsPage() {
  const [restaurants] = useState([
    { id: 1, name: 'Café Monarch', cuisine: 'Traditional & Fast Food', zone: 'Adama Central', status: 'Open', commission: '10%' },
    { id: 2, name: 'Hungry Puppets', cuisine: 'Burgers & Pizza', zone: 'Bole Sub-City', status: 'Open', commission: '12%' },
    { id: 3, name: 'Vintage Kitchen', cuisine: 'Ethiopian Injera & Stews', zone: 'Adama Central', status: 'Closed', commission: '10%' },
  ]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Restaurant Management</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage partner vendors, commissions, and operational status.</p>
        </div>
        <button className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-orange-600/20 transition cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Add Restaurant</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input type="text" placeholder="Search restaurants..." className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs outline-none focus:border-orange-500 transition" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-400 uppercase font-bold tracking-wider border-b border-gray-100">
              <tr>
                <th className="p-4">Restaurant Name</th>
                <th className="p-4">Cuisine Type</th>
                <th className="p-4">Zone</th>
                <th className="p-4">Commission</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {restaurants.map(res => (
                <tr key={res.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4 font-bold flex items-center space-x-2 text-gray-900">
                    <Store className="w-4 h-4 text-orange-500" />
                    <span>{res.name}</span>
                  </td>
                  <td className="p-4 text-gray-500">{res.cuisine}</td>
                  <td className="p-4">{res.zone}</td>
                  <td className="p-4 font-bold text-orange-600">{res.commission}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${res.status === 'Open' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button className="p-2 bg-gray-100 hover:bg-emerald-100 hover:text-emerald-600 rounded-lg transition" title="Approve/Toggle"><CheckCircle className="w-3.5 h-3.5" /></button>
                    <button className="p-2 bg-gray-100 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition" title="Block"><XCircle className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}