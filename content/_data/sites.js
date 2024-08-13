const fetchSiteMetadata = require("../../_11ty/api/siteMetadata");

module.exports = () => {
  const siteMetadata = fetchSiteMetadata();

  return siteMetadata.map((item) => item);
};
