import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1669140993738 implements MigrationInterface {
    name = 'auto1669140993738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_forms" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "value" character varying NOT NULL, "field_id" integer, "user_id" integer, CONSTRAINT "PK_4e83554892a57d53117dc9a12bf" PRIMARY KEY ("id", "date"))`);
        await queryRunner.query(`ALTER TABLE "user_forms" ADD CONSTRAINT "FK_f8a70ba3fd198a242c1f76737aa" FOREIGN KEY ("field_id") REFERENCES "form_fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_forms" ADD CONSTRAINT "FK_dc8c58310d9794b123b514516a3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_forms" DROP CONSTRAINT "FK_dc8c58310d9794b123b514516a3"`);
        await queryRunner.query(`ALTER TABLE "user_forms" DROP CONSTRAINT "FK_f8a70ba3fd198a242c1f76737aa"`);
        await queryRunner.query(`DROP TABLE "user_forms"`);
    }

}
