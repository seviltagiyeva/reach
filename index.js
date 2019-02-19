const reach = require('./src/reach');

reach(
  'http://httpbin.org/get',
  {
    method: 'GET',
    headers: {},
    // body: {
    //   fields: { name: 'sevil', surname: 'tagiyeva' },
    //   file: './src/file.txt',
    // },
  },
)
  .then(response => console.log('this i body\r\n', response.getBody()))
  .catch(err => console.log(err.body));


module.exports = reach;
