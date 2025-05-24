import Joi from 'joi';

interface IEnvVars {
  env: 'development' | 'production';
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
  jwt: {
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
  };
}

// env validation schema for Joi
const envFileSchema = Joi.object<IEnvVars, true>({
  env: Joi.string().valid('development', 'production').default('development'),
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
  jwt: Joi.object({
    secret: Joi.string().required(),
    expiresIn: Joi.string().default('1h'),
    refreshSecret: Joi.string().required(),
    refreshExpiresIn: Joi.string().default('7d'),
  }),
});

// map your env vars here
const loadEnv = () => ({
  env: process.env.NODE_ENV,
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
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
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
