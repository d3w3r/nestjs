import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  const config = {
    database: {
      pg: {
        db: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
      },
    },
    apikey: process.env.X_API_KEY,
  };

  return config;
});
