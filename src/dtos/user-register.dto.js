import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

import {
  ageDTOSchema,
  emailDTOSchema,
  idDTOSchema,
  nameDTOSchema,
} from '#DTOs/dto-types.js';

const UserRegisterBodyDTOSchema = Type.Object(
  {
    name: nameDTOSchema,
    email: emailDTOSchema,
    age: ageDTOSchema,
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties:
        'Body must NOT have additional properties. Must be an object with "name", "email" and "age" properties',
    },
  }
);

const UserRegisterParamsDTOSchema = idDTOSchema;

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ['uuid', 'email']);
addErrors(ajv);
const validateBodySchema = ajv.compile(UserRegisterBodyDTOSchema);
const validateParamsSchema = ajv.compile(UserRegisterParamsDTOSchema);

export const userRegisterBodyDTO = (req, res, next) => {
  const isDTOValid = validateBodySchema(req.body);
  if (!isDTOValid)
    return res
      .status(400)
      .send({ errors: validateBodySchema.errors.map((err) => err.message) });

  next();
};

export const userRegisterParamsDTO = (req, res, next) => {
  const isDTOValid = validateParamsSchema(req.params.id);
  req.log.info(req.params);
  req.log.info(isDTOValid);
  if (!isDTOValid)
    return res
      .status(400)
      .send({ errors: validateParamsSchema.errors.map((err) => err.message) });

  next();
};
