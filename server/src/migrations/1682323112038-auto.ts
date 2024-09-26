import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1682323112038 implements MigrationInterface {
  name = 'auto1682323112038';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "dictionary" DROP COLUMN "class"`);
    await queryRunner.query(
      `ALTER TABLE "dictionary" ADD "class_name" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "dictionary" ADD "class_id" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "dictionary" DROP COLUMN "class_id"`);
    await queryRunner.query(
      `ALTER TABLE "dictionary" DROP COLUMN "class_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dictionary" ADD "class" character varying`,
    );
  }
}
