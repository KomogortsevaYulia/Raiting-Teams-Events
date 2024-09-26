import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1691811999744 implements MigrationInterface {
  name = 'Auto1691811999744';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "requisition_fields" DROP CONSTRAINT "FK_3777bd9d0f2897d0d24faf345bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "form_fields" DROP CONSTRAINT "FK_c2076d2b47add1aaa07608e0cf2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2023-08-12T03:46:49.526Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisition_fields" ADD CONSTRAINT "FK_3777bd9d0f2897d0d24faf345bf" FOREIGN KEY ("form_fields_id") REFERENCES "form_fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "form_fields" ADD CONSTRAINT "FK_c2076d2b47add1aaa07608e0cf2" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "form_fields" DROP CONSTRAINT "FK_c2076d2b47add1aaa07608e0cf2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisition_fields" DROP CONSTRAINT "FK_3777bd9d0f2897d0d24faf345bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2023-08-11 09:29:31.342'`,
    );
    await queryRunner.query(
      `ALTER TABLE "form_fields" ADD CONSTRAINT "FK_c2076d2b47add1aaa07608e0cf2" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisition_fields" ADD CONSTRAINT "FK_3777bd9d0f2897d0d24faf345bf" FOREIGN KEY ("form_fields_id") REFERENCES "form_fields"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
