"use client"
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { FiMenu, FiX, FiArrowRight, FiMail, FiPhone, FiMapPin, FiClock, FiInstagram, FiFacebook, FiTwitter,FiCoffee,FiLink } from "react-icons/fi";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState(null);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFormStatus("success");
    setFormData({ name: "", email: "", message: "" });
    
    // Reset status after 3 seconds
    setTimeout(() => setFormStatus(null), 3000);
  };

  return (
    <div className="bg-cafe-light min-h-screen relative overflow-x-hidden">
      <Head>
        <title>Espreso | Contact Us</title>
        <meta name="description" content="Get in touch with Espreso - Premium Artisan Cafe" />
      </Head>

      {/* ===== ANIMATED NAVBAR ===== */}
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-white shadow-xl py-2" : "bg-white/90 py-4"}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
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

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 relative">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                className="relative"
              >
                <motion.a
                  href={link.path}
                  onClick={() => setActiveLink(link.name)}
                  className={`relative z-10 text-lg ${activeLink === link.name ? 'text-cafe-gold' : 'text-black'} hover:text-cafe-gold transition-colors px-2 py-1`}
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

          {/* Mobile Menu Button */}
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

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-md overflow-hidden"
            >
              <div className="container mx-auto px-6 py-4 flex flex-col space-y-6">
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
                    className={`text-xl ${activeLink === link.name ? 'text-cafe-gold' : 'text-black'} py-2 border-b border-black/10`}
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

      {/* ===== CONTACT CONTENT ===== */}
      <main className="pt-32 pb-20 px-6 relative">
        <div className="container mx-auto">
          {/* Contact Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-cafe-dark mb-4"
            >
              Get in <span className="text-cafe-gold">Touch</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-cafe-brown max-w-2xl mx-auto"
            >
              We'd love to hear from you! Reach out for reservations, questions, or just to say hello.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-cafe-dark mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-cafe-dark mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-cafe-light focus:outline-none focus:ring-2 focus:ring-cafe-gold transition-all"
                  />
                </div>

                 <div className="mb-6">
                  <label htmlFor="name" className="block text-cafe-dark mb-2">Your Number</label>
                  <input
                    type="number"
                    id="name"
                    name="name"
                    value={formData.number}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-cafe-light focus:outline-none focus:ring-2 focus:ring-cafe-gold transition-all"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-cafe-dark mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-cafe-light focus:outline-none focus:ring-2 focus:ring-cafe-gold transition-all"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-cafe-dark mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-cafe-light focus:outline-none focus:ring-2 focus:ring-cafe-gold transition-all"
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, backgroundColor: "" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={formStatus === "sending"}
                  className="w-full bg-cafe-brown text-black bg-amber-600 py-4 rounded-lg font-bold flex items-center justify-center"
                >
                  {formStatus === "sending" ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : formStatus === "success" ? (
                    "Message Sent!"
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
                
                {formStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-center text-green-600"
                  >
                    Thank you! We'll get back to you soon.
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md flex items-start"
                >
                  <div className="bg-cafe-gold/10 p-3 rounded-full mr-4">
                    <FiMail className="text-cafe-gold w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cafe-dark mb-1">Email Us</h3>
                    <p className="text-cafe-brown">info@espresso.com</p>
                    <p className="text-cafe-brown">reservations@espresso.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md flex items-start"
                >
                  <div className="bg-cafe-gold/10 p-3 rounded-full mr-4">
                    <FiPhone className="text-cafe-gold w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cafe-dark mb-1">Call Us</h3>
                    <p className="text-cafe-brown">+1 (555) 123-4567</p>
                    <p className="text-cafe-brown">Mon-Fri: 9am-5pm</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md flex items-start"
                >
                  <div className="bg-cafe-gold/10 p-3 rounded-full mr-4">
                    <FiMapPin className="text-cafe-gold w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cafe-dark mb-1">Visit Us</h3>
                    <p className="text-cafe-brown">123 Coffee Lane</p>
                    <p className="text-cafe-brown">Beanville, CA 90210</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md flex items-start"
                >
                  <div className="bg-cafe-gold/10 p-3 rounded-full mr-4">
                    <FiClock className="text-cafe-gold w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cafe-dark mb-1">Hours</h3>
                    <p className="text-cafe-brown">Mon-Fri: 7am-7pm</p>
                    <p className="text-cafe-brown">Sat-Sun: 8am-6pm</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Interactive Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden h-96"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215256018341!2d-73.9878449241647!3d40.74844097138981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1623251234567!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Espreso Location"
                ></iframe>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* ===== ADVANCED FOOTER ===== */}
      <footer className="bg-black text-white pt-16 pb-8 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
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
                  className="w-12 h-12 rounded-full bg-cafe-gold flex items-center justify-center shadow-lg"
                >
                  <FiCoffee className="text-xl text-black" />
                </motion.div>
                <h3 className="ml-3 text-2xl font-bold">Espreso</h3>
              </div>
              <p className="mb-4">123 Coffee Lane, Beanville</p>
              <p className="mb-6">Open daily 7am-7pm</p>
              
              {/* Newsletter signup */}
              <div className="mt-6">
                <h4 className="font-bold mb-3">Join Our Newsletter</h4>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="bg-black/50 text-white px-4 py-3 rounded-l-full focus:outline-none focus:ring-2 focus:ring-cafe-gold w-full border border-white/20"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-amber-800 text-white px-4 py-3 rounded-r-full font-medium"
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
              <h4 className="text-xl font-bold mb-6 relative inline-block">
                Explore
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-cafe-gold"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                />
              </h4>
              <ul className="space-y-3">
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
              <h4 className="text-xl font-bold mb-6 relative inline-block">
                Contact
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-cafe-gold"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                />
              </h4>
              <ul className="space-y-4">
                <motion.li 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                >
                  <FiLink className="mt-1 mr-3 text-cafe-gold" />
                  <div>
                    <p>info@espresso.com</p>
                    <p className="text-sm text-white/60">Email us</p>
                  </div>
                </motion.li>
                
                <motion.li 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                >
                  <FiLink className="mt-1 mr-3 text-cafe-gold" />
                  <div>
                    <p>+1 (555) 123-4567</p>
                    <p className="text-sm text-white/60">Call us</p>
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
              <h4 className="text-xl font-bold mb-6 relative inline-block">
                Follow Us
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-cafe-gold"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                />
              </h4>
              <div className="flex space-x-4 mb-8">
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
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-xl hover:border-cafe-gold transition-all"
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
            className="border-t border-white/10 mt-12 pt-8 text-center text-white/60"
          >
            <p>© {new Date().getFullYear()} Espreso. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-4 text-sm">
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