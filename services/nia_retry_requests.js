const { getRepository } = require('typeorm');
const requestsEntity = require('../entity/NiaRetryRequests');

exports.getRetryRequests = async () => {
	const repo = getRepository(requestsEntity);

	const results = await repo.find({ where: { STATUS: null } });

	return results;
};

exports.updateRequest = async (id, status, message) => {
	const repo = getRepository(requestsEntity);

	const response = await repo.update(id, {
		STATUS: status,
		RESPONSE: message,
		UPDATE_TIMESTAMP: new Date(),
	});

	return response;
};
