import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

// Implement code splitting with React.lazy
const Services = React.lazy(() => import('./Services'));
const Contact = React.lazy(() => import('./Contact'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-900">
    <div className="w-16 h-16 border-4 border-purple-600 border-solid rounded-full border-t-transparent animate-spin"></div>
  </div>
);

// Define routes for the application
// This is used both for navigation and for sitemap generation
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <App />
      </React.Suspense>
    ),
    children: []
  },
  {
    path: '/services',
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <Services />
      </React.Suspense>
    ),
  },
  {
    path: '/case-studies',
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <Services />
      </React.Suspense>
    ), // Redirects to the case studies section
  },
  {
    path: '/recognition',
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <Services />
      </React.Suspense>
    ), // Redirects to the recognition section
  },
  {
    path: '/faq',
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <Services />
      </React.Suspense>
    ), // Redirects to the FAQ section
  },
  {
    path: '/careers',
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <Services />
      </React.Suspense>
    ), // Redirects to the careers section
  },
  {
    path: '/contact',
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <Contact />
      </React.Suspense>
    ),
  }
]);

export default router; 