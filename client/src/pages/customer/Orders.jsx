import React from 'react';
import { ShoppingBag, Clock, CheckCircle, ArrowRight } from 'lucide-react';

export default function Orders() {
  const orders = [
    { id: 'ORD-9821', restaurant: 'Traditional Kitchen', date: 'Aug 16, 2026', total: '450 ETB', status: 'Delivered' },
    { id: 'ORD-9812', restaurant: 'Burger House Adama', date: 'Aug 14, 2026', total: '320 ETB', status: 'Delivered' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">My Orders</h1>
        <p className="text-sm text-gray-500">Track and review your past food orders</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-50 text-orange-600 p-4 rounded-2xl">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-gray-900">{order.restaurant}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2.5 py-0.5 rounded-md">{order.id}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{order.date} • Total: <span className="font-bold text-gray-700">{order.total}</span></p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end space-x-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100">
              <span className="flex items-center space-x-1.5 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl text-xs font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>{order.status}</span>
              </span>
              <button className="flex items-center space-x-1 bg-gray-100 hover:bg-orange-600 hover:text-white text-gray-700 text-xs font-bold px-4 py-2.5 rounded-xl transition">
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}