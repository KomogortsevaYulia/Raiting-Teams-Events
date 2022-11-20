import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668877414751 implements MigrationInterface {
    name = 'auto1668877414751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("title" SERIAL NOT NULL, "permission" character varying NOT NULL, CONSTRAINT "PK_08e86fada7ae67b1689f948e83e" PRIMARY KEY ("title"))`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "teams_id_seq" OWNED BY "teams"."id"`);
        await queryRunner.query(`ALTER TABLE "teams" ALTER COLUMN "id" SET DEFAULT nextval('"teams_id_seq"')`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "users_id_seq" OWNED BY "users"."id"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('"users_id_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "users_id_seq"`);
        await queryRunner.query(`ALTER TABLE "teams" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "teams_id_seq"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
