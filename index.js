const utils = require('./libs/utils');

function Amaranth(master, service, type) {
	const types = ['PIN', 'Short', 'Classic', 'Long'];
	if (types.indexOf(type) < 0) {
		throw new Error('Unsupported password type.');
	}

	const idxArr = utils.generateIndexArray(master, service);
	const template = utils.findTemplate(idxArr[0], type);
	const password = utils.calcPassword(idxArr, template, type);
	return password;
}

module.exports = Amaranth;
