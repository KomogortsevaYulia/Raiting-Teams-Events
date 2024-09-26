import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1679850268361 implements MigrationInterface {
  name = 'auto1679850268361';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "plan" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "images" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "tags" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "tags" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "images" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "plan" SET NOT NULL`,
    );
  }
}
