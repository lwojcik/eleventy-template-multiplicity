const packageJson = require("../../package.json");

module.exports = {
  title: "Multiplicity",
  description: "Eleventy-based RSS aggregator template",
  author: "Multiple Authors",
  url: "https://eleventy-m10y.lkmt.us/",
  github: {
    project: "https://github.com/lwojcik/eleventy-template-multiplicity",
  },
  userAgent: "m10y-https://eleventy-m10y.lkmt.us",
  generator: {
    name: "Eleventy",
    version: packageJson.dependencies["@11ty/eleventy"].replace("^", ""),
  },
  dateFormats: {
    readable: "d LLL yyyy", // date format used alongside posts
  },
  maxPostLength: 500, // How many characters per each post excerpt?
  maxItemsPerFeed: 10, // How many items should be fetched from each feed?
  localCacheDuration: "7d", // For how long should network calls be cached locally? See https://www.11ty.dev/docs/plugins/fetch/#change-the-cache-duration
};
