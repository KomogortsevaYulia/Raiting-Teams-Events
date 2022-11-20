import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668876431315 implements MigrationInterface {
    name = 'auto1668876431315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "teams_id_seq" OWNED BY "teams"."id"`);
        await queryRunner.query(`ALTER TABLE "teams" ALTER COLUMN "id" SET DEFAULT nextval('"teams_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "teams" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "users_id_seq" OWNED BY "users"."id"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('"users_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "users_id_seq"`);
        await queryRunner.query(`ALTER TABLE "teams" ALTER COLUMN "id" SET DEFAULT nextval('team_id_seq')`);
        await queryRunner.query(`ALTER TABLE "teams" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "teams_id_seq"`);
    }

}
