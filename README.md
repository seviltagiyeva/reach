# HTTP client for node

[![Build Status](https://travis-ci.com/seviltagiyeva/reach.svg?branch=master)](https://travis-ci.com/seviltagiyeva/reach)

HTTP Client based on node's net package sockets.

## Installation
```bash
npm i reach-client
```

## Usage

```bash
const reach = require('reach-client');

reach(url, options)
  .then(response => console.log(response.getBody()))
  .catch(err => console.log(err.code);
```

The available options are:

Options | Type |Values |
--- | --- | --- |
*method* | string |HTTP method (GET, POST, PUT, PATCH, DELETE supported)
*headers*| object |All HTTP request headers
*body*| object/string | HTTP request body


### Examples

```bash
reach(
  'https://ptsv2.com/t/06t82-1549561768/post',
  {
    method: 'POST',
    headers: {},
    body: {
      fields: { name: 'firstname', surname: 'lastname' },
      file: './src/file.txt',
    },
  }).then((response) => {
    console.log(response.getBody())
  })
  .catch((err) => console.log(err.code));

reach(
  'https://ptsv2.com/t/06t82-1549561768/post',
  {
    method: 'PUT',
    headers: {},
    body: 'a=7&b=8'
  }).then((response) => {
    console.log(response.statusText)
  })
  .catch((err) => console.log(err.code));


reach(
  'https://jsonplaceholder.typicode.com/posts/1',
  {
    method: 'GET',
    headers: {},
  }).then((response) => {
    console.log(response.code)
  })
  .catch((err) => console.log(err.code));

```

Available response members

Options | Type |Values |
--- | --- | --- |
*code* | number | HTTP response code 
*statusText*| string | HTTP response status
*getBody*| object | HTTP response body
*getHeaders*| object | HTTP response body


