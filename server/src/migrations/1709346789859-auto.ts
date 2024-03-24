import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1709346789859 implements MigrationInterface {
    name = 'Auto1709346789859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cabinets" ADD "tags" text`);
        await queryRunner.query(`ALTER TABLE "cabinets" ADD "id_direction" integer`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2024-03-02T02:33:16.136Z"'`);
        await queryRunner.query(`ALTER TABLE "cabinets" ADD CONSTRAINT "FK_d29de50b3ab5d01023844a151e6" FOREIGN KEY ("id_direction") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cabinets" DROP CONSTRAINT "FK_d29de50b3ab5d01023844a151e6"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2024-02-23 10:07:01.334'`);
        await queryRunner.query(`ALTER TABLE "cabinets" DROP COLUMN "id_direction"`);
        await queryRunner.query(`ALTER TABLE "cabinets" DROP COLUMN "tags"`);
    }

}
