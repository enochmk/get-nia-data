const dotenv = require('dotenv');
const { getConnection } = require('typeorm');
const connectToDb = require('./database/connection');
const { isVerified } = require('./services/nia_verify');
const logger = require('./utils/logger');
const verificationAPI = require('./api/verificationAPI');

dotenv.config();

const main = async () => {
	let conn = null;

	try {
		conn = await connectToDb();

		const SURNAME = 'BRAY';
		const PIN_NUMBER = 'GHA-713382913-5';

		const response = await verificationAPI(PIN_NUMBER, SURNAME);
	} catch (error) {
		console.log(error);
		process.exit(1);
	} finally {
		await conn.close();
	}
};

main();
