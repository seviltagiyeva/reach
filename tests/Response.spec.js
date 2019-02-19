/* eslint no-unused-expressions: 0 */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const Response = require('./../src/response/Response');
const utils = require('../src/utils');

const { expect } = chai;

chai.use(chaiAsPromised).should();


describe('Response test', () => {
  const response = new Response('Ok', 200, null, 'Nice to meet you');
  before(() => {
    sinon.stub(utils, 'parseHeaders');
    sinon.spy(Response.prototype, 'getBody');
  });

  after(() => {
    utils.parseHeaders.restore();
    Response.prototype.getBody.restore();
  });

  it('Response.getHeaders', () => {
    sinon.spy(Response.prototype, 'getHeaders');
    response.getHeaders();
    expect(response.getHeaders.calledOnce).to.be.true;
    expect(utils.parseHeaders.calledOnce).to.be.true;
  });

  it('Response.getBody', () => {
    const body = response.getBody();
    expect(body).to.equal('Nice to meet you');
  });
});
