import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import SEO from "./components/SEO";
import StructuredData, { serviceStructuredData } from "./components/StructuredData";
import Navbar from "./components/Navbar";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, MessageCircleMore } from "lucide-react";

// Lazy load 3D components
const LazyCanvas = lazy(() => import("@react-three/fiber").then(module => ({ default: module.Canvas })));
const LazyOrbitControls = lazy(() => import("@react-three/drei").then(module => ({ default: module.OrbitControls })));
const LazySphere = lazy(() => import("@react-three/drei").then(module => ({ default: module.Sphere })));

function Services() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const careersRef = useRef(null);
  const commitmentRef = useRef(null);
  const [careersVisible, setCareersVisible] = useState(false);
  const [commitmentVisible, setCommitmentVisible] = useState(false);
  const [currentCase, setCurrentCase] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
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
  
  // Original useEffect for observers
  useEffect(() => {
    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (!isInView && entry.isIntersecting) {
          setIsInView(true);
          servicesObserver.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 100px 0px" }
    );
    
    const careersObserver = new IntersectionObserver(
      ([entry]) => {
        if (!careersVisible && entry.isIntersecting) {
          setCareersVisible(true);
          careersObserver.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 100px 0px" }
    );
    
    const commitmentObserver = new IntersectionObserver(
      ([entry]) => {
        if (!commitmentVisible && entry.isIntersecting) {
          setCommitmentVisible(true);
          commitmentObserver.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 100px 0px" }
    );
    
    if (sectionRef.current) servicesObserver.observe(sectionRef.current);
    if (careersRef.current) careersObserver.observe(careersRef.current);
    if (commitmentRef.current) commitmentObserver.observe(commitmentRef.current);
    
    return () => {
      servicesObserver.disconnect();
      careersObserver.disconnect();
      commitmentObserver.disconnect();
    };
  }, [isInView, careersVisible, commitmentVisible]);
  
  const services = [
    {
      title: "Cloud",
      description: "Move faster, reduce costs and create new opportunities with cloud innovation",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      category: "Technology"
    },
    {
      title: "Cybersecurity",
      description: "Protect your entire enterprise with evolving security strategies",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      category: "Security"
    },
    {
      title: "Digital Engineering",
      description: "Transform your business with cutting-edge digital solutions",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      category: "Innovation"
    },
    {
      title: "Data & Analytics",
      description: "Drive enterprise transformation with data-powered strategies",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      category: "Data"
    }
  ];

  const faqs = [
    {
      question: "What IT services does Infoxify offer?",
      answer: "We provide a comprehensive range of IT solutions including software development, cloud migration, cybersecurity, data analytics, and managed IT services tailored to your business needs."
    },
    {
      question: "How does your outsourcing model work?",
      answer: "We offer flexible engagement models including dedicated teams, project-based collaboration, and staff augmentation. Each model is customized to align with your specific requirements and business goals."
    },
    {
      question: "What industries do you specialize in?",
      answer: "We have extensive experience across healthcare, finance, retail, manufacturing, and education sectors, with specialized teams that understand industry-specific challenges and compliance requirements."
    },
    {
      question: "What is your approach to data security?",
      answer: "We implement industry-leading security protocols, regular audits, and compliance with international standards (ISO 27001, GDPR, HIPAA) to ensure your data remains protected throughout our engagement."
    },
    {
      question: "How do you ensure quality in your deliverables?",
      answer: "Our quality assurance process includes automated testing, code reviews, comprehensive documentation, and regular client feedback sessions to maintain the highest standards of excellence."
    },
    {
      question: "What is the typical timeframe for project completion?",
      answer: "Project timelines vary based on scope and complexity. We provide detailed project plans with milestones and delivery schedules during our initial consultation process."
    }
  ];

  const caseStudies = [
    {
      title: "VMO2 supercharges customer experiences",
      description: "Discover how telecommunications leader Virgin Media O2 (VMO2) is leveraging digital technologies and data-driven insights to transform its customer service.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      link: "Read more"
    },
    {
      title: "Digital transformation at scale",
      description: "Learn how we helped a global enterprise modernize their infrastructure and achieve 300% improvement in operational efficiency.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      link: "See the report"
    },
    {
      title: "AI-Powered Healthcare Solutions",
      description: "Explore how we revolutionized patient care with advanced AI diagnostics and predictive analytics, reducing diagnosis time by 60%.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      link: "View case study"
    },
    {
      title: "Sustainable Tech Innovation",
      description: "See how our green technology solutions helped reduce carbon emissions by 45% while improving operational efficiency for a global manufacturer.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      link: "Learn more"
    },
    {
      title: "FinTech Revolution",
      description: "Discover how we transformed traditional banking with blockchain technology, processing over 1 million transactions per second.",
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      link: "Explore details"
    },
    {
      title: "Smart City Implementation",
      description: "Learn about our comprehensive IoT solution that helped a metropolitan city reduce energy consumption by 35% and improve public services.",
      image: "https://images.unsplash.com/photo-1493489674223-da480c1d7edc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      link: "See the impact"
    }
  ];

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentCase((prev) => (prev + 1) % caseStudies.length);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentCase((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const RotatingGroup = () => {
    const groupRef = useRef();
    const [isVisible, setIsVisible] = useState(true);
    
    // Monitor visibility to reduce load when off-screen
    useEffect(() => {
      const handleVisibilityChange = () => {
        setIsVisible(!document.hidden);
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }, []);
    
    // Use a less frequent update cycle with an interval
    useFrame(({ clock }) => {
      if (!isVisible || !groupRef.current) return;
      
      // Reduce update frequency using modulo to skip frames
      const time = clock.getElapsedTime();
      if (Math.floor(time * 10) % 2 !== 0) return; // Only update every other frame
      
      groupRef.current.rotation.y = time * 0.1; // Reduced rotation speed
    });

    return (
      <group ref={groupRef}>
        {/* Reduced polygon count */}
        <Sphere args={[1, 8, 8]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#ffffff" wireframe />
        </Sphere>
        <Sphere args={[1.5, 8, 8]} position={[2, 1, -1]}>
          <meshBasicMaterial color="#ffffff" wireframe />
        </Sphere>
      </group>
    );
  };

  // AdaptivePixelRatio component for performance optimization
  const AdaptivePixelRatio = () => {
    const { gl } = useThree();
    useEffect(() => {
      const dpr = Math.min(2, window.devicePixelRatio);
      gl.setPixelRatio(dpr);
    }, [gl]);
    return null;
  };

  // Import ThreeJSErrorBoundary from App
  const ThreeJSErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    
    useEffect(() => {
      const handleError = () => setHasError(true);
      window.addEventListener('error', handleError);
      
      return () => {
        window.removeEventListener('error', handleError);
      };
    }, []);
    
    if (hasError) {
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
    
    return children;
  };

  const GeometricBackground = () => {
    return (
      <Suspense fallback={<div className="bg-black/30 absolute inset-0"></div>}>
        {webGLSupported ? (
          <ThreeJSErrorBoundary>
            <LazyCanvas 
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              frameloop="demand"
              dpr={[1, 1.5]} // Lower DPR for better performance
              gl={{
                powerPreference: "high-performance",
                antialias: false,
                stencil: false,
                depth: false,
                alpha: true,
                preserveDrawingBuffer: true
              }}
              onCreated={({ gl }) => {
                try {
                  if (gl) {
                    gl.setClearColor(0x000000, 0);
                    // Handle context loss
                    if (gl.canvas) {
                      gl.canvas.addEventListener('webglcontextlost', (e) => {
                        e.preventDefault();
                        console.warn('WebGL context lost. Attempting to restore...');
                      });
                      
                      // Also add a context restored handler
                      gl.canvas.addEventListener('webglcontextrestored', () => {
                        console.log('WebGL context restored successfully.');
                      });
                    }
                  }
                } catch (error) {
                  console.error('Error during WebGL initialization in GeometricBackground:', error);
                }
              }}
            >
              <AdaptivePixelRatio />
              <ambientLight intensity={0.4} /> {/* Reduced intensity */}
              <pointLight position={[10, 10, 10]} intensity={0.5} /> {/* Added intensity control */}
              <RotatingGroup />
              <LazyOrbitControls enableZoom={false} enablePan={false} enableRotate={false} /> {/* Disabled rotation */}
            </LazyCanvas>
          </ThreeJSErrorBoundary>
        ) : (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm">
            {/* Simple fallback geometric background with CSS */}
            <div className="geometric-fallback"></div>
          </div>
        )}
      </Suspense>
    );
  };

  // Expose contact function to window object for navbar access
  useEffect(() => {
    window.contactUs = () => {
      window.location.href = "mailto:contact@infoxify.com?subject=Inquiry%20from%20Website";
    };
    
    return () => {
      delete window.contactUs;
    };
  }, []);

  const socialMediaLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/people/Infoxify/61574748864186/",
      icon: Facebook
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/infoxify/",
      icon: Instagram
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/infoxify",
      icon: Twitter
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/infoxify",
      icon: Linkedin
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@InfoxifyOfficial",
      icon: Youtube
    },
    {
      name: "Threads",
      url: "https://www.threads.net/@infoxify",
      icon: MessageCircleMore
    }
  ];

  return (
    <main className="bg-gray-900">
      <SEO 
        title="Infoxify Services - IT Solutions & Outsourcing"
        description="Explore our comprehensive IT services including cloud solutions, cybersecurity, software development, data analytics, and digital transformation services."
        keywords="IT services, cloud computing, cybersecurity, software development, data analytics, digital transformation"
        ogType="article"
      />
      <StructuredData data={serviceStructuredData} />
      
      {/* Add Navbar component */}
      <Navbar />
      
      {/* Services Section */}
      <section ref={sectionRef} className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Services
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We help organizations transform their business through technology and innovation
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <span className="text-sm font-medium text-violet-400 mb-1 sm:mb-2 block">{service.category}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{service.title}</h3>
                    <p className="text-sm sm:text-base text-gray-200">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-12 sm:py-20 md:py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative">
        <div className="container-mobile max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-400 mb-4">Case Studies</h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">See how we've helped our clients achieve extraordinary results with our tech solutions.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Case Study 1 */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-violet-900/20 transition-all duration-300 group">
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                     alt="FinTech Mobile App" 
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs rounded-full px-2.5 py-1 mr-2">FinTech</span>
                  <span className="bg-violet-500/20 text-violet-400 text-xs rounded-full px-2.5 py-1">Mobile Development</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">CryptoWallet Mobile App</h3>
                <p className="text-slate-300 text-sm sm:text-base mb-4">Developed a secure and user-friendly mobile cryptocurrency wallet with advanced security features and real-time market data.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-slate-700/50 text-slate-300 text-xs rounded-full px-2.5 py-1">React Native</span>
                  <span className="bg-slate-700/50 text-slate-300 text-xs rounded-full px-2.5 py-1">Redux</span>
                  <span className="bg-slate-700/50 text-slate-300 text-xs rounded-full px-2.5 py-1">Blockchain</span>
                </div>
                <div className="flex items-center text-slate-400 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>120% increase in user transactions</span>
                </div>
              </div>
            </div>
            
            {/* Case Study 2 */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-indigo-900/20 transition-all duration-300 group">
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                     alt="E-commerce Platform" 
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-blue-500/20 text-blue-400 text-xs rounded-full px-2.5 py-1 mr-2">E-commerce</span>
                  <span className="bg-indigo-500/20 text-indigo-400 text-xs rounded-full px-2.5 py-1">Web Platform</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">LuxuryMart E-commerce Site</h3>
                <p className="text-slate-300 text-sm sm:text-base mb-4">Built a high-performance e-commerce platform with AI-powered recommendations and advanced analytics dashboard.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-slate-700/50 text-slate-300 text-xs rounded-full px-2.5 py-1">Next.js</span>
                  <span className="bg-slate-700/50 text-slate-300 text-xs rounded-full px-2.5 py-1">Tailwind CSS</span>
                  <span className="bg-slate-700/50 text-slate-300 text-xs rounded-full px-2.5 py-1">Stripe</span>
                </div>
                <div className="flex items-center text-slate-400 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>85% increase in conversion rate</span>
                </div>
              </div>
            </div>
            
            {/* Case Study 3 */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300 group">
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                     alt="Healthcare Data Platform" 
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-sky-500/20 text-sky-400 text-xs rounded-full px-2.5 py-1 mr-2">Healthcare</span>
                  <span className="bg-blue-500/20 text-blue-400 text-xs rounded-full px-2.5 py-1">Data Analytics</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">MediTrack Analytics Platform</h3>
                <p className="text-slate-300 text-sm sm:text-base mb-4">Created a HIPAA-compliant healthcare analytics platform that helps hospitals optimize patient care and resource allocation.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-slate-700/50 text-slate-300 text-xs rounded-full px-2.5 py-1">Python</span>
                  <span className="bg-slate-700/50 text-slate-300 text-xs rounded-full px-2.5 py-1">React</span>
                  <span className="bg-slate-700/50 text-slate-300 text-xs rounded-full px-2.5 py-1">AWS</span>
                </div>
                <div className="flex items-center text-slate-400 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>32% reduction in patient wait times</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition and Awards Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-black min-h-[80vh] md:min-h-screen relative overflow-hidden" id="recognition">
        <div className="absolute inset-0 opacity-30">
          <GeometricBackground />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="mb-12 sm:mb-16 md:mb-20">
            <motion.div 
              className="flex flex-wrap text-3xl sm:text-4xl md:text-[4.5rem] leading-tight font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Global recognition and awards
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Award Card 1 */}
            <motion.div
              className="group relative overflow-hidden rounded-none bg-[#E31B23] aspect-[4/3] cursor-pointer"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713988-8665fc963095')] bg-cover bg-center opacity-20 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">A Great Place To Work</h3>
                  <h4 className="text-xl text-white/90 font-semibold mb-4">No. 6 on the World's Best Workplaces™ list.</h4>
                </div>
                <div className="flex items-center text-white group-hover:translate-x-2 transition-transform duration-300">
                  <span className="mr-2">See related awards</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Award Card 2 */}
            <motion.div
              className="group relative overflow-hidden rounded-none bg-[#460099] aspect-[4/3] cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40')] bg-cover bg-center opacity-20 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">The Top Consulting Firm</h3>
                  <h4 className="text-xl text-white/90 font-semibold mb-4">Earned the top spot among the World's Best Management Consulting Firms.</h4>
                </div>
                <div className="flex items-center text-white group-hover:translate-x-2 transition-transform duration-300">
                  <span className="mr-2">See related awards</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Award Card 3 */}
            <motion.div
              className="group relative overflow-hidden rounded-none bg-[#00A0AF] aspect-[4/3] cursor-pointer"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507679799987-c73779587ccf')] bg-cover bg-center opacity-20 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">An Influential Innovator</h3>
                  <h4 className="text-xl text-white/90 font-semibold mb-4">Our CEO is one of the TIME100 Most Influential People of 2024.</h4>
                </div>
                <div className="flex items-center text-white group-hover:translate-x-2 transition-transform duration-300">
                  <span className="mr-2">See related awards</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-black to-gray-900" id="faq">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Common questions about our IT outsourcing services
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {faqs.slice(0, 4).map((faq, index) => (
              <motion.div
                key={index}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 p-4 sm:p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{faq.question}</h3>
                <p className="text-sm sm:text-base text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 sm:mt-12">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <a 
                href="mailto:contact@infoxify.com?subject=Question%20about%20Infoxify%20Services"
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-md text-white text-sm sm:text-base inline-block transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md"
              >
                Have more questions? Contact us
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section ref={careersRef} className="py-24 bg-gradient-to-b from-gray-900 to-black" id="careers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: careersVisible ? 1 : 0, x: careersVisible ? 0 : -20 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Team collaborating"
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </motion.div>
            
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: careersVisible ? 1 : 0, x: careersVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-sm font-medium text-violet-600 uppercase tracking-wider">Careers</span>
              <h2 className="text-4xl font-bold text-white">
                Grow your career at the heart of change
              </h2>
              <p className="text-xl text-gray-400">
                It's your time to shine. Bring your ingenuity, curiosity and big ideas.
              </p>
              <button className="px-8 py-3 bg-violet-600 text-white rounded-md font-medium hover:bg-violet-700 transition-colors duration-200">
                Explore careers
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section ref={commitmentRef} className="py-24 bg-gradient-to-b from-black to-gray-900" id="commitment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: commitmentVisible ? 1 : 0, x: commitmentVisible ? 0 : -20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-white">
                Our commitment to innovation
              </h2>
              <p className="text-xl text-gray-400">
                We embrace our responsibility to drive innovation and create value for our clients through cutting-edge technology solutions.
              </p>
              <button className="px-8 py-3 bg-violet-600 text-white rounded-md font-medium hover:bg-violet-700 transition-colors duration-200">
                Learn more
              </button>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: commitmentVisible ? 1 : 0, x: commitmentVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Modern office space"
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black border-t border-gray-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
            {/* Company Info */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                <div className="relative h-7 w-7 sm:h-8 sm:w-8 mr-2">
                  <div 
                    className="absolute inset-0 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md"
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-white">
                      <path 
                        fill="currentColor" 
                        d="M6 2l-6 10h4v10h4v-10h4M18 2h-2l-1.5 6 1.5 6h2l1.5-6M22 8h-3v2h3v2h-3v2h3a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z" 
                      />
                    </svg>
                  </div>
                </div>
                <span className="text-white">Info</span>
                <span className="text-purple-500">xify</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                Leading the way in innovative IT solutions for businesses worldwide.
              </p>
              <div className="flex flex-wrap gap-2">
                {socialMediaLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a 
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform hover:scale-110 active:scale-95 text-gray-400 hover:text-violet-400"
                      aria-label={social.name}
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            </div>
            
            {/* Main Navigation */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-white">Navigation</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#services" className="text-gray-400 hover:text-violet-400 transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#case-studies" className="text-gray-400 hover:text-violet-400 transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#recognition" className="text-gray-400 hover:text-violet-400 transition-colors">
                    Recognition
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-400 hover:text-violet-400 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#careers" className="text-gray-400 hover:text-violet-400 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#commitment" className="text-gray-400 hover:text-violet-400 transition-colors">
                    Our Commitment
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-white">Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a href="#services" className="text-gray-400 hover:text-violet-400 transition-colors">
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-white">Contact Us</h4>
              <address className="not-italic text-gray-400 space-y-3">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-1 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Tech Avenue, San Francisco, CA 94107</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-1 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:contact@infoxify.com" className="hover:text-violet-400 transition-colors">contact@infoxify.com</a>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-1 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+15551234567" className="hover:text-violet-400 transition-colors">+1 (555) 123-4567</a>
                </div>
                <div className="mt-6">
                  <a
                    href="mailto:contact@infoxify.com?subject=Inquiry%20from%20Website"
                    className="px-6 py-3 rounded-md text-white inline-block transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md"
                  >
                    Contact Us
                  </a>
                </div>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs sm:text-sm text-gray-500">
              © {new Date().getFullYear()} Infoxify. All rights reserved.
            </p>
            <div className="flex space-x-4 sm:space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-violet-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-violet-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-violet-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Services; 