const manifest = {
  "name": "Local Business Directory",
  "short_name": "BizzFinder",
  "theme_color": "#6435ffff",
  "background_color": "#ccc",
  "start_url": "/",
  "scope": "/",
  "id": "BizzFinder",
  "display": "standalone",
  "description": "BizzFinder helps you discover local businesses and services with ease.",
  "icons": [
    {
      "purpose": "any maskable",
      "sizes": "192x192",
      "src": "bzlogo.jpg",
      "type": "image/jpeg"
    },
    {
      "purpose": "any maskable",
      "sizes": "512x512",
      "src": "bzlogo.jpg",
      "type": "image/jpeg"
    }
  ],
  "screenshots": [
    {
      "src": "shot1.png",
      "type": "image/png",
      "sizes": "1080x1920",
      "form_factor": "narrow"
    },
    {
      "src": "shot2.png",
      "type": "image/png",
      "sizes": "1080x1920",
      "form_factor": "narrow"
    }
  ]
};
export default manifest;