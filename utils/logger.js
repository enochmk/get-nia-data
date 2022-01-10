const path = require('path');
const moment = require('moment');
const winston = require('winston');
const { format } = winston;

const json = format.printf((data) => {
	let format = {
		timestamp: data.timestamp,
		level: data.level,
		message: data.message,
	};

	// remove duplicates
	delete data.timestamp;
	delete data.level;
	delete data.message;

	if (Object.keys(data).length) {
		format.context = { ...data };
	}
	return JSON.stringify(format);
});

const simple = format.printf((data) => {
	let { timestamp, level, message, requestID, label } = data;
	return `[${timestamp}] [${level.toUpperCase()}] - ${message}`;
});

const transports = [
	new winston.transports.Console({
		level: 'verbose',
		colorize: true,
		filename: path.join(
			'logs',
			moment().format('YYYYMMDD_HHmmss'),
			'verbose.log'
		),
		format: format.combine(simple, format.colorize({ all: true })),
	}),
	new winston.transports.File({
		level: 'error',
		filename: path.join(
			'logs',
			moment().format('YYYYMMDD_HHmmss'),
			'error.log'
		),
		expressFormat: true,
		format: format.combine(json),
	}),
	new winston.transports.File({
		level: 'info',
		format: json,
		filename: path.join(
			'logs',
			moment().format('YYYYMMDD_HHmmss'),
			'combined.log'
		),
	}),
];

// create logger with configurations
const logger = winston.createLogger({
	transports: transports,
	levels: winston.config.npm.levels,
	format: format.combine(
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		format.errors({ stack: true })
	),
});

module.exports = logger;
