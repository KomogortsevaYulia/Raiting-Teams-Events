import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1709348545479 implements MigrationInterface {
    name = 'Auto1709348545479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" RENAME COLUMN "cabinet" TO "cabinets"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2024-03-02T03:02:32.135Z"'`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "cabinets"`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "cabinets" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "cabinets"`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "cabinets" character varying`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2024-03-02 02:33:16.136'`);
        await queryRunner.query(`ALTER TABLE "teams" RENAME COLUMN "cabinets" TO "cabinet"`);
    }

}
