import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1669139449238 implements MigrationInterface {
    name = 'auto1669139449238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teams" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "direction" character varying NOT NULL, "image" character varying NOT NULL, "creation_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "teams"`);
    }

}
