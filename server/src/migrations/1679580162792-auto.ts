import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1679580162792 implements MigrationInterface {
  name = 'auto1679580162792';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" ADD "images" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "dateStart" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "dateStart" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "dateEnd" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "dateEnd" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "dateEnd" SET DEFAULT '2023-03-23 13:46:39.557'`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "dateEnd" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "dateStart" SET DEFAULT '2023-03-23 13:46:39.557'`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "dateStart" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "images"`);
  }
}
