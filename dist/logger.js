"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var appRoot = process.cwd();
var options = {
    console: {
        colorize: true,
        handleExceptions: true,
        json: false,
        level: 'debug'
    },
    file: {
        colorize: false,
        filename: appRoot + "/logs/app.log",
        handleExceptions: true,
        json: true,
        level: 'info',
        maxFiles: 5,
        maxsize: 5242880,
    }
};
// instantiate a new Winston Logger with the settings defined above
// new winston.Logger
var logger = winston_1.default.createLogger({
    exitOnError: false,
    transports: [
        new winston_1.default.transports.File(options.file),
        new winston_1.default.transports.Console(options.console)
    ]
});
//   module.exports = logger;
exports.default = logger;
//# sourceMappingURL=logger.js.map