import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668311934367 implements MigrationInterface {
    name = 'auto1668311934367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "direction" character varying NOT NULL, "image" character varying NOT NULL, "creation_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "team"`);
    }

}
