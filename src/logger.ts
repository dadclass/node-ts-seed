import winston from 'winston';

const appRoot = process.cwd();

const options = {
  console: {
    colorize: true,
    handleExceptions: true,
    json: false,
    level: 'debug',
  },
  file: {
    colorize: false,
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    level: 'debug',
    maxFiles: 5,
    maxsize: 5242880, // 5MB
  },
};

// instantiate a new Winston Logger with the settings defined above
// new winston.Logger
const logger = winston.createLogger({
  exitOnError: false, // do not exit on handled exceptions
  transports: [new winston.transports.File(options.file), new winston.transports.Console(options.console)],
});

export default logger;
