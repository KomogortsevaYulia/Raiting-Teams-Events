import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1708682807946 implements MigrationInterface {
    name = 'Auto1708682807946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_schedule" DROP CONSTRAINT "FK_75162e80c57d7f36cf2acfd29d0"`);
        await queryRunner.query(`ALTER TABLE "team_schedule" DROP COLUMN "id_cabinet"`);
        await queryRunner.query(`ALTER TABLE "cabinets_time" ADD "id_team_schedule" integer`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2024-02-23T10:07:01.334Z"'`);
        await queryRunner.query(`ALTER TABLE "cabinets_time" ADD CONSTRAINT "FK_d2321248ef3678a824334c6619d" FOREIGN KEY ("id_team_schedule") REFERENCES "team_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cabinets_time" DROP CONSTRAINT "FK_d2321248ef3678a824334c6619d"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2024-02-23 09:32:06.27'`);
        await queryRunner.query(`ALTER TABLE "cabinets_time" DROP COLUMN "id_team_schedule"`);
        await queryRunner.query(`ALTER TABLE "team_schedule" ADD "id_cabinet" integer`);
        await queryRunner.query(`ALTER TABLE "team_schedule" ADD CONSTRAINT "FK_75162e80c57d7f36cf2acfd29d0" FOREIGN KEY ("id_cabinet") REFERENCES "cabinets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
