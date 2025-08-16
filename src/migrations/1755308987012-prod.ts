import { MigrationInterface, QueryRunner } from "typeorm";

export class Prod1755308987012 implements MigrationInterface {
    name = 'Prod1755308987012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_project" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "totalStocks" integer NOT NULL, "stockPrice" integer NOT NULL, "currency" varchar NOT NULL, "startDate" datetime NOT NULL, "endDate" datetime NOT NULL, "phase" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_project"("id", "title", "description", "totalStocks", "stockPrice", "currency", "startDate", "endDate", "phase") SELECT "id", "title", "description", "totalStocks", "stockPrice", "currency", "startDate", "endDate", "phase" FROM "project"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`ALTER TABLE "temporary_project" RENAME TO "project"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" RENAME TO "temporary_project"`);
        await queryRunner.query(`CREATE TABLE "project" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "totalStocks" integer NOT NULL, "stockPrice" integer NOT NULL, "currency" varchar NOT NULL, "startDate" datetime NOT NULL, "endDate" datetime NOT NULL, "phase" integer NOT NULL DEFAULT (0))`);
        await queryRunner.query(`INSERT INTO "project"("id", "title", "description", "totalStocks", "stockPrice", "currency", "startDate", "endDate", "phase") SELECT "id", "title", "description", "totalStocks", "stockPrice", "currency", "startDate", "endDate", "phase" FROM "temporary_project"`);
        await queryRunner.query(`DROP TABLE "temporary_project"`);
    }

}
