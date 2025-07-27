"use client"
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FiMenu, FiX, FiArrowRight, FiInstagram, FiFacebook, FiTwitter, FiUsers, FiAward, FiCoffee, FiChevronLeft, FiChevronRight, FiLink, FiMapPin } from "react-icons/fi";

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("About");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveredLink, setHoveredLink] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navRef = useRef(null);
  const slideInterval = useRef(null);

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

  // Slideshow images
  const slides = [
    {
      image: "/lavender-latte.jpg",
      title: "Artisan Coffee Creations",
      subtitle: "Handcrafted with passion and precision"
    },
    {
      image: "/image1.png",
      title: "Our Cozy Space",
      subtitle: "Designed for comfort and conversation"
    },
    {
      image: "/female-barista-prepares-espresso-from-coffee-machine-caf.jpg",
      title: "Masterful Preparation",
      subtitle: "Every cup tells a story"
    },
    {
      image: "/coffee-beans-background.jpg",
      title: "Premium Quality Beans",
      subtitle: "Ethically sourced from around the world"
    },
    {
      image: "/high-angle-shot-coffee-beans-jars-breakfast-table-with-some-pastry.jpg",
      title: "Delicious Pairings",
      subtitle: "Perfect complements to your coffee"
    }
  ];

  // Auto slide functionality
  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(slideInterval.current);
  }, [slides.length]);

  const goToSlide = (index) => {
    clearInterval(slideInterval.current);
    setCurrentSlide(index);
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const goToPrevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/Menu" },
    { name: "About", path: "/About" },
    { name: "Contact", path: "/Contact" },
  ];

  // Team members data
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & Head Barista",
      image: "/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer.jpg",
      bio: "With over 15 years in specialty coffee, Alex brings passion and expertise to every cup.",
      delay: 0.1,
      social: {
        instagram: "#",
        twitter: "#",
        facebook: "#"
      }
    },
    {
      name: "Maria Garcia",
      role: "Pastry Chef",
      image: "/beautiful-woman-showing-copy-space.jpg",
      bio: "Trained in Paris, Maria creates the perfect pairings for our coffee selections.",
      delay: 0.2,
      social: {
        instagram: "#",
        twitter: "#",
        facebook: "#"
      }
    },
    {
      name: "Jamal Smith",
      role: "Roast Master",
      image: "/bohemian-man-with-his-arms-crossed.jpg",
      bio: "Jamal's small-batch roasting techniques bring out unique flavor profiles in our beans.",
      delay: 0.3,
      social: {
        instagram: "#",
        twitter: "#",
        facebook: "#"
      }
    }
  ];

  // Milestones data
  const milestones = [
    {
      year: "2010",
      title: "First Location",
      description: "Opened our flagship cafe in downtown Beanville",
      icon: <FiMapPin className="w-6 h-6 text-cafe-gold" />
    },
    {
      year: "2014",
      title: "Award Winning",
      description: "Recognized as 'Best Artisan Coffee' by Coffee Magazine",
      icon: <FiAward className="w-6 h-6 text-cafe-gold" />
    },
    {
      year: "2018",
      title: "Roastery Launch",
      description: "Established our own small-batch roasting facility",
      icon: <FiCoffee className="w-6 h-6 text-cafe-gold" />
    },
    {
      year: "2022",
      title: "Community Hub",
      description: "Served our 1 millionth customer with the same care as our first",
      icon: <FiUsers className="w-6 h-6 text-cafe-gold" />
    }
  ];

  // Values data
  const values = [
    {
      title: "Quality",
      description: "We source only the finest beans and ingredients",
      icon: <FiAward className="w-8 h-8 text-cafe-gold" />
    },
    {
      title: "Sustainability",
      description: "Ethical sourcing and eco-friendly practices",
      icon: <FiMapPin className="w-8 h-8 text-cafe-gold" />
    },
    {
      title: "Community",
      description: "Building connections through coffee",
      icon: <FiUsers className="w-8 h-8 text-cafe-gold" />
    },
    {
      title: "Innovation",
      description: "Constantly exploring new flavors and techniques",
      icon: <FiCoffee className="w-8 h-8 text-cafe-gold" />
    }
  ];

  return (
    <div className="bg-cafe-light min-h-screen relative overflow-x-hidden">
      <Head>
        <title>About Espreso | Our Coffee Journey</title>
        <meta name="description" content="Discover our passion for coffee and the story behind Espreso" />
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
                onMouseEnter={() => setHoveredLink(link)}
                onMouseLeave={() => setHoveredLink(null)}
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

          {/* Mobile Menu Button */}
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
                
                {/* Social links in mobile menu */}
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

      {/* ===== HERO SECTION WITH SLIDESHOW ===== */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 relative bg-cafe-dark text-white">
        <div className="container mx-auto">
          <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-screen rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl">
            {/* Slideshow */}
            <div className="relative w-full h-full">
              {slides.map((slide, index) => (
                <motion.div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentSlide ? 1 : 0 }}
                  transition={{ duration: 1 }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30"></div>
                  
                  {/* Slide content */}
                  <motion.div 
                    className="absolute bottom-1/4 sm:bottom-1/3 left-0 right-0 text-center px-4 sm:px-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 50 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.h1 
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 font-serif"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: index === currentSlide ? 1 : 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p 
                      className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: index === currentSlide ? 1 : 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      {slide.subtitle}
                    </motion.p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            {/* Navigation arrows */}
            <button 
              onClick={goToPrevSlide}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 sm:p-3 rounded-full hover:bg-black/50 transition-all z-10"
              aria-label="Previous slide"
            >
              <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={goToNextSlide}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 sm:p-3 rounded-full hover:bg-black/50 transition-all z-10"
              aria-label="Next slide"
            >
              <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
            
            {/* Slide indicators */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${index === currentSlide ? 'bg-cafe-gold w-4 sm:w-6' : 'bg-white/50'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR STORY SECTION ===== */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-cafe-dark mb-4 sm:mb-6 font-serif">Our Story</h2>
            <motion.p 
              className="text-base sm:text-lg text-cafe-brown mb-6 sm:mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Espreso began as a dream between two friends who shared a passion for exceptional coffee. What started as a small cart serving pour-overs has grown into a beloved community hub, but our commitment to quality and craftsmanship remains unchanged.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-cafe-light p-4 sm:p-6 rounded-lg sm:rounded-xl"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-cafe-gold/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-cafe-dark mb-1 sm:mb-2">{value.title}</h3>
                  <p className="text-cafe-brown text-xs sm:text-sm">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== OUR JOURNEY SECTION ===== */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-cafe-light/50">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-cafe-dark mb-3 sm:mb-4 font-serif">Our Journey</h2>
            <p className="text-cafe-brown max-w-2xl mx-auto text-sm sm:text-base">
              A timeline of our coffee adventure and community impact
            </p>
          </motion.div>
          
          {/* Animated timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line - hidden on mobile */}
            <motion.div 
              className="hidden sm:block absolute left-1/2 h-full w-0.5 bg-cafe-gold/30 transform -translate-x-1/2"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />
            
            <div className="space-y-8 sm:space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className="relative flex flex-col sm:flex-row items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Year badge */}
                  <div className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-cafe-gold flex items-center justify-center text-xl sm:text-2xl font-bold text-white z-10 mb-4 sm:mb-0 ${index % 2 === 0 ? 'sm:mr-6 md:mr-8' : 'sm:ml-6 md:ml-8'}`}>
                    {milestone.year}
                  </div>
                  
                  {/* Content card */}
                  <motion.div 
                    className={`flex-1 p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg bg-white text-left sm:${index % 2 === 0 ? 'text-left' : 'sm:text-right'}`}
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-cafe-gold/10 flex items-center justify-center mr-3 sm:mr-4">
                        {milestone.icon}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-cafe-dark">{milestone.title}</h3>
                    </div>
                    <p className="text-cafe-brown text-sm sm:text-base">{milestone.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MEET THE TEAM SECTION ===== */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-cafe-dark mb-3 sm:mb-4 font-serif">Meet The Team</h2>
            <p className="text-cafe-brown max-w-2xl mx-auto text-sm sm:text-base">
              The passionate people behind your perfect cup
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: member.delay }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)"
                }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl transition-all overflow-hidden group"
              >
                <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                    <div className="flex space-x-3 sm:space-x-4">
                      <a href={member.social.instagram} className="text-white hover:text-cafe-gold transition-colors">
                        <FiInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                      <a href={member.social.twitter} className="text-white hover:text-cafe-gold transition-colors">
                        <FiTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                      <a href={member.social.facebook} className="text-white hover:text-cafe-gold transition-colors">
                        <FiFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-cafe-dark mb-1">{member.name}</h3>
                  <p className="text-cafe-gold text-sm sm:text-base mb-2 sm:mb-3">{member.role}</p>
                  <p className="text-cafe-brown text-xs sm:text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMMUNITY SECTION ===== */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-cafe-dark text-black">
        <div className="container mx-auto text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 font-serif"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            More Than <span className="text-cafe-gold">Coffee</span>
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            We're proud to be part of the Beanville community, hosting events, supporting local artists, and creating a welcoming space for all.
          </motion.p>
          
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {[
              { number: "200+", label: "Local Artists Featured" },
              { number: "50+", label: "Community Events Yearly" },
              { number: "100%", label: "Locally Sourced Milk" },
              { number: "1M+", label: "Cups Served" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-cafe-gold mb-1 sm:mb-2">{stat.number}</p>
                <p className="text-xs sm:text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-black text-white pt-12 sm:pt-16 pb-6 sm:pb-8 relative overflow-hidden">
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
                    className="bg-white text-black px-3 sm:px-4 py-2 sm:py-3 rounded-r-full font-medium text-sm sm:text-base"
                  >
                    Join
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Quick links */}
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

            {/* Social media */}
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

          {/* Copyright */}
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