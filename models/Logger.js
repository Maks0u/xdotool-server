import winston from 'winston';

export default winston.createLogger({
	level: 'debug',
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		winston.format.colorize(),
		winston.format.printf((log) => `${log.timestamp} ${log.level}: ${log.message}`)
	),
	transports: [new winston.transports.Console()],
});
