const minifyXML = require("minify-xml").minify;

const XML_MINIFIER_OPTIONS = {
  trimWhitespaceFromTexts: true,
  collapseWhitespaceInTexts: true,
};

module.exports = (content, outputPath) => {
  if (outputPath && outputPath.endsWith(".xml")) {
    return minifyXML(content, XML_MINIFIER_OPTIONS);
  }
  return content;
};
