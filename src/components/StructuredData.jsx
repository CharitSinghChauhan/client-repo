import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Component for adding structured data (JSON-LD) to improve SEO
 * 
 * @param {Object} props - Component properties
 * @param {Object} props.data - The structured data to be inserted as JSON-LD
 * @returns {JSX.Element} - Helmet component with JSON-LD script
 */
const StructuredData = ({ data }) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
};

// Example structured data for the organization
export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Infoxify",
  "url": "https://infoxify.com",
  "logo": "https://infoxify.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-123-456-7890",
    "contactType": "customer service",
    "email": "contact@infoxify.com",
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://www.facebook.com/infoxify",
    "https://www.twitter.com/infoxify",
    "https://www.linkedin.com/company/infoxify"
  ]
};

// Example structured data for a service
export const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "IT Consulting Services",
  "provider": {
    "@type": "Organization",
    "name": "Infoxify"
  },
  "description": "Expert IT consulting services to help businesses transform and grow with technology.",
  "areaServed": "Global",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "IT Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Cloud Solutions"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Cybersecurity"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Software Development"
        }
      }
    ]
  }
};

export default StructuredData; 