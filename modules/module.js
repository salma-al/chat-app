const moment = require('moment');

function formatMsg(sender, text) {
  return {
    sender,
    text,
    time: moment().format('h:mm a'),
  };
}

module.exports = formatMsg;
