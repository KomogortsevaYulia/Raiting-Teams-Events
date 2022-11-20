import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668932924808 implements MigrationInterface {
    name = 'auto1668932924808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_functions" ("function_id" integer NOT NULL, "user_id" integer NOT NULL, "dateStart" TIMESTAMP NOT NULL, "dateEnd" TIMESTAMP NOT NULL, CONSTRAINT "PK_d2bb6d78bf7391eda2ef2587d54" PRIMARY KEY ("function_id", "user_id"))`);
        await queryRunner.query(`ALTER TABLE "user_functions" ADD CONSTRAINT "FK_bc78d14d218fc2e57e7a6941ab3" FOREIGN KEY ("function_id") REFERENCES "functions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_functions" ADD CONSTRAINT "FK_414c47660792aa509c8f55adc7f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_functions" DROP CONSTRAINT "FK_414c47660792aa509c8f55adc7f"`);
        await queryRunner.query(`ALTER TABLE "user_functions" DROP CONSTRAINT "FK_bc78d14d218fc2e57e7a6941ab3"`);
        await queryRunner.query(`DROP TABLE "user_functions"`);
    }

}
