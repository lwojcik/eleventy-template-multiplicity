const stringStripHtml = import("string-strip-html");

const ELLIPSIS = '…';

module.exports = async (input, maxLength) => {
  const stripHtml = await stringStripHtml;
  const strippedString = stripHtml(input).result;
  const lastSpaceIndex = strippedString.lastIndexOf(" ", maxLength);

  if (strippedString.length <= maxLength) {
    return strippedString;
  }

  const truncatedString =
    lastSpaceIndex > 0
      ? strippedString.substring(0, lastSpaceIndex) + ELLIPSIS
      : strippedString.substring(0, maxLength) + ELLIPSIS;

  return truncatedString;
};
