import Joi from 'joi';

interface IEnvVars {
  port: number;
  postgres: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  adminer: {
    port: number;
  };
}

// env validation schema for Joi
const envFileSchema = Joi.object<IEnvVars, true>({
  port: Joi.number().default(3000).required(),
  postgres: Joi.object({
    host: Joi.string().required(),
    port: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    database: Joi.string().required(),
  }),
  adminer: Joi.object({
    port: Joi.number().required(),
  }),
});

// map your env vars here
const loadEnv = () => ({
  port: process.env.PORT,
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  adminer: {
    port: process.env.ADMINER_PORT,
  },
});

export default (): IEnvVars => {
  const env = loadEnv();
  const valResult = envFileSchema.validate(env, { abortEarly: false });

  if (valResult.error) {
    throw new Error('env file validation error: ' + valResult.error.message);
  }

  return valResult.value;
};

export type { IEnvVars };
