import minimist from 'minimist';
import Joi from 'joi';
import Logger from 'js-utils/logger';

const argv = minimist(process.argv.slice(2));
const schema = Joi.object().keys({
    foo: Joi.string().required(),
}).unknown();

const { error } = Joi.validate(argv, schema);
if (error) {
    Logger.error(error);
}

Logger.info('argv', argv);
