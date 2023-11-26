import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1680782719628 implements MigrationInterface {
  name = 'auto1680782719628';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "course" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "course"`);
  }
}
