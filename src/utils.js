
const { RESPONSE_EXP } = require('./constants');
const Error = require('./Error');

module.exports = {
  parseResponse(response) {
    const responseString = response.toString();
    const match = RESPONSE_EXP.exec(responseString);
    RESPONSE_EXP.lastIndex = 0;
    const code = +match[1];
    const statusText = match[2];
    const responseHeaders = match[3];
    const responseBody = match[4];
    if (code > 200) {
      throw new Error(code, statusText, responseHeaders, responseBody);
    } else {
      return {
        code,
        statusText: match[2],
        responseHeaders: match[3],
        responseBody: match[4],
      };
    }
  },
  isFormData(body) {
    return !!(body && body.file);
  },
  parseHeaders(headersStr) {
    const headersArr = headersStr.split('\r\n').filter(header => header);
    const headersObject = {};
    headersArr.forEach((header) => {
      headersObject[header.substring(0, header.indexOf(':'))] = header.substring(header.indexOf(':') + 1).trimLeft();
    });
    return headersObject;
  },
};
