import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1691746161699 implements MigrationInterface {
    name = 'Auto1691746161699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requisition" RENAME COLUMN "status" TO "status_id"`);
        await queryRunner.query(`ALTER TYPE "public"."requisition_status_enum" RENAME TO "requisition_status_id_enum"`);
        await queryRunner.query(`ALTER TABLE "requisition" DROP COLUMN "status_id"`);
        await queryRunner.query(`ALTER TABLE "requisition" ADD "status_id" integer`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2023-08-11T09:29:31.342Z"'`);
        await queryRunner.query(`ALTER TABLE "requisition" ADD CONSTRAINT "FK_3330bf1b3acd2568b818c72b226" FOREIGN KEY ("status_id") REFERENCES "dictionary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requisition" DROP CONSTRAINT "FK_3330bf1b3acd2568b818c72b226"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2023-08-10 07:11:41.57'`);
        await queryRunner.query(`ALTER TABLE "requisition" DROP COLUMN "status_id"`);
        await queryRunner.query(`ALTER TABLE "requisition" ADD "status_id" "public"."requisition_status_id_enum" DEFAULT 'создана'`);
        await queryRunner.query(`ALTER TYPE "public"."requisition_status_id_enum" RENAME TO "requisition_status_enum"`);
        await queryRunner.query(`ALTER TABLE "requisition" RENAME COLUMN "status_id" TO "status"`);
    }

}
