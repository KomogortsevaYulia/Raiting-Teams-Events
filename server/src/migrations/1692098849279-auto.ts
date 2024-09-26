import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1692098849279 implements MigrationInterface {
  name = 'Auto1692098849279';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "requisition" ADD "team_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "requisition" ALTER COLUMN "date_create" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisition" ALTER COLUMN "date_update" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "teams" ALTER COLUMN "creation_date" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2023-08-15T11:27:37.414Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisition" ADD CONSTRAINT "FK_2bc07f9556b7e089dc2785228ed" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "requisition" DROP CONSTRAINT "FK_2bc07f9556b7e089dc2785228ed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2023-08-12 03:46:49.526'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teams" ALTER COLUMN "creation_date" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisition" ALTER COLUMN "date_update" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisition" ALTER COLUMN "date_create" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "requisition" DROP COLUMN "team_id"`);
  }
}
