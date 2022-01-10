const { getConnection } = require('typeorm');

exports.isVerified = async (pinNumber, surname) => {
	const conn = getConnection();

	const stmt = `SELECT TOP 1 UNIQUE_ID, SUUID, VERIFIED, NATIONALID, SURNAME, FORENAMES, NATIONALITY FROM [NIA_VERIFY].[dbo].[NIA_TBL_UNIQUE_NATIONALID] WHERE [NATIONALID] = '${pinNumber}' AND SURNAME = '${surname}' AND VERIFIED = 'TRUE' ORDER BY [UNIQUE_ID] DESC`;

	const rawData = await conn.query(stmt);

	return rawData.length ? true : false;
};
