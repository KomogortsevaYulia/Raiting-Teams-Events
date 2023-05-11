import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1682645917923 implements MigrationInterface {
    name = 'auto1682645917923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "requisition" ("User_id" SERIAL NOT NULL, "questionnaire_id" integer NOT NULL, "status" character varying NOT NULL, "dateCreate" TIMESTAMP NOT NULL, "dateUpdate" TIMESTAMP NOT NULL, CONSTRAINT "PK_10018a4d9ca625cfb84e2441f98" PRIMARY KEY ("User_id"))`);
        await queryRunner.query(`ALTER TABLE "journals" DROP COLUMN "event"`);
        await queryRunner.query(`ALTER TABLE "journals" DROP COLUMN "team"`);
        await queryRunner.query(`ALTER TABLE "journals" DROP COLUMN "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journals" ADD "user" integer`);
        await queryRunner.query(`ALTER TABLE "journals" ADD "team" integer`);
        await queryRunner.query(`ALTER TABLE "journals" ADD "event" integer`);
        await queryRunner.query(`DROP TABLE "requisition"`);
    }

}
