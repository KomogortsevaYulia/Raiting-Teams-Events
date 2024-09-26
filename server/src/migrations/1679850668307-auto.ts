import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1679850668307 implements MigrationInterface {
  name = 'auto1679850668307';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "count_people" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "count_people" SET NOT NULL`,
    );
  }
}
