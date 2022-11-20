import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668931256490 implements MigrationInterface {
    name = 'auto1668931256490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("title" character varying NOT NULL, "permissions" text NOT NULL, CONSTRAINT "PK_08e86fada7ae67b1689f948e83e" PRIMARY KEY ("title"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
