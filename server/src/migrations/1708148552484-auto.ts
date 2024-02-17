import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1708148552484 implements MigrationInterface {
    name = 'Auto1708148552484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_visits" RENAME COLUMN "dateVisit" TO "date_visit"`);
        await queryRunner.query(`ALTER TABLE "team_schedule" DROP COLUMN "dateStart"`);
        await queryRunner.query(`ALTER TABLE "team_schedule" DROP COLUMN "dateEnd"`);
        await queryRunner.query(`ALTER TABLE "team_schedule" ADD "date_start" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "team_schedule" ADD "date_end" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2024-02-17T05:42:38.832Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2024-02-17 04:51:41.619'`);
        await queryRunner.query(`ALTER TABLE "team_schedule" DROP COLUMN "date_end"`);
        await queryRunner.query(`ALTER TABLE "team_schedule" DROP COLUMN "date_start"`);
        await queryRunner.query(`ALTER TABLE "team_schedule" ADD "dateEnd" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team_schedule" ADD "dateStart" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team_visits" RENAME COLUMN "date_visit" TO "dateVisit"`);
    }

}
