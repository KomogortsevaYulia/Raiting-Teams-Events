import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1710135986330 implements MigrationInterface {
    name = 'Auto1710135986330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cabinets_time" RENAME COLUMN "day_week" TO "id_day_week"`);
        await queryRunner.query(`ALTER TYPE "public"."cabinets_time_day_week_enum" RENAME TO "cabinets_time_id_day_week_enum"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2024-03-11T05:46:35.653Z"'`);
        await queryRunner.query(`ALTER TABLE "cabinets_time" DROP COLUMN "id_day_week"`);
        await queryRunner.query(`ALTER TABLE "cabinets_time" ADD "id_day_week" integer`);
        await queryRunner.query(`ALTER TABLE "cabinets_time" ADD CONSTRAINT "FK_6975311213f5864319ee5c9203e" FOREIGN KEY ("id_day_week") REFERENCES "dictionary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cabinets_time" DROP CONSTRAINT "FK_6975311213f5864319ee5c9203e"`);
        await queryRunner.query(`ALTER TABLE "cabinets_time" DROP COLUMN "id_day_week"`);
        await queryRunner.query(`ALTER TABLE "cabinets_time" ADD "id_day_week" "public"."cabinets_time_id_day_week_enum" NOT NULL DEFAULT 'monday'`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2024-03-05 04:01:57.582'`);
        await queryRunner.query(`ALTER TYPE "public"."cabinets_time_id_day_week_enum" RENAME TO "cabinets_time_day_week_enum"`);
        await queryRunner.query(`ALTER TABLE "cabinets_time" RENAME COLUMN "id_day_week" TO "day_week"`);
    }

}
