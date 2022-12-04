import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1670166946003 implements MigrationInterface {
    name = 'auto1670166946003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthdate"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birthdate" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthdate"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birthdate" TIMESTAMP NOT NULL`);
    }

}
