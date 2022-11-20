import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668958044639 implements MigrationInterface {
    name = 'auto1668958044639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forms" DROP COLUMN "fields"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forms" ADD "fields" text NOT NULL`);
    }

}
