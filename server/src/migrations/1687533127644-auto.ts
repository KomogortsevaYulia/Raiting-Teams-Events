import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1687533127644 implements MigrationInterface {
  name = 'Auto1687533127644';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" ADD "date_update" TIMESTAMP NOT NULL DEFAULT '"2023-06-23T15:12:14.680Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "date_update"`);
  }
}
