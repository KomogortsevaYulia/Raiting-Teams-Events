import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1685591570485 implements MigrationInterface {
  name = 'auto1685591570485';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "requisition" DROP CONSTRAINT "FK_b29ad90a8e17a394acdec4bbce2"`,
    );
    await queryRunner.query(
      `CREATE TABLE "requisition_fields" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "form_fields_id" integer, "requisition_id" integer, CONSTRAINT "PK_b5114990d6fde9a186b1c5a896b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "requisition" DROP COLUMN "form_id"`);
    await queryRunner.query(
      `ALTER TABLE "requisition_fields" ADD CONSTRAINT "FK_3777bd9d0f2897d0d24faf345bf" FOREIGN KEY ("form_fields_id") REFERENCES "form_fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisition_fields" ADD CONSTRAINT "FK_087b7eeee30e9f5e62b7ba603fc" FOREIGN KEY ("requisition_id") REFERENCES "requisition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "requisition_fields" DROP CONSTRAINT "FK_087b7eeee30e9f5e62b7ba603fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisition_fields" DROP CONSTRAINT "FK_3777bd9d0f2897d0d24faf345bf"`,
    );
    await queryRunner.query(`ALTER TABLE "requisition" ADD "form_id" integer`);
    await queryRunner.query(`DROP TABLE "requisition_fields"`);
    await queryRunner.query(
      `ALTER TABLE "requisition" ADD CONSTRAINT "FK_b29ad90a8e17a394acdec4bbce2" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
