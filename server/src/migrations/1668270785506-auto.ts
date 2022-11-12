import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668270785506 implements MigrationInterface {
    name = 'auto1668270785506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "studnumber" integer NOT NULL, "fullname" character varying NOT NULL, "email" character varying NOT NULL, "education_group" character varying NOT NULL, "institute" character varying NOT NULL, "gender" character varying NOT NULL, "phone" character varying NOT NULL, "birthdate" date NOT NULL, "type_time_study" character varying NOT NULL, "permission" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
