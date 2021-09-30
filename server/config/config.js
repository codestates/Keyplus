require('dotenv').config();
const env = process.env;

const development = {
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: 'mysql',
  timezone: '+09:00',
  dialectOptions: { dateStrings: true, typeCast: true },
};

const production = {
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: 'mysql',
  timezone: '+09:00',
  dialectOptions: { dateStrings: true, typeCast: true },
};

const test = {
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: 'mysql',
  timezone: '+09:00',
  dialectOptions: { dateStrings: true, typeCast: true },
};

module.exports = { development, production, test };
