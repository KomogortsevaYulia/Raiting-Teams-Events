import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1700986271014 implements MigrationInterface {
    name = 'Auto1700986271014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_functions" ADD "dateCreate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_functions" ADD "dateUpdate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2023-11-26T08:11:23.893Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2023-11-13 12:38:55.219'`);
        await queryRunner.query(`ALTER TABLE "user_functions" DROP COLUMN "dateUpdate"`);
        await queryRunner.query(`ALTER TABLE "user_functions" DROP COLUMN "dateCreate"`);
    }

}
