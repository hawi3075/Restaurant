import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { LayoutDashboard, UtensilsCrossed, Users, ShoppingBag, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [restRes, foodRes] = await Promise.all([
          API.get('/restaurants'),
          API.get('/foods')
        ]);
        setRestaurants(restRes.data);
        setFoods(foodRes.data);
      } catch (err) {
        console.error('Error loading admin data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 hidden md:block">
        <div className="flex items-center space-x-3 mb-8">
          <ShieldCheck className="w-8 h-8 text-orange-500" />
          <span className="text-xl font-bold">ROMS Admin</span>
        </div>
        <nav className="space-y-4">
          <a href="/admin" className="flex items-center space-x-3 text-orange-400 font-semibold py-2">
            <LayoutDashboard className="w-5 h-5" /> <span>Dashboard</span>
          </a>
          <a href="/admin/restaurants" className="flex items-center space-x-3 text-gray-300 hover:text-white py-2">
            <UtensilsCrossed className="w-5 h-5" /> <span>Restaurants</span>
          </a>
          <a href="/admin/menu" className="flex items-center space-x-3 text-gray-300 hover:text-white py-2">
            <ShoppingBag className="w-5 h-5" /> <span>Menu Items</span>
          </a>
          <a href="/admin/staff" className="flex items-center space-x-3 text-gray-300 hover:text-white py-2">
            <Users className="w-5 h-5" /> <span>Staff Management</span>
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Control Center</h1>
            <p className="text-gray-500 text-sm">Monitor restaurants, manage orders, and control platform settings.</p>
          </div>
          <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-semibold text-sm">
            System Status: Active
          </span>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-500 text-sm font-medium">Total Restaurants</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-2">{restaurants.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-500 text-sm font-medium">Active Menu Items</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-2">{foods.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-500 text-sm font-medium">Platform Roles</p>
            <h3 className="text-3xl font-bold text-orange-600 mt-2">5 Roles</h3>
          </div>
        </div>

        {/* Registered Restaurants Overview Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Registered Restaurants[cite: 1]</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-500 text-sm">
                  <th className="py-3 px-4">Restaurant Name</th>
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Hours</th>
                  <th className="py-3 px-4">Rating</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((res) => (
                  <tr key={res.id} className="border-b hover:bg-gray-50 text-sm">
                    <td className="py-3 px-4 font-semibold text-gray-800">{res.name}</td>
                    <td className="py-3 px-4 text-gray-600">{res.address}</td>
                    <td className="py-3 px-4 text-gray-600">{res.phone}</td>
                    <td className="py-3 px-4 text-gray-600">{res.openingHours} - {res.closingHours}</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">★ {res.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}