import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668925384896 implements MigrationInterface {
    name = 'auto1668925384896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "events" ("id" integer NOT NULL, "type" character varying NOT NULL, "title" character varying NOT NULL, "id_users" text NOT NULL, "dateStart" date NOT NULL, "dateEnd" date NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "size" character varying NOT NULL, "repeat" boolean NOT NULL, "tags" text NOT NULL, "idUsersId" integer, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("title" character varying NOT NULL, "permission" character varying NOT NULL, CONSTRAINT "PK_08e86fada7ae67b1689f948e83e" PRIMARY KEY ("title"))`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "users_id_seq" OWNED BY "users"."id"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('"users_id_seq"')`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "teams_id_seq" OWNED BY "teams"."id"`);
        await queryRunner.query(`ALTER TABLE "teams" ALTER COLUMN "id" SET DEFAULT nextval('"teams_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_bf741efbbcfee7f6c83a50dc096" FOREIGN KEY ("idUsersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_bf741efbbcfee7f6c83a50dc096"`);
        await queryRunner.query(`ALTER TABLE "teams" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "teams_id_seq"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "users_id_seq"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "events"`);
    }

}
