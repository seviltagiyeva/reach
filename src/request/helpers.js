const fs = require('fs');

module.exports = {
  createFormDataLine(boundary, name, data, path) {
    const formDataLine = `--${boundary}\r\nContent-Disposition: form-data; name="${name}"; ${path ? `filename="${path}"` : ''}\r\nContent-Type: text/plain\r\n\r\n${data}\r\n`;
    return formDataLine;
  },
  createFileBinary(path, boundary) {
    return new Promise((resolve) => {
      let formData = '';
      if (!path) resolve(formData);
      else {
        fs.createReadStream(path)
          .on('data', (data) => {
            formData += this.createFormDataLine(boundary, 'file', data, path);
            resolve(formData);
          });
      }
    });
  },
};
