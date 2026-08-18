import React, { useState, useEffect } from 'react';
import { UtensilsCrossed, Plus, Search, Edit, Trash2, X } from 'lucide-react';
import API from '../../services/api';

export default function AdminFoodsPage() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    categoryId: '',
    restaurantId: '',
    isPopular: false,
    isAvailable: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [foodsRes, categoriesRes, restaurantsRes] = await Promise.all([
        API.get('/foods'),
        API.get('/foods/categories'),
        API.get('/restaurants'),
      ]);
      
      setFoods(foodsRes.data);
      setCategories(categoriesRes.data);
      setRestaurants(restaurantsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (food = null) => {
    if (food) {
      setEditingFood(food);
      setFormData({
        name: food.name,
        description: food.description || '',
        price: food.price.toString(),
        image: food.image || '',
        categoryId: food.categoryId,
        restaurantId: food.restaurantId,
        isPopular: food.isPopular,
        isAvailable: food.isAvailable,
      });
    } else {
      setEditingFood(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        categoryId: categories[0]?.id || '',
        restaurantId: restaurants[0]?.id || '',
        isPopular: false,
        isAvailable: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFood(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.price || !formData.categoryId || !formData.restaurantId) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
      };

      if (editingFood) {
        await API.put(`/foods/${editingFood.id}`, submitData);
        alert('Food updated successfully!');
      } else {
        await API.post('/foods', submitData);
        alert('Food created successfully!');
      }
      
      handleCloseModal();
      fetchData();
    } catch (error) {
      console.error('Error saving food:', error);
      alert(error.response?.data?.error || 'Failed to save food');
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await API.delete(`/foods/${id}`);
      alert('Food deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Error deleting food:', error);
      alert(error.response?.data?.error || 'Failed to delete food');
    }
  };

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Food Management</h1>
          <p className="text-gray-600 mt-1">Manage all food items across restaurants</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Food</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search foods by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Foods Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      ) : filteredFoods.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg p-16 text-center">
          <UtensilsCrossed className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-700 mb-3">No Foods Found</h3>
          <p className="text-gray-500 mb-8">
            {searchTerm ? 'Try a different search term' : 'Start by adding your first food item'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => handleOpenModal()}
              className="inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-2xl transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Add Food</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="relative h-48 bg-gray-100">
                <img
                  src={food.image || '/m1.jpg'}
                  alt={food.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/m1.jpg';
                  }}
                />
                {food.isPopular && (
                  <span className="absolute top-2 right-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-lg">
                    Popular
                  </span>
                )}
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-black text-gray-900 mb-1">{food.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {food.restaurant?.name} • {food.category?.name}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">{food.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-orange-600 font-black text-xl">${food.price.toFixed(2)}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    food.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {food.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <button
                    onClick={() => handleOpenModal(food)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-xl font-bold text-sm transition flex items-center justify-center space-x-1"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(food.id, food.name)}
                    className="px-4 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-xl transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative my-8">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <h2 className="text-2xl font-black text-gray-900 mb-6">
              {editingFood ? 'Edit Food Item' : 'Add New Food'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Food Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Doro Wot"
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
                    placeholder="Describe the food..."
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Restaurant *
                  </label>
                  <select
                    value={formData.restaurantId}
                    onChange={(e) => setFormData({ ...formData, restaurantId: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                    required
                  >
                    <option value="">Select Restaurant</option>
                    {restaurants.map((restaurant) => (
                      <option key={restaurant.id} value={restaurant.id}>
                        {restaurant.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/m1.jpg or https://..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPopular}
                      onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                      className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm font-bold text-gray-700">Mark as Popular</span>
                  </label>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isAvailable}
                      onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                      className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm font-bold text-gray-700">Available</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4">
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
                  {editingFood ? 'Update Food' : 'Create Food'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
