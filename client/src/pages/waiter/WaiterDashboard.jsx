import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useSocket } from '../../context/SocketContext';
import { Utensils, CheckCircle, Bell } from 'lucide-react';

export default function WaiterDashboard() {
  const [orders, setOrders] = useState([]);
  const socket = useSocket();

  const fetchWaiterOrders = async () => {
    try {
      const response = await API.get('/orders');
      // Filter for dine-in orders
      const dineInOrders = response.data.filter(o => o.orderType === 'DINE_IN' && !['COMPLETED', 'CANCELLED'].includes(o.status));
      setOrders(dineInOrders);
    } catch (err) {
      console.error('Error fetching dine-in orders:', err);
    }
  };

  useEffect(() => {
    fetchWaiterOrders();

    if (socket) {
      socket.on('order_status_updated', (updatedOrder) => {
        if (updatedOrder.orderType === 'DINE_IN') {
          fetchWaiterOrders();
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('order_status_updated');
      }
    };
  }, [socket]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status: newStatus });
      fetchWaiterOrders();
    } catch (err) {
      console.error('Failed to update dine-in order status:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <Utensils className="w-10 h-10 text-orange-600" />
            <div>
              <h1 className="text-2xl font-bold">Waiter Dashboard (Dine-In Management)</h1>
              <p className="text-gray-500 text-sm">Handle dine-in tables, coordinate with chefs, and serve customers</p>
            </div>
          </div>
          <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-semibold">
            Active Dine-In Orders: {orders.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                  <span className="font-bold text-lg">Table #{order.tableId || 'Walk-In'}</span>
                  <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                    order.status === 'READY_TO_SERVE' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="mb-4 text-sm text-gray-600">
                  <p className="font-semibold text-gray-800 mb-2">Customer: {order.customer?.name || 'Guest'}</p>
                  <div className="space-y-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between border-b pb-1 text-gray-700">
                        <span>{item.quantity}x {item.food?.name}</span>
                        <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-4 pt-4 border-t">
                {order.status === 'READY_TO_SERVE' && (
                  <button 
                    onClick={() => updateStatus(order.id, 'SERVED')}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" /> Mark as Served[cite: 1]
                  </button>
                )}
                {order.status === 'SERVED' && (
                  <button 
                    onClick={() => updateStatus(order.id, 'COMPLETED')}
                    className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
                  >
                    Complete Order
                  </button>
                )}
                {order.status !== 'READY_TO_SERVE' && order.status !== 'SERVED' && (
                  <div className="text-center text-sm text-gray-500 py-2">
                    Preparing in Kitchen...
                  </div>
                )}
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-sm text-gray-500">
              No active dine-in orders right now.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}