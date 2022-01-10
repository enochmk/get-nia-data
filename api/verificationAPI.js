const axios = require('axios');
const logger = require('../utils/logger');

const verificationAPI = async (pinNumber, surname) => {
	const data = {
		agentID: 'Script',
		pinNumber,
		surname,
	};

	const config = {
		method: 'post',
		url: 'http://10.81.1.188:5001/airteltigo/verification/nia',
		headers: {
			'Content-Type': 'application/json',
		},
		data: data,
	};

	try {
		const response = await axios(config);
		logger.info('Success', response.data);
	} catch (error) {
		if (error.response) {
			logger.error(error.response.data);
		} else {
			logger.error(error.message, {});
		}
	}
};

module.exports = verificationAPI;
