/* eslint no-unused-expressions: 0 */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const utils = require('../src/utils');

const { expect } = chai;

chai.use(chaiAsPromised).should();


describe('utils test', () => {
  before(() => {
    sinon.spy(utils, 'isFormData');
    sinon.spy(utils, 'parseHeaders');
    sinon.spy(utils, 'parseResponse');
  });

  after(() => {
    utils.parseHeaders.restore();
    utils.isFormData.restore();
    utils.parseResponse.restore();
  });

  it('isFormData', () => {
    const body = { file: 'test.txt' };
    utils.isFormData(body);
    expect(utils.isFormData.calledOnce).to.be.true;
    expect(utils.isFormData.firstCall.returnValue).to.be.true;
  });

  it('parseHeaders', () => {
    const headers = 'Connection: Close\r\nDate: 12:55\r\n\r\n';
    utils.parseHeaders(headers);
    expect(utils.parseHeaders.calledOnce).to.be.true;
    expect(utils.parseHeaders.firstCall.returnValue).to.deep.equal({ Connection: 'Close', Date: '12:55' });
  });

  it('parseResponse', () => {
    const response = 'HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\n\r\nThank you';
    const {
      code, statusText, responseBody, responseHeaders,
    } = utils.parseResponse(response);
    expect(code).to.be.equal(200);
    expect(statusText).to.be.equal('OK');
    expect(responseBody).to.be.equal('Thank you');
    expect(responseHeaders).to.be.equal('Content-Type: text/html; charset=utf-8\r\n');
  });
});
