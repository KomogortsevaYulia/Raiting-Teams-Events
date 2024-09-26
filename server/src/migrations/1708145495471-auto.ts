import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1708145495471 implements MigrationInterface {
    name = 'Auto1708145495471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_visits" ADD "status_visit" boolean`);
        await queryRunner.query(`ALTER TABLE "team_visits" ADD "comment" character varying`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2024-02-17T04:51:41.619Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2023-12-15 13:26:06.587'`);
        await queryRunner.query(`ALTER TABLE "team_visits" DROP COLUMN "comment"`);
        await queryRunner.query(`ALTER TABLE "team_visits" DROP COLUMN "status_visit"`);
    }

}
