import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { init } from '@emailjs/browser';
// Initialize EmailJS
init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// Use a separate variable to improve readability and maintainability
const rootElement = document.getElementById('root');

// Create the React root only if the element exists
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

// Use createRoot API with proper error handling
const root = ReactDOM.createRoot(rootElement);

// Wrap the entire app in StrictMode only in development
root.render(
  import.meta.env.DEV ? (
    <React.StrictMode>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </React.StrictMode>
  ) : (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  )
);
