import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668931016916 implements MigrationInterface {
    name = 'auto1668931016916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "permission" TO "permissions"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "permissions" TO "permission"`);
    }

}
