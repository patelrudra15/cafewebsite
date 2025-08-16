"use client"
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FiMenu, FiX, FiArrowRight, FiInstagram, FiFacebook, FiTwitter, FiLink, FiCoffee, FiClock, FiMapPin } from "react-icons/fi";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveredLink, setHoveredLink] = useState(null);
  const navRef = useRef(null);

  // Custom cursor effect for navbar links
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll effect for navbar
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

  // Feature cards data
  const features = [
    {
      icon: <FiCoffee className="w-8 h-8 text-cafe-gold" />,
      title: "Artisan Coffee",
      description: "Small-batch roasted beans from sustainable farms",
      delay: 0.1
    },
    {
      icon: <FiClock className="w-8 h-8 text-cafe-gold" />,
      title: "Open Late",
      description: "We're here for your late-night coffee cravings",
      delay: 0.2
    },
    {
      icon: <FiMapPin className="w-8 h-8 text-cafe-gold" />,
      title: "Cozy Space",
      description: "Designed for productivity and relaxation",
      delay: 0.3
    }
  ];

  return (
    <div className="bg-white min-h-screen relative overflow-x-hidden">
      <Head>
        <title>Espreso | Premium Artisan Cafe</title>
        <meta name="description" content="Experience handcrafted coffee & pastries in a cozy atmosphere" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* ===== ANIMATED NAVBAR WITH CUSTOM CURSOR EFFECT ===== */}
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-white shadow-xl py-2" : "bg-white/90 py-4"}`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo with 3D hover effect */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer group"
          >
            <motion.div
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 rounded-full bg-cafe-gold flex items-center justify-center shadow-lg"
            >
              <FiCoffee className="text-black text-xl" />
            </motion.div>
            <motion.span
              className="ml-3 text-2xl font-bold text-black group-hover:text-cafe-gold transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Espreso
            </motion.span>
          </motion.div>

          {/* Desktop Menu with Magnetic Links */}
          <div className="hidden md:flex space-x-8 relative">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                className="relative"
                onMouseEnter={() => setHoveredLink(link)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <motion.a
                  href={link.path}
                  onClick={() => setActiveLink(link.name)}
                  className={`relative z-10 text-lg ${activeLink === link.name ? 'text-black' : 'text-black'} hover:text-cafe-gold transition-colors px-2 py-1`}
                  whileHover={{
                    color: "#D4A762",
                  }}
                >
                  {link.name}
                </motion.a>

                {/* Animated underline */}
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

          {/* Mobile Menu Button with Morphing Animation */}
          <motion.button
            className="md:hidden text-black text-2xl relative z-50"
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
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu Dropdown with Staggered Animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-md overflow-hidden"
            >
              <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
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
                    className={`text-lg ${activeLink === link.name ? 'text-cafe-gold' : 'text-black'} py-2 border-b border-black/10`}
                  >
                    <motion.span
                      whileHover={{ x: 10 }}
                      className="flex items-center"
                    >
                      <FiArrowRight className="mr-3 text-cafe-gold" />
                      {link.name}
                    </motion.span>
                  </motion.a>
                ))}

                {/* Social links in mobile menu */}
                <motion.div
                  className="flex space-x-6 pt-4"
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
                      className="text-black hover:text-cafe-gold text-xl"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ===== ENHANCED HERO SECTION ===== */}
      <section id="home" className="pt-24 pb-12 px-4 sm:px-6 relative">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="md:w-1/2 order-2 md:order-1 mt-8 md:mt-0"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-4 md:mb-6 leading-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Crafted <span className="text-cafe-gold">Perfection</span> in Every Cup
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-black mb-6 md:mb-8 max-w-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Discover the art of specialty coffee with our hand-selected beans and masterfully crafted beverages.
            </motion.p>

            <motion.div
              className="flex gap-4 flex-wrap"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#A79277",
                  boxShadow: "0 10px 25px -5px rgba(166, 146, 119, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg font-medium flex items-center text-sm sm:text-base"
                onClick={() => window.location.href = "/Menu"}
              >
                Explore Menu
                <FiArrowRight className="ml-2" />
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="md:w-1/2 relative order-1 md:order-2"
          >
            <div className="relative w-full h-64 sm:h-80 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/3d-rendering-cartoon-welcome-door.jpg"
                alt="Artisan Coffee"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="/images/coffee-hero.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/30"></div>

              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute top-4 right-4 bg-cafe-gold text-black px-3 py-1 sm:px-4 sm:py-2 rounded-full font-bold shadow-lg text-sm sm:text-base"
              >
                Since 2010
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="about" className="py-12 sm:py-16 px-4 sm:px-6 bg-cafe-light/50">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-3 sm:mb-4">Why Choose Espreso</h2>
            <p className="text-black max-w-2xl mx-auto text-sm sm:text-base">
              We're committed to excellence in every aspect of your coffee experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full text-black bg-cafe-gold/10 flex items-center justify-center mb-4 sm:mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-black text-sm sm:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ADVANCED FOOTER ===== */}
      <footer className="bg-black text-white pt-12 pb-6 sm:pt-16 sm:pb-8 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* Brand info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <motion.div
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cafe-gold flex items-center justify-center shadow-lg"
                >
                  <FiCoffee className="text-lg sm:text-xl text-black" />
                </motion.div>
                <h3 className="ml-3 text-xl sm:text-2xl font-bold">Espreso</h3>
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
                    className="text-sm sm:text-base"
                  >
                    <a
                      href="#"
                      className="hover:text-cafe-gold transition-colors flex items-center group"
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
                  <FiLink className="mt-1 mr-3 text-cafe-gold" />
                  <div>
                    <p>info@espresso.com</p>
                    <p className="text-xs sm:text-sm text-white/60">Email us</p>
                  </div>
                </motion.li>

                <motion.li
                  className="flex items-start text-sm sm:text-base"
                  whileHover={{ x: 5 }}
                >
                  <FiLink className="mt-1 mr-3 text-cafe-gold" />
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
            <div className="flex justify-center space-x-3 sm:space-x-4 mt-3 sm:mt-4">
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