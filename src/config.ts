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
      mysql: {
        db: process.env.MYSQL_DB,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
      },
    },
    apikey: process.env.X_API_KEY,
  };

  return config;
});
