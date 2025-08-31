import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  logging: true,  // Enable detailed logging
  migrations: [__dirname + 'src/migrations/*{.ts,.js}'], // Ensure this path is correct
  synchronize: false, // Always set to false when using migrations
  namingStrategy: new SnakeNamingStrategy(),
});
