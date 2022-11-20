import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668934553468 implements MigrationInterface {
    name = 'auto1668934553468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "forms" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "fields" text NOT NULL, "fields_id" integer, "team_id" integer, CONSTRAINT "PK_ba062fd30b06814a60756f233da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "forms" ADD CONSTRAINT "FK_44e482eeb687275d10890f4214b" FOREIGN KEY ("fields_id") REFERENCES "form_fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forms" ADD CONSTRAINT "FK_b8df7e99e28d225024e56783b8e" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forms" DROP CONSTRAINT "FK_b8df7e99e28d225024e56783b8e"`);
        await queryRunner.query(`ALTER TABLE "forms" DROP CONSTRAINT "FK_44e482eeb687275d10890f4214b"`);
        await queryRunner.query(`DROP TABLE "forms"`);
    }

}
