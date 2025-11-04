import Joi from 'joi';
import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT, SORT_OPTIONS } from './queryOptions.js';

const sortValues = Object.keys(SORT_OPTIONS);

export const postsQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(DEFAULT_PAGE),
  limit: Joi.number().integer().min(1).max(MAX_LIMIT).default(DEFAULT_LIMIT),
  q: Joi.string().allow('', null),
  category: Joi.string().allow('', null),
  sort: Joi.string().valid(...sortValues).default('newest'),
});

export const idParamSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});
