import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1680581129109 implements MigrationInterface {
  name = 'auto1680581129109';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "teams" ADD "short_description" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "teams" DROP COLUMN "short_description"`,
    );
  }
}
