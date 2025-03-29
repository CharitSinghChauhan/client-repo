import { useState, useEffect, useRef, lazy, Suspense } from "react";
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Services from "./Services"; // Import the Services component
import SEO from "./components/SEO"; // Import the SEO component
import StructuredData, { organizationStructuredData } from "./components/StructuredData";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import the Navbar component

// Lazy load the StarsBackground component
const StarsBackground = lazy(() => import('./components/StarsBackground'));

// Add this component:
// Error boundary for Three.js components
class ThreeJSErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Three.js error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when Three.js fails
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="text-white text-opacity-80 p-4">
            <svg className="w-10 h-10 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-center">Unable to display 3D graphics.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// AdaptivePixelRatio component for performance optimization
const AdaptivePixelRatio = () => {
  const { gl } = useThree();
  useEffect(() => {
    const dpr = Math.min(2, window.devicePixelRatio);
    gl.setPixelRatio(dpr);
  }, [gl]);
  return null;
};

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [navbarShadow, setNavbarShadow] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  
  // Check if WebGL is supported
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const hasWebGL = !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      
      setWebGLSupported(hasWebGL);
      
      if (!hasWebGL) {
        console.warn('WebGL is not supported in this browser. Falling back to static display.');
      }
    } catch (e) {
      console.error('Error checking WebGL support:', e);
      setWebGLSupported(false);
    }
  }, []);

  const slides = [
    { 
      message: "Building Digital Excellence from Day One", 
      subtext: "Your trusted partner in IT transformation and innovation", 
      color: "#1A0052",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      accentColor: "#8B5CF6"
    },
    { 
      message: "Agile Solutions for Modern Businesses", 
      subtext: "Custom IT solutions that grow with your business", 
      color: "#003C65",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      accentColor: "#0EA5E9"
    },
    { 
      message: "Your IT Success Story Starts Here", 
      subtext: "Personalized IT consulting for small to medium businesses", 
      color: "#500724",
      image: "https://images.unsplash.com/photo-1563920443079-783e5c786b83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      accentColor: "#F43F5E"
    },
    { 
      message: "Innovation Meets Expertise", 
      subtext: "Fresh perspectives, modern solutions, and dedicated support", 
      color: "#064E3B",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      accentColor: "#10B981"
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, prevSlide]);

  const startAutoScroll = () => {
    if (!isHovered) {
      setIsAutoScrolling(true);
      timerRef.current = setInterval(nextSlide, 5000);
    }
  };

  const stopAutoScroll = () => {
    setIsAutoScrolling(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isHovered, startAutoScroll]);

  // Add scroll listener for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setNavbarShadow(true);
      } else {
        setNavbarShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Services", href: "#services" },
    { label: "About Us", href: "#about" },
    { label: "Our Approach", href: "#approach" },
    { label: "Contact", href: "#contact" }
  ];

  const handleEmailRedirect = () => {
    window.location.href = "mailto:info@example.com?subject=Inquiry&body=Hello, I would like to know more about your services.";
  };

  return (
    <div
      className="relative overflow-hidden bg-slate-900"
      onMouseEnter={() => {
        setIsHovered(true);
        stopAutoScroll();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        startAutoScroll();
      }}
    >
      <SEO 
        title="Infoxify - IT Solutions & Consulting Services"
        description="Innovative IT solutions and consulting services for businesses. Specializing in cloud computing, cybersecurity, software development, and digital transformation."
        keywords="IT services, cloud computing, cybersecurity, software development, digital transformation, IT consulting"
        ogType="website"
      />
      <StructuredData data={organizationStructuredData} />
      
      {/* Add Navbar component */}
      <Navbar />

      <div className="relative w-full h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Background image */}
            <div className="absolute inset-0 z-0">
              <motion.img 
                src={slides[currentSlide].image} 
                alt={slides[currentSlide].message}
                className="w-full h-full object-cover"
                initial={{ scale: 1.05, filter: "brightness(0.3) contrast(1.2)" }}
                animate={{ scale: 1, filter: "brightness(0.2) contrast(1.2)" }}
                transition={{ duration: 1.2 }}
              />
              <div className={`absolute inset-0 bg-gradient-to-r from-slate-900/90 to-${slides[currentSlide].color}/70`}></div>
              
              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,30,30,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,30,30,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
              
              {/* Accent Lines */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="absolute h-[1px] bg-gradient-to-r"
                    style={{ 
                      left: 0,
                      right: 0,
                      top: `${10 + i * 16}%`,
                      backgroundImage: `linear-gradient(to right, transparent, ${slides[currentSlide].accentColor}80, transparent)`,
                      boxShadow: `0 0 8px ${slides[currentSlide].accentColor}80`
                    }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ 
                      duration: 2.5, 
                      delay: 0.2 + i * 0.1,
                      ease: "easeOut" 
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Star overlay with reduced opacity */}
            <div className="absolute inset-0 z-10 opacity-30 sm:opacity-40">
              {webGLSupported ? (
                <ThreeJSErrorBoundary>
                  <Canvas 
                    frameloop="demand"
                    gl={{
                      powerPreference: "high-performance",
                      antialias: false,
                      stencil: false,
                      depth: false,
                      preserveDrawingBuffer: true
                    }}
                    onCreated={({ gl }) => {
                      try {
                        if (gl) {
                          gl.setClearColor(0x000000, 0);
                          // Add event listener to handle context loss
                          if (gl.canvas) {
                            gl.canvas.addEventListener('webglcontextlost', (e) => {
                              e.preventDefault();
                              console.warn('WebGL context lost. Trying to restore...');
                            });
                            
                            // Also add a context restored handler
                            gl.canvas.addEventListener('webglcontextrestored', () => {
                              console.log('WebGL context restored successfully.');
                            });
                          }
                        }
                      } catch (error) {
                        console.error('Error during WebGL initialization:', error);
                      }
                    }}
                  >
                    <AdaptivePixelRatio />
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
                    <ambientLight intensity={0.2} />
                    <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
                    <spotLight
                      position={[-10, -10, -10]}
                      angle={0.15}
                      penumbra={0.5}
                      intensity={0.5}
                      castShadow
                      color={slides[currentSlide].accentColor}
                    />
                    <Suspense fallback={null}>
                      <StarsBackground color={slides[currentSlide].accentColor} />
                    </Suspense>
                    <EffectComposer>
                      <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
                    </EffectComposer>
                  </Canvas>
                </ThreeJSErrorBoundary>
              ) : (
                <div className="absolute inset-0 bg-black/20 backdrop-blur-md">
                  {/* Simple fallback starry background with CSS */}
                  <div className="stars-fallback"></div>
                </div>
              )}
            </div>
            
            {/* Text content */}
            <motion.div
              className="absolute inset-0 flex items-center z-20 px-4 sm:px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="text-left md:ml-4 lg:ml-10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "60px md:w-80px" }}
                      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                      style={{ 
                        backgroundColor: slides[currentSlide].accentColor,
                        boxShadow: `0 0 10px ${slides[currentSlide].accentColor}`
                      }}
                      className="h-1 mb-3 sm:mb-8"
                    />
                    
                    <motion.h1 
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-6 leading-tight"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      style={{ textShadow: `0 0 20px ${slides[currentSlide].accentColor}80` }}
                    >
                      {slides[currentSlide].message}
                    </motion.h1>
                    
                    <motion.p 
                      className="text-sm sm:text-base md:text-lg text-slate-300 mb-4 sm:mb-8 max-w-lg"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                    >
                      {slides[currentSlide].subtext}
                    </motion.p>
                    
                    <motion.div
                      className="flex flex-wrap gap-2 sm:gap-4"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.1 }}
                    >
                      <button 
                        className="px-3 sm:px-6 py-2 rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base w-full sm:w-auto"
                        style={{ 
                          backgroundColor: slides[currentSlide].accentColor, 
                          color: "white",
                          boxShadow: `0 0 15px ${slides[currentSlide].accentColor}80`
                        }}
                        onClick={handleEmailRedirect}
                      >
                        Get Started
                      </button>
                      <button 
                        className="px-3 sm:px-6 py-2 rounded-md border-2 border-white text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-sm text-sm sm:text-base w-full sm:w-auto"
                        onClick={handleEmailRedirect}
                      >
                        Free Consultation
                      </button>
                    </motion.div>
                  </div>

                  <div className="hidden md:block md:mr-4 lg:mr-10">
                    {/* Geometric elements to match futuristic style */}
                    <div className="relative h-60 sm:h-80 w-full max-w-xs mx-auto">
                      <motion.div
                        className="absolute w-48 sm:w-64 h-48 sm:h-64 rounded backdrop-blur-sm border border-white/10"
                        style={{ 
                          backgroundColor: slides[currentSlide].accentColor + "20",
                          boxShadow: `0 0 30px ${slides[currentSlide].accentColor}40`,
                          bottom: "10%",
                          left: "50%",
                          transform: "translateX(-50%)"
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 1.3 }}
                      />
                      <motion.div
                        className="absolute w-32 sm:w-40 h-32 sm:h-40 rounded-md backdrop-blur-sm border border-white/10"
                        style={{ 
                          backgroundColor: slides[currentSlide].color + "30",
                          boxShadow: `0 0 20px ${slides[currentSlide].color}40`,
                          top: "5%",
                          left: "60%",
                          transform: "translateX(-50%)"
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                      />
                      <motion.div
                        className="absolute w-20 sm:w-24 h-20 sm:h-24 rounded-full backdrop-blur-sm border border-white/20"
                        style={{ 
                          backgroundColor: "rgba(255,255,255,0.05)",
                          boxShadow: "0 0 30px rgba(255,255,255,0.1)",
                          top: "30%",
                          left: "20%"
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.8 }}
                        transition={{ duration: 1, delay: 1.7 }}
                      />
                      {/* Animated circle */}
                      <motion.div
                        className="absolute w-4 sm:w-5 h-4 sm:h-5 rounded-full"
                        style={{ 
                          backgroundColor: slides[currentSlide].accentColor,
                          boxShadow: `0 0 15px ${slides[currentSlide].accentColor}`,
                          top: "50%",
                          left: "50%"
                        }}
                        initial={{ scale: 0, x: -50, y: -40 }}
                        animate={{ 
                          scale: [0, 1, 1, 0],
                          x: [-50, 0, 50, 100],
                          y: [-40, -25, -10, 25]
                        }}
                        transition={{ 
                          duration: 5,
                          repeat: Infinity,
                          repeatType: "loop",
                          times: [0, 0.2, 0.8, 1]
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons - hidden on small screens, visible on md and up */}
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 hidden md:flex justify-between z-50 pointer-events-none">
          <motion.button
            className="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-slate-900/50 backdrop-blur-md hover:bg-slate-800/70 transition-colors text-white shadow-md border border-white/20 ml-6 lg:ml-10"
            onClick={prevSlide}
            whileHover={{ 
              scale: 1.1, 
              boxShadow: `0 0 20px ${slides[currentSlide].accentColor}60` 
            }}
            whileTap={{ scale: 0.9 }}
            style={{
              boxShadow: `0 0 15px rgba(0,0,0,0.5), 0 0 10px ${slides[currentSlide].accentColor}40`
            }}
            aria-label="Previous slide"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
          </motion.button>
          
          <motion.button
            className="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-slate-900/50 backdrop-blur-md hover:bg-slate-800/70 transition-colors text-white shadow-md border border-white/20 mr-6 lg:mr-10"
            onClick={nextSlide}
            whileHover={{ 
              scale: 1.1, 
              boxShadow: `0 0 20px ${slides[currentSlide].accentColor}60` 
            }}
            whileTap={{ scale: 0.9 }}
            style={{
              boxShadow: `0 0 15px rgba(0,0,0,0.5), 0 0 10px ${slides[currentSlide].accentColor}40`
            }}
            aria-label="Next slide"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </motion.button>
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-30">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              className={`w-8 sm:w-12 h-1 rounded-sm cursor-pointer transition-all`}
              onClick={() => setCurrentSlide(index)}
              style={{ 
                backgroundColor: currentSlide === index ? slides[currentSlide].accentColor : "rgba(255,255,255,0.2)",
                boxShadow: currentSlide === index ? `0 0 10px ${slides[currentSlide].accentColor}` : "none"
              }}
              whileHover={{ 
                opacity: 0.8,
                boxShadow: `0 0 8px ${slides[currentSlide].accentColor}`
              }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-8 sm:bottom-12 right-4 sm:right-8 text-white text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 z-30">
          <span className="font-medium text-base sm:text-lg" style={{ color: slides[currentSlide].accentColor }}>
            {currentSlide + 1}
          </span>
          <span className="text-white/60">/</span>
          <span className="text-white/60">{slides.length}</span>
        </div>
      </div>

      {/* Add the Services Section */}
      <Services />
    </div>
  );
}

export default App;