/* eslint no-unused-expressions: 0 */
const chai = require('chai');
const sinon = require('sinon');
const Request = require('./../src/request/Request');
const utils = require('../src/utils');
const helpers = require('../src/request/helpers');

const { expect } = chai;


describe('Request test', () => {
  const request = new Request('POST', '/t/06t82-1549561768/post', 'Connection: Close\r\nDate: 12:55\r\n', 'a=7');
  before(() => {
    sinon.spy(Request.prototype, 'getHeaders');
    sinon.stub(utils, 'parseHeaders');
    sinon.spy(Request.prototype, 'addBody');
    sinon.stub(helpers, 'createFileBinary').resolves('stub');
  });

  after(() => {
    utils.parseHeaders.restore();
    helpers.createFileBinary.restore();
    Request.prototype.addBody.restore();
    Request.prototype.getHeaders.restore();
  });

  it('Request.getHeaders', () => {
    request.getHeaders();
    expect(request.getHeaders.calledOnce).to.be.true;
    expect(utils.parseHeaders.calledOnce).to.be.true;
  });

  it('Request.getBodyLength', () => {
    expect(request.getBodyLength()).to.equal(3);
  });

  it('Request.toString', () => {
    expect(request.toString()).to.be.equal('POST /t/06t82-1549561768/post HTTP/1.1\r\nConnection: Close\r\nDate: 12:55\r\n\r\na=7');
  });

  it('Request.addBody', () => {
    request.addBody('b=8');
    expect(request.body).to.be.equal('a=7&b=8');
  });

  it('Request.addHeaders', () => {
    request.addHeaders({ 'Content-length': 10 });
    expect(request.headers).to.be.equal('Connection: Close\r\nDate: 12:55\r\nContent-length: 10\r\n');
  });

  it('Request.createFormData', () => {
    const result = request.createFormData('--boundary', {}, '/test.txt');
    expect(result).to.eventually.equal('stub----boundary--');
    expect(request.addBody.calledOnce).to.be.true;
  });
});
