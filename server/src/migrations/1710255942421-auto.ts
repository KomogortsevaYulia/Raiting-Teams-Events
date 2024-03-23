import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1710255942421 implements MigrationInterface {
    name = 'Auto1710255942421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cabinets_time" ADD "date" TIMESTAMP NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "cabinets_time" ADD "id_user" integer`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2024-03-12T15:05:50.026Z"'`);
        await queryRunner.query(`ALTER TABLE "cabinets_time" ADD CONSTRAINT "FK_4e8c4114978e749fc9e42136852" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cabinets_time" DROP CONSTRAINT "FK_4e8c4114978e749fc9e42136852"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2024-03-11 05:46:35.653'`);
        await queryRunner.query(`ALTER TABLE "cabinets_time" DROP COLUMN "id_user"`);
        await queryRunner.query(`ALTER TABLE "cabinets_time" DROP COLUMN "date"`);
    }

}
