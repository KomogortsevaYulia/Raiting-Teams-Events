import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1682308636196 implements MigrationInterface {
  name = 'auto1682308636196';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" ADD "status" boolean`);
    await queryRunner.query(
      `ALTER TABLE "events" ADD "phone" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "email" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "events" ADD "social_links" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "social_links"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "status"`);
  }
}
