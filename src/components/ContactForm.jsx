import { motion } from 'framer-motion';

const ContactForm = () => {
  const handleContactClick = () => {
    // Open email client directly with pre-filled email
    const subject = "Contact Request for Infoxify";
    const body = "Hello Infoxify Team,\n\nI would like to inquire about your services.\n\n";
    
    window.location.href = `mailto:contact@infoxify.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <motion.div 
        className="w-full max-w-4xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Infoxify Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-900 to-blue-600 shadow-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-white">
                <path
                  fill="currentColor"
                  d="M6 2l-6 10h4v10h4v-10h4M18 2h-2l-1.5 6 1.5 6h2l1.5-6M22 8h-3v2h3v2h-3v2h3a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z"
                />
              </svg>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Contact Us</h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          We'd love to hear from you! Get in touch with our team by sending an email directly.
        </p>
        
        <button
          onClick={handleContactClick}
          className="px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-md font-medium transition-colors duration-300 inline-flex items-center justify-center shadow-lg shadow-blue-700/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email Us Now
        </button>
      </motion.div>
    </div>
  );
};

export default ContactForm; 