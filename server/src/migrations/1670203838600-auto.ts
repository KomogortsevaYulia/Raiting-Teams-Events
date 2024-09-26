import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1670203838600 implements MigrationInterface {
  name = 'auto1670203838600';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "events" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "title" character varying NOT NULL, "users_id" text NOT NULL, "dateStart" TIMESTAMP NOT NULL, "dateEnd" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "size" character varying NOT NULL, "repeat" boolean NOT NULL, "tags" text NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "permissions" text NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."teams_type_team_enum" AS ENUM('direction', 'university', 'teams')`,
    );
    await queryRunner.query(
      `CREATE TABLE "teams" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "creation_date" TIMESTAMP NOT NULL, "image" text NOT NULL, "tags" text NOT NULL, "description" character varying NOT NULL, "type_team" "public"."teams_type_team_enum" NOT NULL DEFAULT 'teams', "shortname" character varying NOT NULL, "id_parent" integer, CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."functions_type_function_enum" AS ENUM('general', 'special')`,
    );
    await queryRunner.query(
      `CREATE TABLE "functions" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "type_function" "public"."functions_type_function_enum" NOT NULL DEFAULT 'special', "team_id" integer, "roleIdId" integer, CONSTRAINT "PK_203889d2ae5a98ffc137739301e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_functions" ("id" SERIAL NOT NULL, "dateStart" TIMESTAMP NOT NULL, "dateEnd" TIMESTAMP NOT NULL, "function_id" integer, "user_id" integer, CONSTRAINT "PK_1b04a9e32d9511b33fe11b6ffda" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "studnumber" integer NOT NULL, "fullname" character varying NOT NULL, "email" character varying NOT NULL, "education_group" character varying NOT NULL, "institute" character varying NOT NULL, "gender" character varying NOT NULL, "phone" character varying NOT NULL, "birthdate" date NOT NULL, "type_time_study" character varying NOT NULL, "permissions" text NOT NULL, "title_role" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "form_fields" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_dc4b73290f2926c3a7d7c92d1e1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_forms" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "value" character varying NOT NULL, "field_id" integer, "user_id" integer, CONSTRAINT "PK_4e83554892a57d53117dc9a12bf" PRIMARY KEY ("id", "date"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "forms" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "fields_id" text NOT NULL, "team_id" integer, CONSTRAINT "PK_ba062fd30b06814a60756f233da" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "teams" ADD CONSTRAINT "FK_c0b0c479964469ab9fbbed02c8d" FOREIGN KEY ("id_parent") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "functions" ADD CONSTRAINT "FK_579f1e0cdab39bd43464fb882be" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "functions" ADD CONSTRAINT "FK_c8b15425a585fcedc6b1f7f734a" FOREIGN KEY ("roleIdId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_functions" ADD CONSTRAINT "FK_bc78d14d218fc2e57e7a6941ab3" FOREIGN KEY ("function_id") REFERENCES "functions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_functions" ADD CONSTRAINT "FK_414c47660792aa509c8f55adc7f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_9c113178e30b117d4ec1db45691" FOREIGN KEY ("title_role") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_forms" ADD CONSTRAINT "FK_f8a70ba3fd198a242c1f76737aa" FOREIGN KEY ("field_id") REFERENCES "form_fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_forms" ADD CONSTRAINT "FK_dc8c58310d9794b123b514516a3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "forms" ADD CONSTRAINT "FK_b8df7e99e28d225024e56783b8e" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "forms" DROP CONSTRAINT "FK_b8df7e99e28d225024e56783b8e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_forms" DROP CONSTRAINT "FK_dc8c58310d9794b123b514516a3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_forms" DROP CONSTRAINT "FK_f8a70ba3fd198a242c1f76737aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_9c113178e30b117d4ec1db45691"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_functions" DROP CONSTRAINT "FK_414c47660792aa509c8f55adc7f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_functions" DROP CONSTRAINT "FK_bc78d14d218fc2e57e7a6941ab3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "functions" DROP CONSTRAINT "FK_c8b15425a585fcedc6b1f7f734a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "functions" DROP CONSTRAINT "FK_579f1e0cdab39bd43464fb882be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teams" DROP CONSTRAINT "FK_c0b0c479964469ab9fbbed02c8d"`,
    );
    await queryRunner.query(`DROP TABLE "forms"`);
    await queryRunner.query(`DROP TABLE "user_forms"`);
    await queryRunner.query(`DROP TABLE "form_fields"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "user_functions"`);
    await queryRunner.query(`DROP TABLE "functions"`);
    await queryRunner.query(
      `DROP TYPE "public"."functions_type_function_enum"`,
    );
    await queryRunner.query(`DROP TABLE "teams"`);
    await queryRunner.query(`DROP TYPE "public"."teams_type_team_enum"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "events"`);
  }
}
