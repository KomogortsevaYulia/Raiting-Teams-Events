import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1699879128879 implements MigrationInterface {
    name = 'Auto1699879128879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requisition" ADD "comment_leader" character varying`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '"2023-11-13T12:38:55.219Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "date_update" SET DEFAULT '2023-10-28 13:44:56.337'`);
        await queryRunner.query(`ALTER TABLE "requisition" DROP COLUMN "comment_leader"`);
    }

}
