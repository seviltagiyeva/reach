/* eslint no-unused-expressions: 0 */
/* eslint no-underscore-dangle: 0 */

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const rewire = require('rewire');

const helpers = rewire('./../src/request/helpers');

const { expect } = chai;

chai.use(chaiAsPromised);


describe('helpers test createFormDataLine', () => {
  before(() => {
    sinon.spy(helpers, 'createFormDataLine');
  });

  after(() => {
    helpers.createFormDataLine.restore();
  });

  it('createFormDataLine', () => {
    expect(helpers.createFormDataLine('--test', 'name', 'data')).to.be.equal('----test\r\nContent-Disposition: form-data; name="name"; \r\nContent-Type: text/plain\r\n\r\ndata\r\n');
  });
});

describe('helpers test createFileBinary', () => {
  beforeEach(() => {
    sinon.spy(helpers, 'createFileBinary');
    sinon.stub(helpers, 'createFormDataLine').withArgs().returns('test');
    helpers.__set__('createReadStream', sinon.stub().returns('stream'));
  });

  afterEach(() => {
    helpers.createFileBinary.restore();
    helpers.createFormDataLine.restore();
  });

  it('createFileBinary without path', () => {
    const result = helpers.createFileBinary(null, '--boundary');
    return expect(result).to.eventually.equal('');
  });

  it('createFileBinary with path', () => {
    const result = helpers.createFileBinary('./src/file.txt', '--boundary');
    return expect(result).to.eventually.equal('test');
  });
});
