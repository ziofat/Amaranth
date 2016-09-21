const amaranth = require('../index');
const utils = require('../libs/utils');
const should = require('should');

describe('Amaranth/index.js', () => {
	it('PIN password for "world" with master pass "hello" should be 5583', () => {
		const password = amaranth('hello', 'world', 'PIN');
		should(password).be.exactly('5583');
	});

	it('Short password for "world" with master pass "hello" should be Ish6', () => {
		const password = amaranth('hello', 'world', 'Short');
		should(password).be.exactly('Ish6');
	});

	it('Classic password for "world" with master pass "hello" should be scR0(9Vj', () => {
		const password = amaranth('hello', 'world', 'Classic');
		should(password).be.exactly('scR0(9Vj');
	});

	it('Long password for "world" with master pass "hello" should be Bla9s8EsT<-iK2q5', () => {
		const password = amaranth('hello', 'world', 'Long');
		should(password).be.exactly('Bla9s8EsT<-iK2q5');
	});

	it('Long password for "世界" with master pass "你好" should be U0t,Qa0!ZG6vjwv4', () => {
		const password = amaranth('你好', '世界', 'Long');
		should(password).be.exactly('U0t,Qa0!ZG6vjwv4');
	});

	it('Throw error when passing unsupported password type', () => {
		(function () {
			amaranth('hello', 'world', 'ZIO');
		}).should.throw();
	});
});

describe('Amaranth/libs/utils.js', () => {
	it('generateIndexArray() should return Array with length of 32', () => {
		const idxArr = utils.generateIndexArray('hello', 'world');
		should(idxArr).be.an.Array().and.with.lengthOf(32);
	});

	it('index array of ("hello","world") should start with 78 00 df 8a 3b', () => {
		const idxArr = utils.generateIndexArray('hello', 'world');
		should(idxArr[0]).be.exactly('78');
		should(idxArr[1]).be.exactly('00');
		should(idxArr[2]).be.exactly('df');
		should(idxArr[3]).be.exactly('8a');
		should(idxArr[4]).be.exactly('3b');
	});

	it('Template of PIN should be NNNN', () => {
		const idxArr = utils.generateIndexArray('hello', 'world');
		const template = utils.findTemplate(idxArr[0], 'PIN');
		should(template).be.exactly('NNNN');
	});

	it('Template of Short should be CccN', () => {
		const idxArr = utils.generateIndexArray('hello', 'world');
		const template = utils.findTemplate(idxArr[0], 'Short');
		should(template).be.exactly('CccN');
	});

	it('Template of Classic should be ccCNPNCc', () => {
		const idxArr = utils.generateIndexArray('hello', 'world');
		const template = utils.findTemplate(idxArr[0], 'Classic');
		should(template).be.exactly('ccCNPNCc');
	});

	it('Template of Long should be CccNcNCcCPPcCNcN', () => {
		const idxArr = utils.generateIndexArray('hello', 'world');
		const template = utils.findTemplate(idxArr[0], 'Long');
		should(template).be.exactly('CccNcNCcCPPcCNcN');
	});
});

