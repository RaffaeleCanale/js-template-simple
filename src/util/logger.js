// eslint-disable-next-line import/extensions
import winston from 'winston';
import { getOrExec, prettyPrint } from 'util/utils';

const { format } = winston;

function metaFormatter(info) {
    if (_.isArray(info.meta)) {
        // eslint-disable-next-line no-param-reassign
        info.message = `${info.message} ${info.meta.map(prettyPrint).join(' ')}`;
    }
    return info;
}

function messageFormatter(name, info) {
    // HACK: Here, 'message' contains the level and 'content' contains the message
    // See below for more explanations
    return `${info.timestamp} ${info.message} [${getOrExec(name)}] - ${info.content}`;
}

function levelFormatter(info) {
    /* eslint-disable no-param-reassign */

    /*
    HACK:
    winston doesn't allow (yet) to colorize anything else than message or level.
    Additionally level cannot be modified.
    So level is put in 'message' (and then colorized) and 'message' is stored in content.
    */
    info.content = info.message;
    info.message = info.level.substring(0, 4).toUpperCase();

    return info;
    /* eslint-enable no-param-reassign */
}

const transports = [
    new (winston.transports.Console)(),
];
const level = 'verbose';

export function getLogger(name) {
    return winston.createLogger({
        objectMode: true,
        format: format.combine(
            format.splat(),
            { transform: metaFormatter },
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            { transform: levelFormatter },
            format.colorize({ message: true }),
            format.printf(messageFormatter.bind(null, name))
        ),
        transports,
        level,
    });
}

const defaultLogger = getLogger('logger');

export default defaultLogger;
