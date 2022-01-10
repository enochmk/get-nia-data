const dotenv = require('dotenv');
const connectToDb = require('./database/connection');
const { isVerified } = require('./services/nia_verify');
const logger = require('./utils/logger');
const verificationAPI = require('./api/verificationAPI');
const {
	getRetryRequests,
	updateRequest,
} = require('./services/nia_retry_requests');

dotenv.config();

const main = async () => {
	let conn = null;

	try {
		conn = await connectToDb();
		const dataset = await getRetryRequests();

		logger.verbose(`Starting - Total Rows in dataset: ${dataset.length}.`);
		for (i = 0; i < dataset.length; i++) {
			const row = dataset[i];
			logger.verbose(`Processing data ${i + 1}/${dataset.length}`);

			const { ID, SURNAME, PIN_NUMBER } = row;

			const cardValid = await isVerified(PIN_NUMBER, SURNAME);
			if (cardValid) {
				await updateRequest(ID, 'TRUE', 'Data already in system');
				continue;
			}

			// MAKE API CALL;
			const response = await verificationAPI(PIN_NUMBER, SURNAME);
			const status = response.status ? 'TRUE' : 'FALSE';
			const message = response.message;
			await updateRequest(ID, status, message);
		}
		logger.verbose(`Ending - Total Rows in dataset: ${dataset.length}.`);
	} catch (error) {
		logger.error(error);
	} finally {
		logger.verbose('Database connection closed');
		await conn.close();
		process.exit(1);
	}
};

main();
