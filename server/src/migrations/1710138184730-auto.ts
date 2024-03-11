import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1710138184730 implements MigrationInterface {
    name = 'Auto1710138184730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2024-03-11T06:23:13.994Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2024-03-11 05:46:35.653'`);
    }

}
