import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668780838457 implements MigrationInterface {
    name = 'auto1668780838457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "functions" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "type" character varying NOT NULL, "teamId" integer, CONSTRAINT "PK_203889d2ae5a98ffc137739301e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "teams_id_seq" OWNED BY "teams"."id"`);
        await queryRunner.query(`ALTER TABLE "teams" ALTER COLUMN "id" SET DEFAULT nextval('"teams_id_seq"')`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "users_id_seq" OWNED BY "users"."id"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('"users_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "functions" ADD CONSTRAINT "FK_f7aa058518abda16495c05be523" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "functions" DROP CONSTRAINT "FK_f7aa058518abda16495c05be523"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "users_id_seq"`);
        await queryRunner.query(`ALTER TABLE "teams" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "teams_id_seq"`);
        await queryRunner.query(`DROP TABLE "functions"`);
    }

}
