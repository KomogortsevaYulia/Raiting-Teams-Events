import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1702646759598 implements MigrationInterface {
    name = 'Auto1702646759598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requisition_fields" DROP CONSTRAINT "FK_087b7eeee30e9f5e62b7ba603fc"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2023-12-15T13:26:06.587Z"'`);
        await queryRunner.query(`ALTER TABLE "requisition_fields" ADD CONSTRAINT "FK_087b7eeee30e9f5e62b7ba603fc" FOREIGN KEY ("requisition_id") REFERENCES "requisition"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requisition_fields" DROP CONSTRAINT "FK_087b7eeee30e9f5e62b7ba603fc"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2023-12-15 12:47:14.813'`);
        await queryRunner.query(`ALTER TABLE "requisition_fields" ADD CONSTRAINT "FK_087b7eeee30e9f5e62b7ba603fc" FOREIGN KEY ("requisition_id") REFERENCES "requisition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
