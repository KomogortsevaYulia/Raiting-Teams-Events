import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668933075639 implements MigrationInterface {
    name = 'auto1668933075639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "form_fields" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_dc4b73290f2926c3a7d7c92d1e1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "form_fields"`);
    }

}
