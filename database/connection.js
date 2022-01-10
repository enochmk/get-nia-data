const { createConnection } = require('typeorm');
const logger = require('../utils/logger');

const connection = async () => {
	try {
		const conn = await createConnection();
		const host = conn.options.host;
		const type = conn.options.type.toUpperCase();
		const database = conn.options.database;
		logger.info(`Connected to [${type}] database: ${host}@${database}`);

		return conn;
	} catch (error) {
		logger.error(error.message);
		process.exit(1);
	}
};

module.exports = connection;
