import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  const config = {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    apikey: process.env.X_API_KEY,
  };

  return config;
});
