import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1684415314370 implements MigrationInterface {
  name = 'auto1684415314370';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "journals" DROP COLUMN "event"`);
    await queryRunner.query(`ALTER TABLE "journals" DROP COLUMN "team"`);
    await queryRunner.query(`ALTER TABLE "journals" DROP COLUMN "user"`);
    await queryRunner.query(
      `ALTER TABLE "achievements" ADD "need_in_rating" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "achievements" ADD "event_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "achievements" ADD CONSTRAINT "FK_439fe2afbe76423baefd988dbd8" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "achievements" DROP CONSTRAINT "FK_439fe2afbe76423baefd988dbd8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "achievements" DROP COLUMN "event_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "achievements" DROP COLUMN "need_in_rating"`,
    );
    await queryRunner.query(`ALTER TABLE "journals" ADD "user" integer`);
    await queryRunner.query(`ALTER TABLE "journals" ADD "team" integer`);
    await queryRunner.query(`ALTER TABLE "journals" ADD "event" integer`);
  }
}
