const packageJson = require("../../package.json");

module.exports = {
  title: "Multiplicity",
  description: "Eleventy-based RSS aggregator template",
  author: "Multiple authors",
  url: "https://eleventy-m10y.lkmt.us/",
  github: {
    project: "https://github.com/lwojcik/eleventy-template-multiplicity",
  },
  userAgent: "m10y-https://eleventy-m10y.lkmt.us",
  language: "en",
  generator: {
    name: "Eleventy",
    version: packageJson.dependencies["@11ty/eleventy"].replace("^", ""),
  },
  dateFormats: {
    readable: "d LLL yyyy", // date format used alongside posts
  },
  maxPostLength: 500, // how many characters per each post excerpt?
  maxItemsPerFeed: 10, // how many items should be fetched from each feed?
  enablePWA: true, // If true, service worker is registered to make the site behave like a mobile app (PWA)
};
