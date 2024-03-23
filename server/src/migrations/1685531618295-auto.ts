import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1685531618295 implements MigrationInterface {
  name = 'auto1685531618295';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "forms" DROP COLUMN "fields_id"`);
    await queryRunner.query(
      `ALTER TABLE "form_fields" ADD "archive" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "form_fields" ADD "form_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "form_fields" ADD CONSTRAINT "FK_c2076d2b47add1aaa07608e0cf2" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "form_fields" DROP CONSTRAINT "FK_c2076d2b47add1aaa07608e0cf2"`,
    );
    await queryRunner.query(`ALTER TABLE "form_fields" DROP COLUMN "form_id"`);
    await queryRunner.query(`ALTER TABLE "form_fields" DROP COLUMN "archive"`);
    await queryRunner.query(
      `ALTER TABLE "forms" ADD "fields_id" text NOT NULL`,
    );
  }
}
