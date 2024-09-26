import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1679849682079 implements MigrationInterface {
  name = 'auto1679849682079';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "journals" DROP COLUMN "dateStart"`);
    await queryRunner.query(
      `ALTER TABLE "journals" ADD "dateParticipation" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" ADD "qr_code" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" ADD "is_uchastnik" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" ADD "is_organizator" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" ADD "is_qr_controller" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" ADD "is_can_set_results" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" ADD "is_registered" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" ADD "is_participation" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "journals" ADD "event" integer`);
    await queryRunner.query(`ALTER TABLE "journals" ADD "team" integer`);
    await queryRunner.query(`ALTER TABLE "journals" ADD "user" integer`);
    await queryRunner.query(
      `ALTER TABLE "journals" ADD "result_place" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "journals" DROP COLUMN "result_place"`,
    );
    await queryRunner.query(`ALTER TABLE "journals" DROP COLUMN "user"`);
    await queryRunner.query(`ALTER TABLE "journals" DROP COLUMN "team"`);
    await queryRunner.query(`ALTER TABLE "journals" DROP COLUMN "event"`);
    await queryRunner.query(
      `ALTER TABLE "journals" DROP COLUMN "is_participation"`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" DROP COLUMN "is_registered"`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" DROP COLUMN "is_can_set_results"`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" DROP COLUMN "is_qr_controller"`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" DROP COLUMN "is_organizator"`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" DROP COLUMN "is_uchastnik"`,
    );
    await queryRunner.query(`ALTER TABLE "journals" DROP COLUMN "qr_code"`);
    await queryRunner.query(
      `ALTER TABLE "journals" DROP COLUMN "dateParticipation"`,
    );
    await queryRunner.query(`ALTER TABLE "journals" ADD "dateStart" TIMESTAMP`);
  }
}
