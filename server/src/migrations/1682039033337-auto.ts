import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1682039033337 implements MigrationInterface {
  name = 'auto1682039033337';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "teams" ADD "is_archive" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "teams" ADD "cabinet" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "teams" ADD "charter_team" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "teams" ADD "document" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "document"`);
    await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "charter_team"`);
    await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "cabinet"`);
    await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "is_archive"`);
  }
}
