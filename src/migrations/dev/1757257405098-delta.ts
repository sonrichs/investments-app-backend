import { MigrationInterface, QueryRunner } from 'typeorm';

export class Delta1757257405098 implements MigrationInterface {
  name = 'Delta1757257405098';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "name" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (0), "isAdmin" boolean NOT NULL DEFAULT (0), "nationalId" varchar, "type" varchar, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "email", "password", "name", "isActive", "isAdmin") SELECT "id", "email", "password", "name", "isActive", "isAdmin" FROM "user"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "name" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (0), "isAdmin" boolean NOT NULL DEFAULT (0), "nationalId" varchar, "type" varchar, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "email", "password", "name", "isActive", "isAdmin", "nationalId", "type") SELECT "id", "email", "password", "name", "isActive", "isAdmin", "nationalId", "type" FROM "temporary_user"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
  }
}
