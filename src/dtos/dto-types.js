import { Type } from '@sinclair/typebox';

export const idDTOSchema = Type.String({
  format: 'uuid',
  errorMessage: {
    type: 'id must be a string',
    format: 'id must be a valid uuid with format uuid4',
  },
});

export const nameDTOSchema = Type.String({
  minLength: 2,
  maxLength: 20,
  errorMessage: {
    minLength: '${0#} must be at least 2 characters',
    maxLength: '${0#} must be max 20 characters',
    type: '${0#} must be a string but got ${0}',
  },
});

export const emailDTOSchema = Type.String({
  format: 'email',
  errorMessage: {
    type: '${0#} must be a string',
    format: '${0#} must be a valid email address',
  },
});

export const ageDTOSchema = Type.Number({
  minimum: 18,
  maximum: 100,
  errorMessage: {
    minimum: '${0#} must be greater than or equal to 18',
    maximum: '${0#} must be less than or equal to 100',
    type: '${0#} must be a number',
  },
});
