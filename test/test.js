'use strict';
const amaranth = require('../index');
const utils = require('../libs/utils');
const should = require('should');

describe('Amaranth/index.js', () => {
	it('PIN password for "world" with master pass "hello" should be 3599', () => {
		const password = amaranth('hello', 'world', 'PIN');
		should(password).be.exactly('3599');
	});

	it('Short password for "world" with master pass "hello" should be gsG2', () => {
		const password = amaranth('hello', 'world', 'Short');
		should(password).be.exactly('gsG2');
	});

	it('Classic password for "world" with master pass "hello" should be qcq6(U0K', () => {
		const password = amaranth('hello', 'world', 'Classic');
		should(password).be.exactly('qcq6(U0K');
	});

	it('Long password for "world" with master pass "hello" should be Z-zzs3/t18LoAY3a', () => {
		const password = amaranth('hello', 'world', 'Long');
		should(password).be.exactly('Z-zzs3/t18LoAY3a');
	});

	it('Long password for "世界" with master pass "你好" should be b{Cxwx3vA1OZ6,i1', () => {
		const password = amaranth('你好', '世界', 'Long');
		should(password).be.exactly('b{Cxwx3vA1OZ6,i1');
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

	it('index array of ("hello","world") should start with 76 82 0e 0e d7', () => {
		const idxArr = utils.generateIndexArray('hello', 'world');
		should(idxArr[0]).be.exactly('76');
		should(idxArr[1]).be.exactly('82');
		should(idxArr[2]).be.exactly('0e');
		should(idxArr[3]).be.exactly('0e');
		should(idxArr[4]).be.exactly('d7');
	});

	it('Template of PIN should be NNNN', () => {
		const idxArr = utils.generateIndexArray('hello', 'world');
		const template = utils.findTemplate(idxArr[0], 'PIN');
		should(template).be.exactly('NNNN');
	});

	it('Template of Short should be CccN', () => {
		const idxArr = utils.generateIndexArray('hello', 'world');
		const template = utils.findTemplate(idxArr[0], 'Short');
		should(template).be.exactly('ccCN');
	});

	it('Template of Classic should be ccCNPNCc', () => {
		const idxArr = utils.generateIndexArray('hello', 'world');
		const template = utils.findTemplate(idxArr[0], 'Classic');
		should(template).be.exactly('cccNPCNC');
	});

	it('Template of Long should be CccNcNCcCPPcCNcN', () => {
		const idxArr = utils.generateIndexArray('hello', 'world');
		const template = utils.findTemplate(idxArr[0], 'Long');
		should(template).be.exactly('CPcccNPcNNCcCCNc');
	});
});

