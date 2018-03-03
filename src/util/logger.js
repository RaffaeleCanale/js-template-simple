import chalk from 'chalk';
import { getOrExec, prettyPrint } from 'util/utils';

function levelFormatter(color, level) {
    return color(level.substring(0, 4).toUpperCase());
}

const defaultOptions = {
    transport: console,
    levels: {
        verbose: levelFormatter.bind(null, chalk.cyan),
        info: levelFormatter.bind(null, chalk.green),
        warning: levelFormatter.bind(null, chalk.yellow),
        error: levelFormatter.bind(null, chalk.red),
    },
    formatter: info => `${info.timestamp} ${info.level} [${info.name}] - ${info.message}`,
    nameFormatter: chalk.bold,
};

class Logger {

    constructor(name, options) {
        this.name = name;
        _.assign(this, _.defaults(options, defaultOptions));

        _.forEach(this.levels, (formatter, level) => {
            this[level] = this.log.bind(this, formatter(level));
        });
    }

    log(level, ...message) {
        const info = {
            timestamp: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            name: this.nameFormatter(getOrExec(this.name)),
            level,
            message: message.map(prettyPrint).join(' '),
        };
        this.transport.log(this.formatter(info));
    }
}

export function setDefaults(options) {
    _.assign(defaultOptions, options);
}

export function getLogger(name, options) {
    return new Logger(name, options);
}

const defaultLogger = new Logger('logger', defaultOptions);
export default defaultLogger;
