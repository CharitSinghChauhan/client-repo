import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

// Base URL for the website
const hostname = 'https://infoxify.com';

// Initialize sitemap stream
const sitemap = new SitemapStream({ hostname });

// Define routes manually instead of importing from router.jsx
// This matches the routes defined in src/router.jsx
const routes = [
  '/',
  '/services',
  '/case-studies',
  '/recognition',
  '/faq',
  '/careers',
  '/contact'
];

// Generate sitemap from routes
async function generateSitemap() {
  try {
    console.log('Generating sitemap...');
    
    // Add each route to the sitemap
    routes.forEach(route => {
      sitemap.write({
        url: route,
        changefreq: 'weekly',
        priority: route === '/' ? 1.0 : 0.8
      });
    });
    
    // Close the sitemap stream
    sitemap.end();
    
    // Generate the XML
    const sitemapXML = await streamToPromise(sitemap);
    
    // Write to file
    const distPath = resolve(process.cwd(), 'dist');
    const writeStream = createWriteStream(`${distPath}/sitemap.xml`);
    writeStream.write(sitemapXML.toString());
    writeStream.end();
    
    console.log('Sitemap generated successfully at dist/sitemap.xml');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

// Run the sitemap generation
generateSitemap(); 