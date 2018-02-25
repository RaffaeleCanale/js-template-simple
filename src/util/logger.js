import winston from 'winston';

const logger = new winston.Logger({
    level: 'verbose',
    transports: [
        new (winston.transports.Console)(),
    ],
});

export default logger;
