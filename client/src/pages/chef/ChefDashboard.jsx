import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, Clock, ChefHat } from 'lucide-react';

export default function ChefDashboard() {
  const [orders, setOrders] = useState([]);
  const socket = useSocket();
  const { user } = useAuth();

  const fetchKitchenOrders = async () => {
    try {
      const response = await API.get('/orders');
      // Filter for active kitchen orders (Pending, Confirmed, Preparing)
      const activeOrders = response.data.filter(o => ['PENDING', 'CONFIRMED', 'PREPARING'].includes(o.status));
      setOrders(activeOrders);
    } catch (err) {
      console.error('Error loading kitchen orders:', err);
    }
  };

  useEffect(() => {
    fetchKitchenOrders();

    if (socket) {
      socket.on('new_order', (newOrder) => {
        setOrders((prev) => [newOrder, ...prev]);
      });

      socket.on('order_status_updated', (updatedOrder) => {
        setOrders((prev) => 
          prev.map(o => o.id === updatedOrder.id ? updatedOrder : o)
              .filter(o => !['DELIVERED', 'SERVED', 'COMPLETED', 'CANCELLED'].includes(o.status))
        );
      });
    }

    return () => {
      if (socket) {
        socket.off('new_order');
        socket.off('order_status_updated');
      }
    };
  }, [socket]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status: newStatus });
      fetchKitchenOrders();
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <ChefHat className="w-10 h-10 text-orange-600" />
            <div>
              <h1 className="text-2xl font-bold">Kitchen Dashboard (Chef Portal)</h1>
              <p className="text-gray-500 text-sm">Manage incoming food preparation queues in real time[cite: 1]</p>
            </div>
          </div>
          <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-semibold">
            Active Orders: {orders.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                  <span className="font-bold text-lg">Order #{order.id.slice(0, 8)}</span>
                  <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                    order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="mb-4 text-sm text-gray-600">
                  <p className="font-semibold text-gray-800 mb-1">Type: {order.orderType}</p>
                  {order.specialInstructions && (
                    <p className="bg-red-50 text-red-700 p-2 rounded mb-3 text-xs">
                      <strong>Note:</strong> {order.specialInstructions}
                    </p>
                  )}
                  <div className="space-y-2 mt-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between border-b pb-1 text-gray-700">
                        <span>{item.quantity}x {item.food?.name}</span>
                        <span className="font-medium">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-4 pt-4 border-t">
                {order.status === 'PENDING' && (
                  <button 
                    onClick={() => updateStatus(order.id, 'CONFIRMED')}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Accept Order
                  </button>
                )}
                {order.status === 'CONFIRMED' && (
                  <button 
                    onClick={() => updateStatus(order.id, 'PREPARING')}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
                  >
                    Start Preparing
                  </button>
                )}
                {order.status === 'PREPARING' && (
                  <button 
                    onClick={() => updateStatus(order.id, order.orderType === 'DELIVERY' ? 'READY' : 'READY_TO_SERVE')}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" /> Mark as Ready[cite: 1]
                  </button>
                )}
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-sm text-gray-500">
              No active orders in the kitchen queue right now.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}