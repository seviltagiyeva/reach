const helpers = require('./helpers');
const {
  PROTOCOL,
} = require('../constants');
const utils = require('../utils');

function Request(method = 'GET', path = '', headers = '', body = '') {
  this.headers = headers;
  this.body = body;
  this.method = method;
  this.path = path;
  this.formData = '';
}


Request.prototype.getHeaders = function getHeaders() {
  return utils.parseHeaders(this.headers);
};

Request.prototype.toString = function toString() {
  return `${this.method} ${this.path} ${PROTOCOL}/1.1\r\n${this.headers}\r\n${this.body}`;
};

Request.prototype.getBodyLength = function getBodyLength() {
  return this.body.length;
};

Request.prototype.addBody = function addBody(requestBody) {
  this.body += (this.body.length ? '&' : '') + requestBody;
};

Request.prototype.addHeaders = function addHeaders(options) {
  let headers = '';
  Object.keys(options).forEach((option) => {
    headers += `${option}: ${options[option]}\r\n`;
  });
  this.headers += headers;
};


Request.prototype.createFormData = function createFormData(boundary, fields, path) {
  return helpers.createFileBinary(path, boundary)
    .then((binaryFile) => {
      let formData = binaryFile;
      Object.keys(fields).forEach((header) => {
        formData += helpers.createFormDataLine(
          boundary,
          header,
          fields[header],
        );
      });
      formData += `--${boundary}--`;
      this.formData = formData;
      this.addBody(formData);
      return this.formData;
    });
};


module.exports = Request;
