const slugify = require("slugify");

module.exports = (input) =>
  slugify(input, {
    replacement: "",
    lower: true,
    strict: true,
  });
