import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668933466211 implements MigrationInterface {
    name = 'auto1668933466211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_forms" ("date" TIMESTAMP NOT NULL, "value" character varying NOT NULL, "field_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_11cec78c2561e7f3ed61edb14fb" PRIMARY KEY ("date", "field_id", "user_id"))`);
        await queryRunner.query(`ALTER TABLE "user_forms" ADD CONSTRAINT "FK_f8a70ba3fd198a242c1f76737aa" FOREIGN KEY ("field_id") REFERENCES "form_fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_forms" ADD CONSTRAINT "FK_dc8c58310d9794b123b514516a3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_forms" DROP CONSTRAINT "FK_dc8c58310d9794b123b514516a3"`);
        await queryRunner.query(`ALTER TABLE "user_forms" DROP CONSTRAINT "FK_f8a70ba3fd198a242c1f76737aa"`);
        await queryRunner.query(`DROP TABLE "user_forms"`);
    }

}
