import React, { useState } from 'react';
import { Users, Search, Ban, CheckCircle } from 'lucide-react';

export default function AdminCustomersPage() {
  const [customers] = useState([
    { id: 1, name: 'Hawi Girma', email: 'hawig3521@gmail.com', phone: '+251 91 234 5678', orders: 12, status: 'Active' },
    { id: 2, name: 'Abebe Kebede', email: 'abebe@gmail.com', phone: '+251 92 345 6789', orders: 5, status: 'Active' },
    { id: 3, name: 'Tigist Mamo', email: 'tigist@gmail.com', phone: '+251 93 456 7890', orders: 0, status: 'Blocked' },
  ]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Customer Management</h1>
          <p className="text-xs text-gray-500 mt-0.5">View registered platform users, total orders, and account status.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input type="text" placeholder="Search customers..." className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs outline-none focus:border-orange-500 transition" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-400 uppercase font-bold tracking-wider border-b border-gray-100">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {customers.map(cust => (
                <tr key={cust.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4 font-bold flex items-center space-x-2 text-gray-900">
                    <Users className="w-4 h-4 text-orange-500" />
                    <span>{cust.name}</span>
                  </td>
                  <td className="p-4 text-gray-500">{cust.email}</td>
                  <td className="p-4">{cust.phone}</td>
                  <td className="p-4 font-bold text-orange-600">{cust.orders} Orders</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${cust.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {cust.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {cust.status === 'Active' ? (
                      <button className="p-2 bg-gray-100 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition" title="Block User"><Ban className="w-3.5 h-3.5" /></button>
                    ) : (
                      <button className="p-2 bg-gray-100 hover:bg-emerald-100 hover:text-emerald-600 rounded-lg transition" title="Activate User"><CheckCircle className="w-3.5 h-3.5" /></button>
                    )}
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