import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [navbarShadow, setNavbarShadow] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarShadow(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "About Us", href: "#about" }
  ];

  const handleScrollToSection = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Define animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarShadow
          ? "bg-slate-900/70 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 sm:h-20">
          <Link to="/" className="flex items-center space-x-2">
            {/* Simple colored square with letter 'I' */}
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg sm:text-xl">I</span>
            </div>
            <span className="text-white font-bold text-xl sm:text-2xl">
              <span className="text-white">Info</span>
              <span className="text-purple-500">xify</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center justify-center flex-grow">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollToSection(e, item.href)}
                className="text-white hover:text-purple-300 transition-colors text-sm sm:text-base mx-4 cursor-pointer focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => handleScrollToSection(e, '#contact')}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-md font-medium text-sm sm:text-base transition-colors shadow-md cursor-pointer focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none"
            >
              Contact Us
            </a>
          </div>

          <div className="md:hidden ml-auto">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-slate-800 fixed top-16 left-0 right-0 z-40"
          >
            <div className="flex flex-col px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollToSection(e, item.href)}
                  className="text-white hover:bg-slate-700 px-3 py-2 rounded-md text-base cursor-pointer focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleScrollToSection(e, '#contact')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-base font-medium mt-2 cursor-pointer focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;