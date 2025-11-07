import React, { useState } from 'react';
import { ShoppingCart, Search, Star, Clock, MapPin, Phone, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

export default function RestaurantApp() {
  const [currentView, setCurrentView] = useState('home');
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'pizza', name: 'Pizza', icon: '🍕' },
    { id: 'burger', name: 'Burgers', icon: '🍔' },
    { id: 'sushi', name: 'Sushi', icon: '🍱' },
    { id: 'dessert', name: 'Desserts', icon: '🍰' },
    { id: 'drinks', name: 'Drinks', icon: '🥤' }
  ];

  const menuItems = [
    { id: 1, name: 'Margherita Pizza', price: 12.99, category: 'pizza', rating: 4.8, time: '20-30 min', image: '🍕', description: 'Classic Italian pizza with fresh mozzarella' },
    { id: 2, name: 'Pepperoni Pizza', price: 14.99, category: 'pizza', rating: 4.9, time: '20-30 min', image: '🍕', description: 'Loaded with premium pepperoni' },
    { id: 3, name: 'Classic Burger', price: 10.99, category: 'burger', rating: 4.7, time: '15-20 min', image: '🍔', description: 'Juicy beef patty with fresh vegetables' },
    { id: 4, name: 'Cheese Burger', price: 11.99, category: 'burger', rating: 4.8, time: '15-20 min', image: '🍔', description: 'Double cheese with secret sauce' },
    { id: 5, name: 'Salmon Sushi', price: 18.99, category: 'sushi', rating: 4.9, time: '25-35 min', image: '🍱', description: 'Fresh salmon nigiri and rolls' },
    { id: 6, name: 'California Roll', price: 15.99, category: 'sushi', rating: 4.6, time: '25-35 min', image: '🍱', description: 'Classic California roll with avocado' },
    { id: 7, name: 'Chocolate Cake', price: 6.99, category: 'dessert', rating: 4.9, time: '5-10 min', image: '🍰', description: 'Rich chocolate layer cake' },
    { id: 8, name: 'Cheesecake', price: 7.99, category: 'dessert', rating: 4.8, time: '5-10 min', image: '🍰', description: 'New York style cheesecake' },
    { id: 9, name: 'Fresh Juice', price: 4.99, category: 'drinks', rating: 4.7, time: '5 min', image: '🥤', description: 'Freshly squeezed orange juice' },
    { id: 10, name: 'Smoothie', price: 5.99, category: 'drinks', rating: 4.8, time: '5 min', image: '🥤', description: 'Mixed berry smoothie' }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? {...c, quantity: c.quantity + 1} : c));
    } else {
      setCart([...cart, {...item, quantity: 1}]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(c => c.id !== itemId));
  };

  const updateQuantity = (itemId, change) => {
    setCart(cart.map(c => {
      if (c.id === itemId) {
        const newQty = c.quantity + change;
        return newQty > 0 ? {...c, quantity: newQty} : c;
      }
      return c;
    }).filter(c => c.quantity > 0));
  };

  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(f => f !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🍽️</div>
              <div>
                <h1 className="text-2xl font-bold">Delicious Bites</h1>
                <p className="text-sm opacity-90">Fast & Fresh Delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setCurrentView('favorites')}
                className="relative hover:scale-110 transition-transform"
              >
                <Heart className={favorites.length > 0 ? "fill-white" : ""} />
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-orange-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setCurrentView('cart')}
                className="relative hover:scale-110 transition-transform"
              >
                <ShoppingCart />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-orange-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {currentView === 'home' && (
          <>
            {/* Restaurant Info Banner */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="fill-yellow-400 text-yellow-400" size={20} />
                    <span className="font-bold text-lg">4.8</span>
                    <span className="text-gray-600">(500+ reviews)</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>25-35 min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>2.5 km away</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone size={16} />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                </div>
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
                  Open Now
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-orange-500 outline-none text-lg"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex flex-col items-center gap-2 px-6 py-4 rounded-2xl font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:shadow-md'
                  }`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-sm">{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105">
                  <div className="relative">
                    <div className="text-8xl flex items-center justify-center h-48 bg-gradient-to-br from-orange-100 to-red-100">
                      {item.image}
                    </div>
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
                    >
                      <Heart
                        size={20}
                        className={favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="fill-yellow-400 text-yellow-400" size={16} />
                        <span className="font-semibold text-sm">{item.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock size={16} />
                        <span className="text-sm">{item.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-orange-600">${item.price}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {currentView === 'cart' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button
                onClick={() => setCurrentView('home')}
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                ← Continue Shopping
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-gray-600 text-lg">Your cart is empty</p>
              </div>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border-b last:border-b-0">
                    <div className="text-5xl">{item.image}</div>
                    <div className="flex-1">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-orange-600 font-semibold">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                      >
                        −
                      </button>
                      <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2 text-red-500 hover:text-red-600 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mt-6 pt-6 border-t-2">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">Total:</span>
                    <span className="text-3xl font-bold text-orange-600">${totalAmount.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all hover:scale-105">
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {currentView === 'favorites' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Favorites</h2>
              <button
                onClick={() => setCurrentView('home')}
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                ← Back to Menu
              </button>
            </div>

            {favorites.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">❤️</div>
                <p className="text-gray-600 text-lg">No favorites yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.filter(item => favorites.includes(item.id)).map(item => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-red-200">
                    <div className="text-8xl flex items-center justify-center h-48 bg-gradient-to-br from-orange-100 to-red-100">
                      {item.image}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-xl mb-2">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-orange-600">${item.price}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}