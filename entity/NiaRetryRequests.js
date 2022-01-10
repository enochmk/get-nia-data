var EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
	name: 'NIA_RETRY_REQUESTS',
	tableName: 'NIA_RETRY_REQUESTS',
	columns: {
		ID: {
			type: 'int',
			primary: true,
			generated: true,
		},
		PIN_NUMBER: {
			type: 'varchar',
			nullable: false,
		},
		SURNAME: {
			type: 'varchar',
			nullable: false,
		},
		TIMESTAMP: {
			type: 'datetime2',
			default: () => 'getDate()',
		},
		STATUS: {
			type: 'varchar',
			nullable: true,
		},
		RESPONSE: {
			type: 'varchar',
			nullable: true,
		},
		UPDATE_TIMESTAMP: {
			type: 'datetime2',
			nullable: true,
		},
	},
});
