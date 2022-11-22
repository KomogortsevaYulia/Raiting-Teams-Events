import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1669139884403 implements MigrationInterface {
    name = 'auto1669139884403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_functions" ("id" SERIAL NOT NULL, "dateStart" TIMESTAMP NOT NULL, "dateEnd" TIMESTAMP NOT NULL, "function_id" integer, "user_id" integer, CONSTRAINT "PK_1b04a9e32d9511b33fe11b6ffda" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_functions" ADD CONSTRAINT "FK_bc78d14d218fc2e57e7a6941ab3" FOREIGN KEY ("function_id") REFERENCES "functions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_functions" ADD CONSTRAINT "FK_414c47660792aa509c8f55adc7f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_functions" DROP CONSTRAINT "FK_414c47660792aa509c8f55adc7f"`);
        await queryRunner.query(`ALTER TABLE "user_functions" DROP CONSTRAINT "FK_bc78d14d218fc2e57e7a6941ab3"`);
        await queryRunner.query(`DROP TABLE "user_functions"`);
    }

}
