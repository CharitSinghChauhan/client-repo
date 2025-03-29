import ContactForm from './components/ContactForm';
import SEO from './components/SEO';
import StructuredData from './components/StructuredData';
import Navbar from './components/Navbar';

const contactStructuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Infoxify",
  "description": "Get in touch with Infoxify for IT solutions and services"
};

function Contact() {
  return (
    <main>
      <SEO 
        title="Contact Infoxify - Get in Touch with Our Team"
        description="Contact our team of IT experts for consultations, quotes, or information about our services. We're here to help with your IT needs."
        keywords="contact, IT services, consultation, customer support, IT solutions, tech support"
        ogType="website"
      />
      <StructuredData data={contactStructuredData} />
      <Navbar />
      <ContactForm />
    </main>
  );
}

export default Contact; 