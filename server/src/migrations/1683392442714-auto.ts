import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1683392442714 implements MigrationInterface {
  name = 'auto1683392442714';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."requisition_status_enum" AS ENUM('создана', 'принята', 'отклонена')`,
    );
    await queryRunner.query(
      `CREATE TABLE "requisition" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "status" "public"."requisition_status_enum" DEFAULT 'создана', "date_create" TIMESTAMP NOT NULL, "date_update" TIMESTAMP NOT NULL, "user_id" integer, "form_id" integer, CONSTRAINT "PK_53f9ab966e1c2d2d96cc5ac944a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisition" ADD CONSTRAINT "FK_1b08960843499439da23a3e0698" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisition" ADD CONSTRAINT "FK_b29ad90a8e17a394acdec4bbce2" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "requisition" DROP CONSTRAINT "FK_b29ad90a8e17a394acdec4bbce2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisition" DROP CONSTRAINT "FK_1b08960843499439da23a3e0698"`,
    );
    await queryRunner.query(`DROP TABLE "requisition"`);
    await queryRunner.query(`DROP TYPE "public"."requisition_status_enum"`);
  }
}
