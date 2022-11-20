import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668963370728 implements MigrationInterface {
    name = 'auto1668963370728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "title_role" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9c113178e30b117d4ec1db45691" FOREIGN KEY ("title_role") REFERENCES "roles"("title") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9c113178e30b117d4ec1db45691"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "title_role"`);
    }

}
