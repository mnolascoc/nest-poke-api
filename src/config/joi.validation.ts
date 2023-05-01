import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.required(),
  PORT: Joi.number().default(3000),
  DEFAULT_LIMIT: Joi.number().default(6), // si no existe la variable lo crea en el valor 6 y este se ejecuta antes que el app.config
});
