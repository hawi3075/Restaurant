import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Utensils, Heart, Phone, Mail, MapPin, Star, Plus, ShoppingBag } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 1, name: 'Bengali', image: '/m1.jpg', count: '12+ Items' },
    { id: 2, name: 'Caribbean', image: '/m2.jpg', count: '8+ Items' },
    { id: 3, name: 'Sea Food', image: '/m7.jpg', count: '15+ Items' },
    { id: 4, name: 'French', image: '/m8.jpg', count: '10+ Items' },
    { id: 5, name: 'Spanish', image: '/m1.jpg', count: '6+ Items' },
    { id: 6, name: 'Chinese', image: '/m2.jpg', count: '20+ Items' },
    { id: 7, name: 'Fast Food', image: '/m7.jpg', count: '25+ Items' },
    { id: 8, name: 'Kabab & More', image: '/m8.jpg', count: '14+ Items' },
    { id: 9, name: 'Indian', image: '/m1.jpg', count: '18+ Items' },
    { id: 10, name: 'Noodles', image: '/m2.jpg', count: '9+ Items' },
    { id: 11, name: 'Mexican Food', image: '/m7.jpg', count: '11+ Items' },
    { id: 12, name: 'Pasta', image: '/m8.jpg', count: '16+ Items' },
  ];

  // Sample food items to display below categories
  const featuredFoods = [
    { id: 1, name: 'Meat Pizza', restaurant: 'Hungry Puppets', price: '$370.00', oldPrice: '$400.00', rating: 4.8, reviews: 5, image: '/m1.jpg', discount: '30% OFF' },
    { id: 2, name: 'MAPO TOFU', restaurant: 'Frying Nemo', price: '$310.00', oldPrice: '$340.00', rating: 4.0, reviews: 2, image: '/m2.jpg', discount: '30% OFF' },
    { id: 3, name: 'Mutton Biriyani', restaurant: 'Café Monarch', price: '$225.00', oldPrice: '$250.00', rating: 5.0, reviews: 1, image: '/m7.jpg', discount: '10% OFF' },
    { id: 4, name: 'CROISSANTS', restaurant: 'Café Monarch', price: '$47.50', oldPrice: '$50.00', rating: 4.0, reviews: 1, image: '/m8.jpg', discount: '5% OFF' },
    { id: 5, name: 'Cheese Pizza', restaurant: 'Hungry Puppets', price: '$232.50', oldPrice: '$250.00', rating: 4.0, reviews: 1, image: '/m1.jpg', discount: '7% OFF' },
    { id: 6, name: 'Meat Chili Taco', restaurant: 'Frying Nemo', price: '$25.50', oldPrice: '$27.00', rating: 5.0, reviews: 1, image: '/m2.jpg', discount: '5% OFF' },
  ];

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5EE] via-[#FFF8F3] to-[#FFEDDF] text-gray-800 font-sans selection:bg-orange-500 selection:text-white flex flex-col justify-between">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,700;0,9..144,900;1,9..144,600&family=Work+Sans:wght@400;500;600;700;800&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }
      `}</style>

      <div>
        <Navbar />

        {/* --- HEADER BANNER / SEARCH BAR SECTION --- */}
        <div className="bg-[#F8F3EF] border-b border-orange-200/60 py-8 px-6 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                Categories
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1 italic font-medium">
                "Discover delicious meals and order your favorite cravings instantly."
              </p>
            </div>

            <div className="relative w-full md:w-96">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Search by category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-orange-200/80 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition-all"
              />
            </div>
          </div>
        </div>

        {/* --- CATEGORIES GRID (12 Items, 2 Rows on Desktop) --- */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Utensils className="w-12 h-12 text-orange-400 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-gray-700">No categories found</h3>
              <p className="text-gray-500 text-sm">Try searching for something else.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {filteredCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/login`}
                  className="group bg-white rounded-2xl p-5 shadow-sm border border-orange-100 hover:border-orange-400 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-1.5"
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md mb-4 bg-orange-50 relative group-hover:scale-110 transition-transform duration-500">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-orange-950/10 group-hover:bg-transparent transition-colors"></div>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-orange-600 transition-colors mb-1">
                    {category.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-gray-400">
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* --- POPULAR FOODS UNDER CATEGORIES SECTION --- */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                  Best Reviewed Food
                </h2>
                <p className="text-sm text-gray-600 mt-1">Savor the highest-rated dishes from top local restaurants</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {featuredFoods.map((food) => (
                <Link
                  key={food.id}
                  to="/login"
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-orange-100 hover:border-orange-400 hover:shadow-xl transition-all duration-300 flex flex-col relative"
                >
                  {/* Discount Badge */}
                  <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                    {food.discount}
                  </span>

                  {/* Favorite Icon */}
                  <span className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-1.5 rounded-full text-gray-400 group-hover:text-red-500 transition-colors shadow">
                    <Heart className="w-3.5 h-3.5" />
                  </span>

                  {/* Image container */}
                  <div className="h-40 w-full overflow-hidden relative bg-orange-50">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-gray-400 block mb-0.5">
                        {food.restaurant}
                      </span>
                      <h3 className="font-bold text-sm text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                        {food.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mt-1.5 text-xs text-gray-600">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="font-bold">{food.rating}</span>
                        <span className="text-gray-400">({food.reviews})</span>
                      </div>
                    </div>

                    {/* Pricing & Add button */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-400 line-through block">{food.oldPrice}</span>
                        <span className="text-sm font-black text-orange-600">{food.price}</span>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors shadow-sm">
                        <Plus className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* --- FOOTER SECTION --- */}
      <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="bg-orange-600 text-white p-2 rounded-xl shadow-md">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                ማእድ <span className="text-orange-500 font-medium text-sm">Ma'ad</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Discover delicious meals and order instantly from the best local restaurants around you.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
              <li><Link to="/categories" className="hover:text-orange-500 transition-colors">Categories</Link></li>
              <li><Link to="/#about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/#contact" className="hover:text-orange-500 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide">Legal & Privacy</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/#privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/#terms" className="hover:text-orange-500 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/#cookies" className="hover:text-orange-500 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Adama, Ethiopia</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>+251 900 000 000</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>support@maad.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ማእድ Ma'ad Restaurant Management System. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>for food lovers.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}