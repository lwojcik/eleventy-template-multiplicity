const { DateTime } = require("luxon");
const siteConfig = require("../../content/_data/siteConfig");

const DATE_FORMAT = siteConfig.dateFormats.readable;

module.exports = (date) =>
  DateTime.fromISO(date, { zone: "utc" }).toFormat(DATE_FORMAT);
