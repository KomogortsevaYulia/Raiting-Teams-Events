import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1669139294917 implements MigrationInterface {
    name = 'auto1669139294917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "studnumber" integer NOT NULL, "fullname" character varying NOT NULL, "email" character varying NOT NULL, "education_group" character varying NOT NULL, "institute" character varying NOT NULL, "gender" character varying NOT NULL, "phone" character varying NOT NULL, "birthdate" TIMESTAMP NOT NULL, "type_time_study" character varying NOT NULL, "permissions" text NOT NULL, "title_role" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9c113178e30b117d4ec1db45691" FOREIGN KEY ("title_role") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9c113178e30b117d4ec1db45691"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
