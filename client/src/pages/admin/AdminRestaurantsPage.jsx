import React, { useState, useEffect } from 'react';
import { Store, Plus, Search, Edit, Trash2, X, MapPin, Phone, Clock } from 'lucide-react';
import API from '../../services/api';

export default function AdminRestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    coverImage: '',
    description: '',
    address: '',
    latitude: '',
    longitude: '',
    phone: '',
    openingHours: '',
    closingHours: '',
    isDelivery: true,
    isDineIn: true,
    isOpen: true,
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await API.get('/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      alert('Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (restaurant = null) => {
    if (restaurant) {
      setEditingRestaurant(restaurant);
      setFormData({
        name: restaurant.name,
        logo: restaurant.logo || '',
        coverImage: restaurant.coverImage || '',
        description: restaurant.description || '',
        address: restaurant.address,
        latitude: restaurant.latitude?.toString() || '',
        longitude: restaurant.longitude?.toString() || '',
        phone: restaurant.phone,
        openingHours: restaurant.openingHours,
        closingHours: restaurant.closingHours,
        isDelivery: restaurant.isDelivery,
        isDineIn: restaurant.isDineIn,
        isOpen: restaurant.isOpen,
      });
    } else {
      setEditingRestaurant(null);
      setFormData({
        name: '',
        logo: '',
        coverImage: '',
        description: '',
        address: '',
        latitude: '',
        longitude: '',
        phone: '',
        openingHours: '08:00',
        closingHours: '22:00',
        isDelivery: true,
        isDineIn: true,
        isOpen: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRestaurant(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.address || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const submitData = {
        ...formData,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
      };

      if (editingRestaurant) {
        await API.put(`/restaurants/${editingRestaurant.id}`, submitData);
        alert('Restaurant updated successfully!');
      } else {
        await API.post('/restaurants', submitData);
        alert('Restaurant created successfully!');
      }
      
      handleCloseModal();
      fetchRestaurants();
    } catch (error) {
      console.error('Error saving restaurant:', error);
      alert(error.response?.data?.error || 'Failed to save restaurant');
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await API.delete(`/restaurants/${id}`);
      alert('Restaurant deleted successfully!');
      fetchRestaurants();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert(error.response?.data?.error || 'Failed to delete restaurant');
    }
  };

  const toggleStatus = async (restaurant) => {
    try {
      await API.put(`/restaurants/${restaurant.id}`, {
        ...restaurant,
        isOpen: !restaurant.isOpen,
      });
      fetchRestaurants();
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Failed to update status');
    }
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Restaurant Management</h1>
          <p className="text-gray-600 mt-1">Manage partner restaurants and vendors</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Restaurant</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search restaurants by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Restaurants Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      ) : filteredRestaurants.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg p-16 text-center">
          <Store className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-700 mb-3">No Restaurants Found</h3>
          <p className="text-gray-500 mb-8">
            {searchTerm ? 'Try a different search term' : 'Start by adding your first restaurant'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => handleOpenModal()}
              className="inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-2xl transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Add Restaurant</span>
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Restaurant
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRestaurants.map((restaurant) => (
                  <tr key={restaurant.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl overflow-hidden flex-shrink-0">
                          {restaurant.logo ? (
                            <img
                              src={restaurant.logo}
                              alt={restaurant.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Store className="w-6 h-6 text-orange-600" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{restaurant.name}</p>
                          <p className="text-xs text-gray-500">
                            {restaurant.isDelivery && '🚚 Delivery'} {restaurant.isDineIn && '🍽️ Dine-in'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 line-clamp-2">{restaurant.address}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{restaurant.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span>{restaurant.openingHours} - {restaurant.closingHours}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <span className="text-lg">⭐</span>
                        <span className="text-sm font-bold text-gray-900">{restaurant.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(restaurant)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                          restaurant.isOpen
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        {restaurant.isOpen ? 'Open' : 'Closed'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleOpenModal(restaurant)}
                          className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(restaurant.id, restaurant.name)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-8 relative my-8">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <h2 className="text-2xl font-black text-gray-900 mb-6">
              {editingRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Restaurant Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Yod Abyssinia"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description..."
                    rows="2"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Full address"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+251911234567"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="text"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    placeholder="/m7.jpg or https://..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Opening Time *
                  </label>
                  <input
                    type="time"
                    value={formData.openingHours}
                    onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Closing Time *
                  </label>
                  <input
                    type="time"
                    value={formData.closingHours}
                    onChange={(e) => setFormData({ ...formData, closingHours: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Latitude (Optional)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    placeholder="9.0320"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Longitude (Optional)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    placeholder="38.7469"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2 space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isDelivery}
                      onChange={(e) => setFormData({ ...formData, isDelivery: e.target.checked })}
                      className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm font-bold text-gray-700">Offers Delivery Service</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isDineIn}
                      onChange={(e) => setFormData({ ...formData, isDineIn: e.target.checked })}
                      className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm font-bold text-gray-700">Offers Dine-in Service</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isOpen}
                      onChange={(e) => setFormData({ ...formData, isOpen: e.target.checked })}
                      className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm font-bold text-gray-700">Currently Open</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold transition"
                >
                  {editingRestaurant ? 'Update Restaurant' : 'Create Restaurant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
