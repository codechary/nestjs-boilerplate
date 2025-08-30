import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1756557681961 implements MigrationInterface {
  name = 'CreateUsersTable1756557681961';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  -- Ensure UUID extension is enabled

      CREATE TABLE "users" (
        "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),  -- UUID default value
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "first_name" varchar(128) NOT NULL,
        "last_name" varchar(128) NOT NULL,  -- Fixed spacing issue here
        "email" varchar(256) NOT NULL,
        CONSTRAINT "UQ_email" UNIQUE ("email")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
