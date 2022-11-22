import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1669139707369 implements MigrationInterface {
    name = 'auto1669139707369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."functions_type_enum" AS ENUM('general', 'special')`);
        await queryRunner.query(`CREATE TABLE "functions" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "type" "public"."functions_type_enum" NOT NULL DEFAULT 'special', "team_id" integer, CONSTRAINT "PK_203889d2ae5a98ffc137739301e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "functions" ADD CONSTRAINT "FK_579f1e0cdab39bd43464fb882be" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "functions" DROP CONSTRAINT "FK_579f1e0cdab39bd43464fb882be"`);
        await queryRunner.query(`DROP TABLE "functions"`);
        await queryRunner.query(`DROP TYPE "public"."functions_type_enum"`);
    }

}
