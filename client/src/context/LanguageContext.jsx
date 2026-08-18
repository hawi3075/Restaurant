import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

// Translation dictionary
const translations = {
  en: {
    // Common
    home: 'Home',
    categories: 'Categories',
    restaurants: 'Restaurants',
    about: 'About Us',
    contact: 'Contact',
    search: 'Search',
    loading: 'Loading...',
    
    // Navigation
    profile: 'Profile',
    myOrders: 'My Orders',
    myAddress: 'My Address',
    language: 'Language',
    helpSupport: 'Help & Support',
    liveChat: 'Live Chat',
    logout: 'Logout',
    
    // Orders
    orderHistory: 'Order History',
    allOrders: 'All Orders',
    activeOrders: 'Active',
    completedOrders: 'Completed',
    cancelledOrders: 'Cancelled',
    orderTotal: 'Order Total',
    orderPlaced: 'Order Placed',
    
    // Cart & Checkout
    cart: 'Cart',
    checkout: 'Checkout',
    addToCart: 'Add to Cart',
    quantity: 'Quantity',
    subtotal: 'Subtotal',
    deliveryFee: 'Delivery Fee',
    total: 'Total',
    placeOrder: 'Place Order',
    
    // Restaurant
    viewMenu: 'View Menu',
    rating: 'Rating',
    reviews: 'Reviews',
    deliveryTime: 'Delivery Time',
    minOrder: 'Minimum Order',
  },
  am: {
    // Common (Amharic)
    home: 'ዋና ገጽ',
    categories: 'ምድቦች',
    restaurants: 'ምግብ ቤቶች',
    about: 'ስለ እኛ',
    contact: 'አግኙን',
    search: 'ፈልግ',
    loading: 'በመጫን ላይ...',
    
    // Navigation
    profile: 'መገለጫ',
    myOrders: 'ትዕዛዞቼ',
    myAddress: 'አድራሻዬ',
    language: 'ቋንቋ',
    helpSupport: 'እገዛ እና ድጋፍ',
    liveChat: 'ቀጥታ ውይይት',
    logout: 'ውጣ',
    
    // Orders
    orderHistory: 'የትዕዛዝ ታሪክ',
    allOrders: 'ሁሉም ትዕዛዞች',
    activeOrders: 'ነቃ',
    completedOrders: 'የተጠናቀቀ',
    cancelledOrders: 'ተሰርዟል',
    orderTotal: 'አጠቃላይ ዋጋ',
    orderPlaced: 'ትዕዛዝ ቀርቧል',
    
    // Cart & Checkout
    cart: 'ጋሪ',
    checkout: 'ግዢን ማጠናቀቅ',
    addToCart: 'ወደ ጋሪ አክል',
    quantity: 'ብዛት',
    subtotal: 'ንዑስ ድምር',
    deliveryFee: 'የማድረሻ ክፍያ',
    total: 'ጠቅላላ',
    placeOrder: 'ትዕዛዝ ያስገቡ',
    
    // Restaurant
    viewMenu: 'ምናሌ ይመልከቱ',
    rating: 'ደረጃ',
    reviews: 'ግምገማዎች',
    deliveryTime: 'የማድረሻ ጊዜ',
    minOrder: 'ዝቅተኛ ትዕዛዝ',
  },
  om: {
    // Common (Afaan Oromo)
    home: 'Fuula Dura',
    categories: 'Ramaddoota',
    restaurants: 'Mana Nyaataa',
    about: 'Waa\'ee Keenya',
    contact: 'Nu Quunnamaa',
    search: 'Barbaadi',
    loading: 'Fe\'aa jira...',
    
    // Navigation
    profile: 'Ibsa',
    myOrders: 'Ajaja Koo',
    myAddress: 'Teessoo Koo',
    language: 'Afaan',
    helpSupport: 'Gargaarsa',
    liveChat: 'Haasaa Kallattii',
    logout: 'Ba\'i',
    
    // Orders
    orderHistory: 'Seenaa Ajajaa',
    allOrders: 'Ajaja Hunda',
    activeOrders: 'Hojii Irra Jiru',
    completedOrders: 'Xumurame',
    cancelledOrders: 'Haqame',
    orderTotal: 'Gatii Guutuu',
    orderPlaced: 'Ajajni Galmeeffame',
    
    // Cart & Checkout
    cart: 'Gaarii',
    checkout: 'Bifa',
    addToCart: 'Gara Gaarii Itti Dabaluu',
    quantity: 'Baay\'ina',
    subtotal: 'Walakkeessaa',
    deliveryFee: 'Kaffaltii Geejjibaa',
    total: 'Ida\'ama',
    placeOrder: 'Ajaja Galmeessuu',
    
    // Restaurant
    viewMenu: 'Menu Ilaaluu',
    rating: 'Sadarkaa',
    reviews: 'Gamaaggama',
    deliveryTime: 'Yeroo Geejjibaa',
    minOrder: 'Ajaja Gadi Aanaa',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
    }
  };

  const t = (key) => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
