import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1701158041978 implements MigrationInterface {
    name = 'Auto1701158041978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cabinets" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_bc7cc7e3c814364dbdde3d3be6c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team_schedule" ("id" SERIAL NOT NULL, "dateStart" TIMESTAMP NOT NULL, "dateEnd" TIMESTAMP NOT NULL, "id_cabinet" integer, "id_user" integer, "id_team" integer, CONSTRAINT "PK_9d36326762f4ad471c8c3c03291" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team_visits" ("id" SERIAL NOT NULL, "dateVisit" TIMESTAMP NOT NULL, "id_user" integer, "id_team_schedule" integer, CONSTRAINT "PK_e0b94c1f167705efb98bcc3b305" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2023-11-28T07:54:13.351Z"'`);
        await queryRunner.query(`ALTER TABLE "team_schedule" ADD CONSTRAINT "FK_75162e80c57d7f36cf2acfd29d0" FOREIGN KEY ("id_cabinet") REFERENCES "cabinets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_schedule" ADD CONSTRAINT "FK_1985917dba88a2aa8a4ae1bd81a" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_schedule" ADD CONSTRAINT "FK_177c2cbee73b0d3f3e75ffaa2a8" FOREIGN KEY ("id_team") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_visits" ADD CONSTRAINT "FK_725f33cc8e48dabebb1a96dc8de" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_visits" ADD CONSTRAINT "FK_daeed44bf925dce11d8f3a62439" FOREIGN KEY ("id_team_schedule") REFERENCES "team_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_visits" DROP CONSTRAINT "FK_daeed44bf925dce11d8f3a62439"`);
        await queryRunner.query(`ALTER TABLE "team_visits" DROP CONSTRAINT "FK_725f33cc8e48dabebb1a96dc8de"`);
        await queryRunner.query(`ALTER TABLE "team_schedule" DROP CONSTRAINT "FK_177c2cbee73b0d3f3e75ffaa2a8"`);
        await queryRunner.query(`ALTER TABLE "team_schedule" DROP CONSTRAINT "FK_1985917dba88a2aa8a4ae1bd81a"`);
        await queryRunner.query(`ALTER TABLE "team_schedule" DROP CONSTRAINT "FK_75162e80c57d7f36cf2acfd29d0"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2023-11-26 08:11:23.893'`);
        await queryRunner.query(`DROP TABLE "team_visits"`);
        await queryRunner.query(`DROP TABLE "team_schedule"`);
        await queryRunner.query(`DROP TABLE "cabinets"`);
    }

}
