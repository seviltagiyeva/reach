const net = require('net');
const utils = require('./utils');
const Request = require('./request/Request');
const Response = require('./response/Response');


const {
  PORT, URL_EXP, BOUNDARY,
} = require('./constants');


async function reach(url, options = {}) {
  const { headers, method, body } = options;
  const [, host, path] = url.match(URL_EXP);
  const request = new Request(method, path);
  if (utils.isFormData(body)) {
    const { fields, file } = body;
    await request.createFormData(BOUNDARY, fields, file);
    request.addHeaders({
      'Content-Type': `multipart/form-data; boundary=${BOUNDARY}`,
    });
  } else if (body) {
    request.addBody(body);
  }
  request.addHeaders({
    ...headers,
    Host: host,
    Connection: 'Close',
    'Content-Length': `${request.getBodyLength()}`,
  });
  return new Promise((resolve, reject) => {
    const client = net.connect(
      PORT, host,
      () => {
        client.write(request.toString());
      },
    );
    client.on('data', (data) => {
      client.end();
      try {
        const {
          statusText, code, responseBody, responseHeaders,
        } = utils.parseResponse(data);
        const response = new Response(statusText, code, responseHeaders, responseBody);
        if (response.code === 302) {
          reach(response.getHeaders().Location, options);
        }
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
    client.on('error', (err) => {
      reject(err.message);
    });
  });
}

module.exports = reach;
