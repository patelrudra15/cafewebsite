"use client"
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import { FiMenu, FiX, FiArrowRight, FiInstagram, FiFacebook, FiTwitter, FiShoppingCart, FiPlus, FiMinus,FiCoffee,FiLink } from 'react-icons/fi';
import { useScroll, useMotionValueEvent } from 'framer-motion';

const menuItems = [
  {
    id: 1,
    name: 'Espresso',
    description: 'Strong black coffee made by forcing steam through ground coffee beans',
    category: 'Coffee',
    image: '/front-view-cup-cappuccino-with-cookies-book-table.jpg',
    prices: { small: 2.50, medium: 3.00, large: 3.50 }
  },
  {
    id: 2,
    name: 'Cappuccino',
    description: 'Espresso with steamed milk foam',
    category: 'Coffee',
    image: '/cup-coffee-with-heart-drawn-foam.jpg',
    prices: { small: 3.00, medium: 3.50, large: 4.00 }
  },
  {
    id: 3,
    name: 'Latte',
    description: 'Espresso with a lot of steamed milk and a small amount of foam',
    category: 'Coffee',
    image: '/view-3d-coffee-cup.jpg',
    prices: { small: 3.50, medium: 4.00, large: 4.50 }
  },
  {
    id: 4,
    name: 'Americano',
    description: 'Espresso diluted with hot water',
    category: 'Coffee',
    image: '/cup-coffee-white-saucer.jpg',
    prices: { small: 2.50, medium: 3.00, large: 3.50 }
  },
  {
    id: 5,
    name: 'Mocha',
    description: 'Espresso with chocolate and steamed milk',
    category: 'Coffee',
    image: '/cold-chocolate-cocktail-with-ice-cream.jpg',
    prices: { small: 3.75, medium: 4.25, large: 4.75 }
  },
  {
    id: 6,
    name: 'Flat White',
    description: 'Espresso with microfoam steamed milk',
    category: 'Coffee',
    image: '/flatwhite.png',
    prices: { small: 3.25, medium: 3.75, large: 4.25 }
  },
  {
    id: 7,
    name: 'Iced Coffee',
    description: 'Chilled coffee served with ice',
    category: 'Cold Drinks',
    image: '/iced-coffee-latte.jpg',
    prices: { medium: 3.50, large: 4.00 }
  },
  {
    id: 8,
    name: 'Cold Brew',
    description: 'Slow-steeped coffee served cold',
    category: 'Cold Drinks',
    image: '/milk-pouring-into-glass-with-coffee.jpg',
    prices: { medium: 4.00, large: 4.50 }
  },
  {
    id: 9,
    name: 'Iced Latte',
    description: 'Espresso with cold milk over ice',
    category: 'Cold Drinks',
    image: '/aromatic-frappuccino-table.jpg',
    prices: { medium: 4.00, large: 4.50 }
  },
  {
    id: 10,
    name: 'Lemonade',
    description: 'Refreshing lemon drink',
    category: 'Cold Drinks',
    image: '/lemonade-glass.jpg',
    prices: { small: 2.50, medium: 3.00, large: 3.50 }
  },
  {
    id: 11,
    name: 'Iced Tea',
    description: 'Freshly brewed tea served chilled',
    category: 'Cold Drinks',
    image: '/iced-tea.jpg',
    prices: { medium: 2.75, large: 3.25 }
  },
  {
    id: 12,
    name: 'Avocado Toast',
    description: 'Toasted bread topped with mashed avocado',
    category: 'Breakfast',
    image: '/avocado-toast.jpg',
    prices: { medium: 6.50 }
  },
  {
    id: 13,
    name: 'Croissant',
    description: 'Buttery, flaky pastry',
    category: 'Breakfast',
    image: '/croissants.jpg',
    prices: { small: 2.50, medium: 3.00 }
  },
  {
    id: 14,
    name: 'Bagel with Cream Cheese',
    description: 'Fresh bagel with choice of cream cheese',
    category: 'Breakfast',
    image: '/bagel-cream-cheese.jpg',
    prices: { medium: 4.50 }
  },
  {
    id: 15,
    name: 'Breakfast Sandwich',
    description: 'Egg, cheese and choice of meat on a croissant',
    category: 'Breakfast',
    image: '/breakfast-sandwich.jpg',
    prices: { medium: 7.00 }
  },
  {
    id: 16,
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with frosting',
    category: 'Desserts',
    image: '/chocolate-cake.jpg',
    prices: { small: 4.00, medium: 5.00 }
  },
  {
    id: 17,
    name: 'Cheesecake',
    description: 'Classic New York style cheesecake',
    category: 'Desserts',
    image: '/cheesecake-slice.jpg',
    prices: { small: 4.50, medium: 5.50 }
  },
  {
    id: 18,
    name: 'Tiramisu',
    description: 'Italian coffee-flavored dessert',
    category: 'Desserts',
    image: '/tiramisu-dessert.jpg',
    prices: { small: 5.00, medium: 6.00 }
  },
  {
    id: 19,
    name: 'Chocolate Chip Cookie',
    description: 'Freshly baked cookie with chocolate chips',
    category: 'Desserts',
    image: '/chocolate-chip-cookie.jpg',
    prices: { small: 2.00, medium: 2.50 }
  },
  {
    id: 20,
    name: 'Cinnamon Roll',
    description: 'Sweet roll with cinnamon sugar filling',
    category: 'Desserts',
    image: '/cinnamon-roll.jpg',
    prices: { medium: 3.50 }
  },
];

const categories = [...new Set(menuItems.map(item => item.category))];

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Menu");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navRef = useRef(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/Menu" },
    { name: "About", path: "/About" },
    { name: "Contact", path: "/Contact" },
  ];

  const filteredItems = selectedCategory 
    ? menuItems.filter(item => item.category === selectedCategory)
    : menuItems;

  const addToCart = (item, size) => {
    const price = item.prices[size] || 0;
    const existingItem = cart.find(cartItem => 
      cartItem.item.id === item.id && cartItem.size === size
    );

    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.item.id === item.id && cartItem.size === size
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { item, size, price, quantity: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
    } else {
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="bg-cafe-light min-h-screen relative overflow-x-hidden">
      <Head>
        <title>Espreso | Premium Artisan Cafe - Menu</title>
        <meta name="description" content="Explore our handcrafted coffee & pastries menu" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* ===== ANIMATED NAVBAR ===== */}
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-white shadow-xl py-2" : "bg-white/90 py-4"}`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer group"
          >
            <motion.div
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.6 }}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cafe-gold flex items-center justify-center shadow-lg"
            >
              <FiCoffee className="text-black text-lg sm:text-xl" />
            </motion.div>
            <motion.span 
              className="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold text-black group-hover:text-cafe-gold transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Espreso
            </motion.span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 lg:space-x-8 relative">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                className="relative"
              >
                <motion.a
                  href={link.path}
                  onClick={() => setActiveLink(link.name)}
                  className={`relative z-10 text-base lg:text-lg ${activeLink === link.name ? 'text-cafe-gold' : 'text-black'} hover:text-cafe-gold transition-colors px-2 py-1`}
                  whileHover={{ 
                    color: "#D4A762",
                  }}
                >
                  {link.name}
                </motion.a>
                
                {activeLink === link.name && (
                  <motion.div 
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-cafe-gold"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Cart and Mobile Menu Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-1 sm:p-2"
            >
              <FiShoppingCart className="text-black text-lg sm:text-xl" />
              {cart.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-cafe-gold text-black text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"
                >
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </motion.span>
              )}
            </motion.button>

            <motion.button
              className="md:hidden text-black text-xl sm:text-2xl relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 }
                }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <FiMenu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-md overflow-hidden"
            >
              <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col space-y-4 sm:space-y-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.path}
                    onClick={() => {
                      setActiveLink(link.name);
                      setIsMenuOpen(false);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`text-lg sm:text-xl ${activeLink === link.name ? 'text-cafe-gold' : 'text-black'} py-2 border-b border-black/10`}
                  >
                    <motion.span 
                      whileHover={{ x: 10 }}
                      className="flex items-center"
                    >
                      <FiArrowRight className="mr-2 sm:mr-3 text-cafe-gold" />
                      {link.name}
                    </motion.span>
                  </motion.a>
                ))}
                
                <motion.div 
                  className="flex space-x-4 sm:space-x-6 pt-3 sm:pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {[FiInstagram, FiFacebook, FiTwitter].map((Icon, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-black hover:text-cafe-gold text-lg sm:text-xl"
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ===== MENU CONTENT ===== */}
      <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 relative">
        <div className="container mx-auto">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-8 sm:mb-12 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#D4A762" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(null)}
              className={`px-4 sm:px-6 py-1 sm:py-2 rounded-full text-sm sm:text-base ${!selectedCategory ? 'bg-cafe-gold text-black' : 'bg-cafe-light text-cafe-brown'}`}
            >
              All Items
            </motion.button>
            {categories.map(category => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05, backgroundColor: "#D4A762" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-1 sm:py-2 rounded-full text-sm sm:text-base ${selectedCategory === category ? 'bg-cafe-gold text-black' : 'bg-cafe-light text-cafe-brown'}`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {selectedItem ? (
              // Item Detail View
              <motion.div
                key="item-detail"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden"
              >
                <div className="md:flex">
                  <motion.div 
                    className="md:w-1/2 relative h-48 sm:h-64 md:h-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Image
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <motion.button
                      onClick={() => setSelectedItem(null)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/80 hover:bg-white text-cafe-gold p-1 sm:p-2 rounded-full shadow-lg"
                    >
                      <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                  </motion.div>

                  <div className="p-4 sm:p-6 md:w-1/2">
                    <motion.h1 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-2xl sm:text-3xl font-bold text-cafe-dark mb-1 sm:mb-2"
                    >
                      {selectedItem.name}
                    </motion.h1>
                    
                    <motion.p 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-sm sm:text-base text-cafe-brown mb-4 sm:mb-6"
                    >
                      {selectedItem.description}
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mb-6 sm:mb-8"
                    >
                      <h2 className="text-lg sm:text-xl font-semibold text-cafe-dark mb-3 sm:mb-4">Sizes & Prices</h2>
                      <div className="space-y-2 sm:space-y-3">
                        {Object.entries(selectedItem.prices).map(([size, price]) => (
                          <motion.div
                            key={size}
                            whileHover={{ scale: 1.02 }}
                            className="flex justify-between items-center bg-cafe-light p-3 sm:p-4 rounded-lg"
                          >
                            <div>
                              <span className="capitalize font-medium text-sm sm:text-base text-cafe-dark">{size}</span>
                            </div>
                            <div className="flex items-center space-x-3 sm:space-x-4">
                              <span className="font-bold text-sm sm:text-base text-cafe-dark">${price.toFixed(2)}</span>
                              <motion.button
                                onClick={() => addToCart(selectedItem, size)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-cafe-gold hover:bg-cafe-brown text-black px-2 sm:px-3 py-1 rounded-lg shadow-md text-sm sm:text-base"
                              >
                                Add
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.button
                      onClick={() => setSelectedItem(null)}
                      whileHover={{ scale: 1.05, backgroundColor: "#f5ebe0" }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium flex items-center justify-center text-black text-sm sm:text-base"
                    >
                      Back to Menu
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Main Menu View
              <motion.div
                key="menu-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h1 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl sm:text-4xl font-bold text-cafe-dark mb-6 sm:mb-8 text-center"
                >
                  Our Menu
                </motion.h1>

                {/* Menu Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index }}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md overflow-hidden cursor-pointer group"
                      onClick={() => setSelectedItem(item)}
                      layoutId={`card-${item.id}`}
                    >
                      <div className="relative h-40 sm:h-48 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                          <h2 className="text-lg sm:text-xl font-bold text-white">{item.name}</h2>
                          <p className="text-cafe-gold text-xs sm:text-sm">{item.category}</p>
                        </div>
                      </div>
                      <div className="p-3 sm:p-4">
                        <p className="text-sm sm:text-base text-cafe-brown mb-2 sm:mb-3 line-clamp-2">{item.description}</p>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {Object.entries(item.prices).map(([size, price]) => (
                            <motion.span 
                              key={size}
                              whileHover={{ scale: 1.05 }}
                              className="bg-cafe-light text-cafe-dark text-xs px-2 sm:px-3 py-1 rounded-full"
                            >
                              {size}: ${price.toFixed(2)}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-cafe-dark">Your Order</h2>
                  <motion.button
                    onClick={() => setIsCartOpen(false)}
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-500 hover:text-cafe-gold"
                  >
                    <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>
                </div>

                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8 sm:py-12"
                  >
                    <FiShoppingCart className="mx-auto text-gray-300 w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                    <motion.button
                      onClick={() => setIsCartOpen(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-3 sm:mt-4 bg-cafe-gold text-black px-4 sm:px-6 py-1 sm:py-2 rounded-lg text-sm sm:text-base"
                    >
                      Browse Menu
                    </motion.button>
                  </motion.div>
                ) : (
                  <>
                    <div className="divide-y">
                      {cart.map((item, index) => (
                        <motion.div
                          key={`${item.item.id}-${item.size}-${index}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          className="py-3 sm:py-4 flex justify-between items-center"
                        >
                          <div>
                            <h3 className="font-medium text-sm sm:text-base text-cafe-dark">{item.item.name}</h3>
                            <p className="text-xs sm:text-sm text-cafe-brown capitalize">{item.size} size</p>
                          </div>
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="flex items-center space-x-2">
                              <motion.button
                                onClick={() => removeFromCart(index)}
                                whileTap={{ scale: 0.8 }}
                                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-cafe-light text-cafe-dark flex items-center justify-center"
                              >
                                <FiMinus className="w-2 h-2 sm:w-3 sm:h-3" />
                              </motion.button>
                              <span className="w-5 sm:w-6 text-center text-sm sm:text-base">{item.quantity}</span>
                              <motion.button
                                onClick={() => addToCart(item.item, item.size)}
                                whileTap={{ scale: 0.8 }}
                                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-cafe-gold text-black flex items-center justify-center"
                              >
                                <FiPlus className="w-2 h-2 sm:w-3 sm:h-3" />
                              </motion.button>
                            </div>
                            <span className="font-medium w-12 sm:w-16 text-right text-sm sm:text-base">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
                      <div className="flex justify-between mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm text-cafe-brown">Subtotal</span>
                        <span className="font-medium text-sm sm:text-base">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2 sm:mb-4">
                        <span className="text-xs sm:text-sm text-cafe-brown">Tax</span>
                        <span className="font-medium text-sm sm:text-base">${(cartTotal * 0.1).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-base sm:text-lg font-bold">
                        <span>Total</span>
                        <span>${(cartTotal * 1.1).toFixed(2)}</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(212, 167, 98, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-cafe-gold hover:bg-cafe-brown text-black py-2 sm:py-3 rounded-lg font-bold mt-4 sm:mt-6 text-sm sm:text-base"
                    >
                      Checkout
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== ADVANCED FOOTER ===== */}
      <footer className="bg-black text-white pt-12 pb-6 sm:pt-16 sm:pb-8 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            {/* Brand info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <motion.div
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cafe-gold flex items-center justify-center shadow-lg"
                >
                  <FiCoffee className="text-lg sm:text-xl text-black" />
                </motion.div>
                <h3 className="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold">Espreso</h3>
              </div>
              <p className="mb-2 sm:mb-4 text-sm sm:text-base">123 Coffee Lane, Beanville</p>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base">Open daily 7am-7pm</p>
              
              {/* Newsletter signup */}
              <div className="mt-4 sm:mt-6">
                <h4 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">Join Our Newsletter</h4>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="bg-black/50 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-l-full focus:outline-none focus:ring-2 focus:ring-cafe-gold w-full border border-white/20 text-sm sm:text-base"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-amber-800 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-r-full font-medium text-sm sm:text-base"
                  >
                    Join
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Quick links with animated hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 relative inline-block">
                Explore
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-cafe-gold"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                />
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {["Menu", "About Us", "Gallery", "Events", "Contact"].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <a 
                      href="#" 
                      className="hover:text-cafe-gold transition-colors flex items-center group text-sm sm:text-base"
                    >
                      <motion.span 
                        whileHover={{ x: 5 }}
                        className="flex items-center"
                      >
                        <FiArrowRight className="mr-2 text-cafe-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                        {item}
                      </motion.span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 relative inline-block">
                Contact
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-cafe-gold"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                />
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                <motion.li 
                  className="flex items-start text-sm sm:text-base"
                  whileHover={{ x: 5 }}
                >
                  <FiLink className="mt-0.5 sm:mt-1 mr-2 sm:mr-3 text-cafe-gold" />
                  <div>
                    <p>info@espresso.com</p>
                    <p className="text-xs sm:text-sm text-white/60">Email us</p>
                  </div>
                </motion.li>
                
                <motion.li 
                  className="flex items-start text-sm sm:text-base"
                  whileHover={{ x: 5 }}
                >
                  <FiLink className="mt-0.5 sm:mt-1 mr-2 sm:mr-3 text-cafe-gold" />
                  <div>
                    <p>+1 (555) 123-4567</p>
                    <p className="text-xs sm:text-sm text-white/60">Call us</p>
                  </div>
                </motion.li>
              </ul>
            </motion.div>

            {/* Social media with interactive icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 relative inline-block">
                Follow Us
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-cafe-gold"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                />
              </h4>
              <div className="flex space-x-3 sm:space-x-4 mb-6 sm:mb-8">
                {[
                  { icon: <FiInstagram />, name: "Instagram" },
                  { icon: <FiFacebook />, name: "Facebook" },
                  { icon: <FiTwitter />, name: "Twitter" }
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -5,
                      color: "#D4A762",
                      scale: 1.1,
                      backgroundColor: "rgba(212, 167, 98, 0.1)"
                    }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-lg sm:text-xl hover:border-cafe-gold transition-all"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Copyright with animated divider */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-white/10 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-white/60 text-xs sm:text-sm"
          >
            <p>© {new Date().getFullYear()} Espreso. All rights reserved.</p>
            <div className="flex justify-center space-x-3 sm:space-x-4 mt-2 sm:mt-4">
              <a href="#" className="hover:text-cafe-gold transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-cafe-gold transition-colors">Terms of Service</a>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}