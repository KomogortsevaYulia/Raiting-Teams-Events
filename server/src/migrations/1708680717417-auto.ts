import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1708680717417 implements MigrationInterface {
    name = 'Auto1708680717417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."cabinets_time_day_week_enum" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')`);
        await queryRunner.query(`CREATE TABLE "cabinets_time" ("id" SERIAL NOT NULL, "time_start" TIME NOT NULL, "time_end" TIME NOT NULL, "day_week" "public"."cabinets_time_day_week_enum" NOT NULL DEFAULT 'monday', "repeat" boolean NOT NULL DEFAULT true, "id_cabinet" integer, CONSTRAINT "PK_ee23cf95c9f85c6accbfe56c2f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2024-02-23T09:32:06.270Z"'`);
        await queryRunner.query(`ALTER TABLE "cabinets_time" ADD CONSTRAINT "FK_01a4ae3266a1e821afb02f6f6de" FOREIGN KEY ("id_cabinet") REFERENCES "cabinets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cabinets_time" DROP CONSTRAINT "FK_01a4ae3266a1e821afb02f6f6de"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2024-02-17 05:42:38.832'`);
        await queryRunner.query(`DROP TABLE "cabinets_time"`);
        await queryRunner.query(`DROP TYPE "public"."cabinets_time_day_week_enum"`);
    }

}
