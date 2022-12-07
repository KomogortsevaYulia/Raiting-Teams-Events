import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1670337634745 implements MigrationInterface {
    name = 'auto1670337634745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "description"`);
    }

}
