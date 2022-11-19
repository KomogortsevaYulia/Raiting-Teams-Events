import { MigrationInterface, QueryRunner } from "typeorm";

export class renameUsers1668317276942 implements MigrationInterface {
    name = 'renameUsers1668317276942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "user"`);
    }

}
