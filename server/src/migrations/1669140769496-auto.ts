import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1669140769496 implements MigrationInterface {
    name = 'auto1669140769496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "forms" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "fields_id" text NOT NULL, "team_id" integer, CONSTRAINT "PK_ba062fd30b06814a60756f233da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "forms" ADD CONSTRAINT "FK_b8df7e99e28d225024e56783b8e" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forms" DROP CONSTRAINT "FK_b8df7e99e28d225024e56783b8e"`);
        await queryRunner.query(`DROP TABLE "forms"`);
    }

}
