const clc = require("cli-color");
const { logPrefix: LOG_PREFIX } = require("../../content/_data/siteConfig");
const { WARNING_PREFIX, ERROR_PREFIX, INFO_PREFIX } = require("../constants");

module.exports = {
  warn: (message) => {
    const formattedMessage = clc.yellow(
      `[${LOG_PREFIX}] [${WARNING_PREFIX}] ${message}`
    );

    console.warn(formattedMessage);
  },
  error: (message) => {
    const formattedMessage = clc.red(
      `[${LOG_PREFIX}] [${ERROR_PREFIX}] ${message}`
    );

    console.error(formattedMessage);
  },
  info: (message) => {
    const formattedMessage = clc.white(
      `[${LOG_PREFIX}] [${INFO_PREFIX}] ${message}`
    );

    console.error(formattedMessage);
  },
};
