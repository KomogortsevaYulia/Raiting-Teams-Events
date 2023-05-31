import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1685541976341 implements MigrationInterface {
    name = 'auto1685541976341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "requisition_fields" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "form_fields_id" integer, "requisition_id" integer, CONSTRAINT "PK_b5114990d6fde9a186b1c5a896b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "requisition" ADD "requisition_id" integer`);
        await queryRunner.query(`ALTER TABLE "requisition" ADD CONSTRAINT "FK_e5f84dab8cc95e267e2238d677d" FOREIGN KEY ("requisition_id") REFERENCES "requisition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requisition_fields" ADD CONSTRAINT "FK_3777bd9d0f2897d0d24faf345bf" FOREIGN KEY ("form_fields_id") REFERENCES "form_fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requisition_fields" ADD CONSTRAINT "FK_087b7eeee30e9f5e62b7ba603fc" FOREIGN KEY ("requisition_id") REFERENCES "requisition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requisition_fields" DROP CONSTRAINT "FK_087b7eeee30e9f5e62b7ba603fc"`);
        await queryRunner.query(`ALTER TABLE "requisition_fields" DROP CONSTRAINT "FK_3777bd9d0f2897d0d24faf345bf"`);
        await queryRunner.query(`ALTER TABLE "requisition" DROP CONSTRAINT "FK_e5f84dab8cc95e267e2238d677d"`);
        await queryRunner.query(`ALTER TABLE "requisition" DROP COLUMN "requisition_id"`);
        await queryRunner.query(`DROP TABLE "requisition_fields"`);
    }

}
