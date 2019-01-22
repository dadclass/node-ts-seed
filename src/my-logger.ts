import logger from './logger';

function debug(caller: string, message: string): void {
    logger.debug(`[${caller}] ${message}`);
}

function info(caller: string, message: string): void {
    logger.info(`[${caller}] ${message}`);
}

function warn(caller: string, message: string): void {
    logger.warn(`[${caller}] ${message}`);
}

function error(caller: string, message: string): void {
    logger.error(`[${caller}] ${message}`);
}

const log =  {
    debug: debug,
    info: info,
    warn: warn,
    error: error
}

export default log;