import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1691647504541 implements MigrationInterface {
  name = 'Auto1691647504541';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "functions" DROP CONSTRAINT "FK_579f1e0cdab39bd43464fb882be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_functions" DROP CONSTRAINT "FK_414c47660792aa509c8f55adc7f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_functions" DROP CONSTRAINT "FK_bc78d14d218fc2e57e7a6941ab3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "forms" DROP CONSTRAINT "FK_b8df7e99e28d225024e56783b8e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "form_fields" DROP CONSTRAINT "FK_c2076d2b47add1aaa07608e0cf2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisition_fields" DROP CONSTRAINT "FK_3777bd9d0f2897d0d24faf345bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "achievements" DROP CONSTRAINT "FK_0c0cd24bc6e722c12cd45750434"`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" DROP CONSTRAINT "FK_811c873435715b3eb624d256a11"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2023-08-10T06:05:18.039Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "functions" ADD CONSTRAINT "FK_579f1e0cdab39bd43464fb882be" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_functions" ADD CONSTRAINT "FK_bc78d14d218fc2e57e7a6941ab3" FOREIGN KEY ("function_id") REFERENCES "functions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_functions" ADD CONSTRAINT "FK_414c47660792aa509c8f55adc7f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "forms" ADD CONSTRAINT "FK_b8df7e99e28d225024e56783b8e" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "form_fields" ADD CONSTRAINT "FK_c2076d2b47add1aaa07608e0cf2" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisition_fields" ADD CONSTRAINT "FK_3777bd9d0f2897d0d24faf345bf" FOREIGN KEY ("form_fields_id") REFERENCES "form_fields"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "achievements" ADD CONSTRAINT "FK_0c0cd24bc6e722c12cd45750434" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" ADD CONSTRAINT "FK_811c873435715b3eb624d256a11" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "journals" DROP CONSTRAINT "FK_811c873435715b3eb624d256a11"`,
    );
    await queryRunner.query(
      `ALTER TABLE "achievements" DROP CONSTRAINT "FK_0c0cd24bc6e722c12cd45750434"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisition_fields" DROP CONSTRAINT "FK_3777bd9d0f2897d0d24faf345bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "form_fields" DROP CONSTRAINT "FK_c2076d2b47add1aaa07608e0cf2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "forms" DROP CONSTRAINT "FK_b8df7e99e28d225024e56783b8e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_functions" DROP CONSTRAINT "FK_414c47660792aa509c8f55adc7f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_functions" DROP CONSTRAINT "FK_bc78d14d218fc2e57e7a6941ab3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "functions" DROP CONSTRAINT "FK_579f1e0cdab39bd43464fb882be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2023-06-23 15:12:14.68'`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" ADD CONSTRAINT "FK_811c873435715b3eb624d256a11" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "achievements" ADD CONSTRAINT "FK_0c0cd24bc6e722c12cd45750434" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisition_fields" ADD CONSTRAINT "FK_3777bd9d0f2897d0d24faf345bf" FOREIGN KEY ("form_fields_id") REFERENCES "form_fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "form_fields" ADD CONSTRAINT "FK_c2076d2b47add1aaa07608e0cf2" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "forms" ADD CONSTRAINT "FK_b8df7e99e28d225024e56783b8e" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_functions" ADD CONSTRAINT "FK_bc78d14d218fc2e57e7a6941ab3" FOREIGN KEY ("function_id") REFERENCES "functions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_functions" ADD CONSTRAINT "FK_414c47660792aa509c8f55adc7f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "functions" ADD CONSTRAINT "FK_579f1e0cdab39bd43464fb882be" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
