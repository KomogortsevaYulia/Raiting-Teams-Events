import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1679763749838 implements MigrationInterface {
  name = 'auto1679763749838';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" ADD "count_people" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "count_people"`);
  }
}
