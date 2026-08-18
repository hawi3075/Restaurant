import React, { useState, useEffect } from 'react';
import { Layers, Plus, Edit, Trash2, X } from 'lucide-react';
import API from '../../services/api';

export default function AdminMainCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await API.get('/foods/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        image: category.image || '',
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', image: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', image: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Category name is required');
      return;
    }

    try {
      if (editingCategory) {
        // Update category
        await API.put(`/foods/categories/${editingCategory.id}`, formData);
        alert('Category updated successfully!');
      } else {
        // Create category
        await API.post('/foods/categories', formData);
        alert('Category created successfully!');
      }
      
      handleCloseModal();
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      alert(error.response?.data?.error || 'Failed to save category');
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await API.delete(`/foods/categories/${id}`);
      alert('Category deleted successfully!');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert(error.response?.data?.error || 'Failed to delete category');
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Food Categories</h1>
          <p className="text-gray-600 mt-1">Manage food categories for your menu</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg p-16 text-center">
          <Layers className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-700 mb-3">No Categories Yet</h3>
          <p className="text-gray-500 mb-8">Start by adding your first food category</p>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-2xl transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Add Category</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center overflow-hidden">
                  {category.image ? (
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                  ) : (
                    <Layers className="w-8 h-8 text-orange-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-gray-900 text-lg">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category._count?.foods || 0} items</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOpenModal(category)}
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-xl font-bold text-sm transition flex items-center justify-center space-x-1"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(category.id, category.name)}
                  className="px-4 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-xl transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <h2 className="text-2xl font-black text-gray-900 mb-6">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Ethiopian Food"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg or /m1.jpg"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter an image URL or use: /m1.jpg, /m7.jpg, /m8.jpg
                </p>
              </div>

              {formData.image && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-bold text-gray-600 mb-2">Preview:</p>
                  <div className="w-20 h-20 bg-white rounded-xl overflow-hidden border border-gray-200">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}

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
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
