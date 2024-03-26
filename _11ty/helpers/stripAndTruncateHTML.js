const stringStripHtml = import("string-strip-html");

module.exports = async (input, maxLength) => {
  const { stripHtml } = await stringStripHtml;

  const COLON = '...'

  const strippedString = stripHtml(input).result;

  const lastSpaceIndex = strippedString.lastIndexOf(" ", maxLength);

  if (strippedString.length <= maxLength) {
    return strippedString;
  }

  const truncatedString =
    lastSpaceIndex > 0
      ? strippedString.substring(0, lastSpaceIndex) + COLON
      : strippedString.substring(0, maxLength) + COLON;

  return truncatedString;
};
