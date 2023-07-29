const minifyXML = import("minify-xml");

const XML_MINIFIER_OPTIONS = {
  trimWhitespaceFromTexts: true,
  collapseWhitespaceInTexts: true,
};

module.exports = async (content, outputPath) => {
  const { minify } = await minifyXML;
  if (outputPath && outputPath.endsWith(".xml")) {
    return minify(content, XML_MINIFIER_OPTIONS);
  }
  return content;
};
