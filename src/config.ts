import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  const config = {
    database: {
      mongo: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
      },
    },
    apikey: process.env.X_API_KEY,
  };

  return config;
});
