const { ALLOWED_SITE_PROPERTIES } = require("../constants");

module.exports = (testedObject) =>
  Object.keys(testedObject).filter(
    (property) => !ALLOWED_SITE_PROPERTIES.includes(property)
  );
