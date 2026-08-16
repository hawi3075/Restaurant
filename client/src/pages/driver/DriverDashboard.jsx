import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useSocket } from '../../context/SocketContext';
import { Bike, Navigation, CheckCircle } from 'lucide-react';

export default function DriverDashboard() {
  const [orders, setOrders] = useState([]);
  const socket = useSocket();

  const fetchDeliveryOrders = async () => {
    try {
      const response = await API.get('/orders');
      // Filter for delivery orders ready for pickup or out for delivery
      const deliveryOrders = response.data.filter(o => o.orderType === 'DELIVERY' && !['DELIVERED', 'COMPLETED', 'CANCELLED'].includes(o.status));
      setOrders(deliveryOrders);
    } catch (err) {
      console.error('Error fetching delivery orders:', err);
    }
  };

  useEffect(() => {
    fetchDeliveryOrders();

    if (socket) {
      socket.on('order_status_updated', () => {
        fetchDeliveryOrders();
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
      fetchDeliveryOrders();
    } catch (err) {
      console.error('Failed to update delivery status:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <Bike className="w-10 h-10 text-orange-600" />
            <div>
              <h1 className="text-2xl font-bold">Driver Dashboard (Delivery Queue)</h1>
              <p className="text-gray-500 text-sm">Accept ready orders, track locations, and complete deliveries[cite: 1]</p>
            </div>
          </div>
          <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-semibold">
            Available Deliveries: {orders.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                  <span className="font-bold text-lg">Order #{order.id.slice(0, 8)}</span>
                  <span className="px-2.5 py-1 rounded text-xs font-bold bg-orange-100 text-orange-800">
                    {order.status}
                  </span>
                </div>

                <div className="mb-4 text-sm text-gray-600 space-y-2">
                  <p><strong className="text-gray-800">Restaurant:</strong> {order.restaurant?.name}</p>
                  <p><strong className="text-gray-800">Customer:</strong> {order.customer?.name} ({order.customer?.phone || 'No phone'})</p>
                  <div className="space-y-1 border-t pt-2 mt-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-gray-700 text-xs">
                        <span>{item.quantity}x {item.food?.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-4 pt-4 border-t">
                {order.status === 'READY' && (
                  <button 
                    onClick={() => updateStatus(order.id, 'OUT_FOR_DELIVERY')}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
                  >
                    <Navigation className="w-5 h-5 mr-2" /> Accept & Pick Up[cite: 1]
                  </button>
                )}
                {order.status === 'OUT_FOR_DELIVERY' && (
                  <button 
                    onClick={() => updateStatus(order.id, 'DELIVERED')}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" /> Confirm Delivered[cite: 1]
                  </button>
                )}
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-sm text-gray-500">
              No delivery orders available right now.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}