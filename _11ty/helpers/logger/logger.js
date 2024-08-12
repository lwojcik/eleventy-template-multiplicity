const clc = require("cli-color");

const LOG_PREFIX = "[11ty-template-multiplicity]";
const WARNING_PREFIX = "[warning]";
const ERROR_PREFIX = "[ERROR]";
const INFO_PREFIX = "[info]";

module.exports = {
  warn: (message) => {
    const formattedMessage = clc.yellow(
      `${LOG_PREFIX} ${WARNING_PREFIX} ${message}`
    );

    console.warn(formattedMessage);
  },
  error: (message) => {
    const formattedMessage = clc.red(
      `${LOG_PREFIX} ${ERROR_PREFIX} ${message}`
    );

    console.error(formattedMessage);
  },
  info: (message) => {
    const formattedMessage = clc.white(
      `${LOG_PREFIX} ${INFO_PREFIX} ${message}`
    );

    console.error(formattedMessage);
  },
};
