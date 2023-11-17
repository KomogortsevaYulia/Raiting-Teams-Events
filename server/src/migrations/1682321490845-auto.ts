import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1682321490845 implements MigrationInterface {
  name = 'auto1682321490845';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dictionary" ADD "class" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "dictionary" DROP COLUMN "class"`);
  }
}
