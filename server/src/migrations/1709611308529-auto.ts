import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1709611308529 implements MigrationInterface {
    name = 'Auto1709611308529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team_photo" ("id" SERIAL NOT NULL, "image" character varying NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "id_team" integer, CONSTRAINT "PK_7eb0a99a14749ad1b1bcb9be7a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "links" text`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2024-03-05T04:01:57.582Z"'`);
        await queryRunner.query(`ALTER TABLE "team_photo" ADD CONSTRAINT "FK_c53476b078c64e25bd7ac7d0d85" FOREIGN KEY ("id_team") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_photo" DROP CONSTRAINT "FK_c53476b078c64e25bd7ac7d0d85"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2024-03-02 03:02:32.135'`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "links"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "phone"`);
        await queryRunner.query(`DROP TABLE "team_photo"`);
    }

}
