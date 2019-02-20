const parseHeaders = require('./utils');

module.exports = function Error(code, statusText, headers, body) {
  this.code = code;
  this.statusText = statusText;
  this.headers = headers;
  this.body = body;
};


Error.prototype = {
  get headers() {
    return parseHeaders(this.headers);
  },
  get code() {
    return +this.code;
  },
};
