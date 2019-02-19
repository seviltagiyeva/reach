const PROTOCOL = 'HTTP';
const PORT = 80;
const URL_EXP = /^http[s,]*:\/\/(.[^\\/]+)(.+)/;
const RESPONSE_EXP = /^HTTP\/1\.[01]\s(\d+)\s(\w+[ \w+]*)\r\n((?:.+\r\n)+)\r\n([\s\S]+)/ig;
const BOUNDARY = '----WebKitFormBoundaryyrV7KO0BoCBuDbTL';
module.exports = {
  PROTOCOL,
  PORT,
  URL_EXP,
  RESPONSE_EXP,
  BOUNDARY,
};
