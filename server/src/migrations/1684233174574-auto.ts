import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1684233174574 implements MigrationInterface {
  name = 'auto1684233174574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "form_fields" ADD "required" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "form_fields" DROP COLUMN "required"`);
  }
}
