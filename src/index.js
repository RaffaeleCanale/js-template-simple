import { argv } from 'yargs';
import Joi from 'joi';
import Logger from 'js-utils/logger';

const schema = Joi.object().keys({
    foo: Joi.string().required(),
}).unknown();

const { error } = Joi.validate(argv, schema);
if (error) {
    Logger.error(error);
}

Logger.info('argv', argv);
