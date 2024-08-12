const ELLIPSIS = "…";

module.exports = async (input, maxLength) => {
  const lastSpaceIndex = input.lastIndexOf(" ", maxLength);

  if (input.length <= maxLength) {
    return input;
  }

  const truncatedString =
    lastSpaceIndex > 0
      ? input.substring(0, lastSpaceIndex) + ELLIPSIS
      : input.substring(0, maxLength) + ELLIPSIS;

  return truncatedString;
};
