import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668875407249 implements MigrationInterface {
    name = 'auto1668875407249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "form" ("id" SERIAL NOT NULL, "date" date NOT NULL, "description" character varying NOT NULL, "fieldsId" integer, "teamId" integer, CONSTRAINT "PK_8f72b95aa2f8ba82cf95dc7579e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_forms" ("id" SERIAL NOT NULL, "date" date NOT NULL, "value" character varying NOT NULL, "fieldsId" integer, "userId" integer, CONSTRAINT "PK_c766d6c29061fa7e9ca8b7d222b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "form_field" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_135904ddb60085b07254ea4f485" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "teams_id_seq" OWNED BY "teams"."id"`);
        await queryRunner.query(`ALTER TABLE "teams" ALTER COLUMN "id" SET DEFAULT nextval('"teams_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "teams" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "users_id_seq" OWNED BY "users"."id"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('"users_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_0442eda3ef6b50b6956d3c21dff" FOREIGN KEY ("fieldsId") REFERENCES "form_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_0ae0ce46714d032ae4efe28be5d" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_forms" ADD CONSTRAINT "FK_01444c46fb6ea090e2a5ca0a550" FOREIGN KEY ("fieldsId") REFERENCES "form_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_forms" ADD CONSTRAINT "FK_fb79c9c05b8810b5327681af66c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_forms" DROP CONSTRAINT "FK_fb79c9c05b8810b5327681af66c"`);
        await queryRunner.query(`ALTER TABLE "user_forms" DROP CONSTRAINT "FK_01444c46fb6ea090e2a5ca0a550"`);
        await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_0ae0ce46714d032ae4efe28be5d"`);
        await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_0442eda3ef6b50b6956d3c21dff"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "users_id_seq"`);
        await queryRunner.query(`ALTER TABLE "teams" ALTER COLUMN "id" SET DEFAULT nextval('team_id_seq')`);
        await queryRunner.query(`ALTER TABLE "teams" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "teams_id_seq"`);
        await queryRunner.query(`DROP TABLE "form_field"`);
        await queryRunner.query(`DROP TABLE "user_forms"`);
        await queryRunner.query(`DROP TABLE "form"`);
    }

}
