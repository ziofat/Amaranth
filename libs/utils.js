'use strict';
const md5 = require('blueimp-md5');

const templates = {
	PIN: ['NNNN'],
	Short: ['CccN', 'cCcN', 'ccCN', 'cCNc'],
	Classic: [
		'ccCNPNCc', 'ccNPCcCN', 'cNPNCcCc', 'CccNcPNC', 'cPccNCCN',
		'CcNcCcNP', 'CccCPNNc', 'CNNcCPcc', 'cCcCNNcP', 'cCcNNCPc',
		'CNcccNPC', 'CcNCcNcP', 'cPcNcCCN', 'CNcPNccC', 'ccNNCCcP',
		'cNPCcCcN', 'cCNNPcCc', 'ccPCNCcN', 'cccNPCNC', 'CCcNccNP',
	],
	Long: [
		'CccNcNCcCPPcCNcN', 'cCCPcNNcCCNccNcP', 'cccPNNcCNNPCcCCc', 'CNPcNCPCNccccCcN',
		'cCCcNNCCPcPcNcNc', 'CNcPCcNPCCNccccN', 'cNPCcNCccCNccNPC', 'cCccNNNCcPCCPNcc',
		'cCcccCNcPCNNPCNc', 'CcNPCPcCcccNcNNC', 'cNNccPCPcCNNcCcC', 'cCcNCNCNccCNccPP',
		'cPCcccNcCNCCNPcN', 'cCcNcPcNCCNCcNPc', 'CcPCNPccNcNCccCN', 'CCccCcPNPcCNNcNc',
		'cCPNCCNcCNcccPNc', 'CPPCNCNccNcNCccc', 'ccNNNPcCNCcCPcCc', 'cccNcccCPNCCNNCP',
		'CCccCcNPNCNNcccP', 'CcNcccNCcNPPCNcC', 'ccCNCPcCcPcCNcNN', 'cNCPcCccCCNcNcPN',
		'CPNNcNCccCccNPcC', 'cPCNNCCPccccNNcC', 'ccNPPccCccNCCCNN', 'CCNccNNcNcCPPcCc',
		'ccccNcNcNCPCNPCC', 'CPcCcCNNPcNNCccc', 'CNccCPcccCCcNNPN', 'cCNNccccCcPNCPNC',
		'CCNCPPcCccccNNNc', 'cNccCcCNPcCCPNNc', 'cNcPCccCNPCCNccN', 'ccccCCPCcCNNPcNN',
		'ccNCcNNcCcCNCPcP', 'cNNccPCCccNCcPCN', 'CPcccNPcNNCcCCNc', 'CNNCCcNcccPPcNCc',
	],
};

const pool = {
	C: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	c: 'abcdefghijklmnopqrstuvwxyz',
	N: '0123456789',
	P: '~!@#$%^&*()-=_+{}[]/,.<>:;',
};

class Utils {
	static generateIndexArray(master, service) {
		const md5One = md5(master, service);
		const md5Two = md5(md5One, 'zio');
		const md5Thr = md5(md5One, 'fat');
		let seeds = '';
		for (let i = 0; i < md5Two.length; i++) {
			seeds += md5Two[i] + md5Thr[i];
		}
		const indexArray = [];
		for (let i = 0; i < seeds.length / 2; i++) {
			const idx = seeds.substr(i * 2, 2);
			indexArray.push(idx);
		}
		return indexArray;
	}

	static findTemplate(idx, type) {
		const templateList = templates[type];
		const index = parseInt(idx, 16) % templateList.length;
		return templateList[index];
	}

	static calcPassword(idxArr, template, type) {
		const count = template.length;
		let password = '';
		const noise = type.charCodeAt(0) - 65;
		for (let i = 0; i < count; i++) {
			const candidates = pool[template[i]];
			const idx = (parseInt(idxArr[i], 16) + noise) % candidates.length;
			password += candidates[idx];
		}
		return password;
	}
}

module.exports = Utils;
