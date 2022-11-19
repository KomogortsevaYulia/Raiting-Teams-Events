import { MigrationInterface, QueryRunner } from "typeorm";

export class renameTeams1668317711873 implements MigrationInterface {
    name = 'renameTeams1668317711873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" RENAME TO "teams"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" RENAME TO "team"`);
    }

}
