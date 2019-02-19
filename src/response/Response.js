const utils = require('../utils');

function Response(statusText, code, headers, body) {
  this.statusText = statusText;
  this.code = code;
  this.headers = headers;
  this.body = body;
}


Response.prototype.getHeaders = function getHeaders() {
  return utils.parseHeaders(this.headers);
};

Response.prototype.getBody = function getBody() {
  return this.body;
};

module.exports = Response;
