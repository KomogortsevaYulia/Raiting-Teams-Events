import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1680782266551 implements MigrationInterface {
  name = 'auto1680782266551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "image" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
  }
}
