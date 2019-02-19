/* eslint no-unused-expressions: 0 */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const utils = require('./../src/utils');
const reach = require('./../src/reach');

const { expect } = chai;
chai.use(chaiAsPromised);


describe('reach test', () => {
  before(() => {
    sinon.spy(utils, 'parseResponse');
  });

  after(() => {
    utils.parseResponse.restore();
  });

  it('test1', () => reach('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'GET',
    headers: {},
  }).then((result) => {
    expect(result.code).to.be.equal(200);
    expect(result.code).to.be.equal(200);
  }));

  it('test2', () => reach('https://ptsv2.com/t/06t82-1549561768/post', {
    method: 'POST',
    headers: {},
    body: {
      fields: { name: 'sevil', surname: 'tagiyeva' },
      file: './src/file.txt',
    },
  }).then((result) => {
    expect(result.getBody()).to.be.equal('Thank you for this dump. I hope you have a lovely day!');
  }));

  it('test3', () => reach('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PUT',
    headers: {},
    body: {
      fields: { name: 'sevil', surname: 'tagiyeva' },
    },
  }).then((result) => {
    expect(JSON.parse(result.getBody())).to.deep.equal({ id: 1 });
  }));

  it('test4', () => reach('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'DELETE',
    headers: {},
    body: {
      fields: {},
    },
  }).then((result) => {
    expect(JSON.parse(result.getBody())).to.deep.equal({});
  }));
});
