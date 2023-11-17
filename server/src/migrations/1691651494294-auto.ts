import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1691651494294 implements MigrationInterface {
  name = 'Auto1691651494294';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" ADD "user_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "teams" ADD "set_open" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2023-08-10T07:11:41.570Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_09f256fb7f9a05f0ed9927f406b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_09f256fb7f9a05f0ed9927f406b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2023-08-10 06:05:18.039'`,
    );
    await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "set_open"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "user_id"`);
  }
}
