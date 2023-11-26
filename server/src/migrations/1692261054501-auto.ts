import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1692261054501 implements MigrationInterface {
  name = 'Auto1692261054501';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" RENAME COLUMN "status" TO "status_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2023-08-17T08:31:05.649Z"'`,
    );
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "status_id"`);
    await queryRunner.query(`ALTER TABLE "events" ADD "status_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_723091d08c3c5415a1999597464" FOREIGN KEY ("status_id") REFERENCES "dictionary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_723091d08c3c5415a1999597464"`,
    );
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "status_id"`);
    await queryRunner.query(`ALTER TABLE "events" ADD "status_id" boolean`);
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2023-08-15 11:27:37.414'`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" RENAME COLUMN "status_id" TO "status"`,
    );
  }
}
