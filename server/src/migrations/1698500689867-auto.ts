import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1698500689867 implements MigrationInterface {
    name = 'Auto1698500689867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "bitrix_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_19fa01fc1212bbc25d4b1ae5654" UNIQUE ("bitrix_id")`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2023-10-28T13:44:56.337Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2023-08-17 08:31:05.649'`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_19fa01fc1212bbc25d4b1ae5654"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bitrix_id"`);
    }

}
